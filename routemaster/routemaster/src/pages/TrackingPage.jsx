/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../style/TrackingPage.css';


const mapContainerStyle = {
  width: '100%',
  height: '500px',
  marginBottom: '20px',
  border: '8px solid #333',
  overflow: 'hidden',
};

const startIcon = new L.Icon({
  iconUrl: '/images/start-end.png',
  iconSize: [35, 51],
  iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
  iconUrl: '/images/start-end.png',
  iconSize: [35, 51],
  iconAnchor: [12, 41],
});

const carIcon = new L.Icon({
  iconUrl: '/images/carrier.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const planeIcon = new L.Icon({
  iconUrl: '/images/carrier.png', // Replace with your plane icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const TrackingPage = () => {
  const { trackingNumber } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [status, setStatus] = useState('in transit');
  const [currentPosition, setCurrentPosition] = useState(null); // State to store current position
  const mapRef = useRef(null); // Ref to store the map instance
  const carRef = useRef(null); // Ref to store the car marker
  const planeRef = useRef(null); // Ref to store the plane marker
  const animationRef = useRef(null); // Ref to store animation timeout
  const routeRef = useRef(null); // Ref to store the route coordinates

  const fetchPackageData = async () => {
    try {
      console.log('Fetching package data...');
      const packageCollection = collection(db, 'packages');
      const q = query(packageCollection, where('trackingNumber', '==', trackingNumber));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        console.log('Fetched data:', data); // Debugging log
        setPackageData(data);
        setStatus(data.status);
        setCurrentPosition(data.currentPosition); // Set initial current position
        routeRef.current = data.routeCoordinates || []; // Set initial route coordinates
      } else {
        console.error('Package not found');
      }
    } catch (error) {
      console.error('Error fetching package data:', error);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, [trackingNumber]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 + (Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon))) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const interpolatePoints = (start, end, numPoints) => {
    const latStep = (end.lat - start.lat) / numPoints;
    const lngStep = (end.lng - start.lng) / numPoints;
    const points = [];
  
    for (let i = 0; i <= numPoints; i++) {
      points.push({
        lat: start.lat + i * latStep,
        lng: start.lng + i * lngStep,
      });
    }
    return points;
  };

  const calculateBearing = (start, end) => {
    const startLat = (start.lat * Math.PI) / 180;
    const startLng = (start.lng * Math.PI) / 180;
    const endLat = (end.lat * Math.PI) / 180;
    const endLng = (end.lng * Math.PI) / 180;
    const dLng = endLng - startLng;

    const x = Math.sin(dLng) * Math.cos(endLat);
    const y = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

    let bearing = (Math.atan2(x, y) * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };


  // Create a custom icon that takes a bearing (rotation)
const createRotatedIcon = (bearing) => {
  return L.icon({
    iconUrl: '/images/carrier.png', // replace with the correct image path
    iconSize: [50, 50], // Set the size of the icon
    iconAnchor: [25, 25], // Set the anchor point of the icon to its center
    className: 'rotated-icon', // Class for potential custom styling
    popupAnchor: [0, -25], // Adjust popup position
    // Apply rotation transform directly on the image via CSS
    html: `<img src="/images/carrier.png" style="transform: rotate(${bearing}deg);">`
  });
};
  
  useEffect(() => {
    if (packageData && currentPosition && mapRef.current === null) {
      mapRef.current = L.map('map').setView([currentPosition.lat, currentPosition.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
  
      const startMarker = L.marker([packageData.currentPosition.lat, packageData.currentPosition.lng], { icon: startIcon }).addTo(mapRef.current);
      const endMarker = L.marker([packageData.endCoordinates.lat, packageData.endCoordinates.lng], { icon: endIcon }).addTo(mapRef.current);
  
      const distance = calculateDistance(
        packageData.currentPosition.lat,
        packageData.currentPosition.lng,
        packageData.endCoordinates.lat,
        packageData.endCoordinates.lng
      );
  
      if (distance > 2000) { // If the distance is greater than 2000 km, use a straight line
        const route = interpolatePoints(
          { lat: packageData.currentPosition.lat, lng: packageData.currentPosition.lng },
          { lat: packageData.endCoordinates.lat, lng: packageData.endCoordinates.lng },
          7000 // Increase the number of intermediate points for slower movement
        );
        routeRef.current = route;
        L.polyline(route, { color: '#ff0000', weight: 5 }).addTo(mapRef.current);
        
        planeRef.current = L.marker([currentPosition.lat, currentPosition.lng], { icon: planeIcon }).addTo(mapRef.current);
  
        if (status === 'in transit') {
          animatePlane(0);
        }
      } else {
        carRef.current = L.marker([currentPosition.lat, currentPosition.lng], { icon: carIcon }).addTo(mapRef.current);
        L.Routing.control({
          waypoints: [
            L.latLng(packageData.currentPosition.lat, packageData.currentPosition.lng),
            L.latLng(packageData.endCoordinates.lat, packageData.endCoordinates.lng),
          ],
          createMarker: function () { return null; }, // Hide default markers
          lineOptions: {
            styles: [{ color: '#ff0000', weight: 5 }],
          },
          routeWhileDragging: true,
        }).on('routesfound', (e) => {
          routeRef.current = e.routes[0].coordinates;
          if (status === 'in transit') {
            animateCar(0);
          }
        }).addTo(mapRef.current);
      }
    }
  }, [packageData, currentPosition, status]);
  
  const animateCar = (index) => {
    if (routeRef.current && routeRef.current.length > 1 && status === 'in transit') {
      const nextIndex = (index + 1) % routeRef.current.length;
      const currentPoint = routeRef.current[index];
      const nextPoint = routeRef.current[nextIndex];
  
      // Calculate the bearing (angle) between the current and next point
      const bearing = calculateBearing(currentPoint, nextPoint);
  
      // Update the position of the car icon
      carRef.current.setLatLng(nextPoint);
  
      // Update the marker with the rotated icon
      const rotatedIcon = createRotatedIcon(bearing);
      carRef.current.setIcon(rotatedIcon);
  
      // Update Firestore or any state management
      updateCurrentPosition(nextPoint);
  
      animationRef.current = setTimeout(() => {
        animateCar(nextIndex);
      }, 3000);
    }
  };
  
  // Similar for animatePlane function
const animatePlane = (index) => {
  if (routeRef.current && routeRef.current.length > 1 && status === 'in transit') {
    const nextIndex = (index + 1) % routeRef.current.length;
    const currentPoint = routeRef.current[index];
    const nextPoint = routeRef.current[nextIndex];

    // Calculate the bearing (angle) between the current and next point
    const bearing = calculateBearing(currentPoint, nextPoint);

    // Update the position of the plane icon
    planeRef.current.setLatLng(nextPoint);

    // Update the marker with the rotated icon
    const rotatedIcon = createRotatedIcon(bearing);
    planeRef.current.setIcon(rotatedIcon);

    updateCurrentPosition(nextPoint);

    animationRef.current = setTimeout(() => {
      animatePlane(nextIndex);
    }, 3000);
  }
};
  

  const updateCurrentPosition = async (position) => {
    try {
      const packageCollection = collection(db, 'packages');
      const q = query(packageCollection, where('trackingNumber', '==', trackingNumber));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        const packageDoc = doc(db, 'packages', docId);
        await updateDoc(packageDoc, {
          currentPosition: {
            lat: position.lat,
            lng: position.lng,
          },
        });
        setCurrentPosition({ lat: position.lat, lng: position.lng });
      }
    } catch (error) {
      console.error('Error updating current position:', error);
    }
  };

  useEffect(() => {
    if (carRef.current && routeRef.current && routeRef.current.length > 1 && status === 'in transit') {
      animateCar(0);
    }
    if (planeRef.current && routeRef.current && routeRef.current.length > 1 && status === 'in transit') {
      animatePlane(0);
    }
    return () => {
      clearTimeout(animationRef.current);
    };
  }, [routeRef.current, status]);

  return (
    <div className='tracking-page' style={{backgroundColor: '#444'}}>
      <div id='map' style={mapContainerStyle}></div>
      <div className='package-info' style={{backgroundColor: '#333'}}>
        {packageData ? (
         <>
         <h2 className='name'>Package Information</h2>
         <p><strong className='name'>Origin:</strong> <span style={{ color: 'white' }}>{packageData.packageOrigin}</span></p>
         <p><strong className='name'>Destination:</strong> <span style={{ color: 'white' }}>{packageData.destination}</span></p>
         <p><strong className='name'>Tracking Number:</strong> <span style={{ color: 'white' }}>{packageData.trackingNumber}</span></p>
         <p><strong className='name'>Receiver Name:</strong> <span style={{ color: 'white' }}>{packageData.receiverName}</span></p>
         <p><strong className='name'>Receiver Email:</strong> <span style={{ color: 'white' }}>{packageData.receiverEmail}</span></p>
         <p><strong className='name'>Receiver Phone:</strong> <span style={{ color: 'white' }}>{packageData.receiverPhone}</span></p>
         <p><strong className='name'>Receiver Address:</strong> <span style={{ color: 'white' }}>{packageData.receiverAddress}</span></p>
         <p><strong className='name'>Package Content:</strong> <span style={{ color: 'white' }}>{packageData.packageContent}</span></p>
         <h3>Status: <span style={{ color: status === 'in transit' ? 'green' : 'red' }}>{status}</span></h3>
         {status !== 'in transit' && <p><strong>Reason:</strong> <span style={{ color: 'white' }}>{packageData.reason}</span></p>}
       </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
