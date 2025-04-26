/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig'; // Import Firestore and Auth
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { geocodeAddress } from '../utils/geocodeAddress'; // Import geocoding helper
import emailjs from 'emailjs-com'; // Import EmailJS
import '../style/AdminDashboard.css'; // Import the CSS file for styling

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packageOrigin: '',
    destination: '',
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverAddress: '',
    packageContent: '',
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: ''
  });

  const [packages, setPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      const packageCollection = collection(db, 'packages');
      const snapshot = await getDocs(packageCollection);
      const packageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(packageList);
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin-login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (receiverEmail, trackingNumber) => {
    const templateParams = {
      to_email: receiverEmail,
      tracking_number: trackingNumber,
      receiver_name: formData.receiverName,
      package_content: formData.packageContent,
      sender_name: formData.senderName,
      sender_address: formData.senderAddress,
      tracking_url: `${window.location.origin}/track/${trackingNumber}` // URL to track the package
    };

    emailjs.send('service_d3gjyfg', 'template_dccvc1m', templateParams, 'oJJ37WU9PGmXKG5pE')
      .then(response => {
        console.log('Email sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert addresses to coordinates
    const startCoordinates = await geocodeAddress(formData.senderAddress);
    const endCoordinates = await geocodeAddress(formData.receiverAddress);
    
    if (!startCoordinates || !endCoordinates) {
      alert('Failed to get coordinates for addresses.');
      return;
    }

    const randomDigits = Math.random().toString().slice(2, 16); // Generate 14 random digits
    const trackingNumber = `RM${randomDigits}-SHIP`; // Tracking number format

    if (editMode) {
      const packageDoc = doc(db, 'packages', selectedPackageId);
      await updateDoc(packageDoc, {
        ...formData,
        startCoordinates,
        endCoordinates
      });
      alert('Package information updated successfully.');
    } else {
      await setDoc(doc(db, 'packages', trackingNumber), {
        ...formData,
        trackingNumber,
        status: 'in transit', // Default status
        currentPosition: startCoordinates, // Initial current position
        endCoordinates, // Destination position
        reason: ''
      });
      alert(`Tracking number generated: ${trackingNumber}`);

      // Send email to receiver
      sendEmail(formData.receiverEmail, trackingNumber);
    }
    
    setFormData({
      packageOrigin: '',
      destination: '',
      receiverName: '',
      receiverEmail: '',
      receiverPhone: '',
      receiverAddress: '',
      packageContent: '',
      senderName: '',
      senderEmail: '',
      senderPhone: '',
      senderAddress: ''
    });
    setEditMode(false);
    setSelectedPackageId(null);
    // eslint-disable-next-line no-undef
    fetchPackages();
  };

  const handleEdit = (pkg) => {
    setFormData(pkg);
    setSelectedPackageId(pkg.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      const packageDoc = doc(db, 'packages', id);
      await deleteDoc(packageDoc);
      alert('Package deleted successfully.');
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          {editMode ? 'Update Package' : 'Generate Tracking Number'}
        </button>
      </form>

      <h2>Manage Packages</h2>
      <ul className="package-list">
        {packages.map(pkg => (
          <li key={pkg.id} className="package-item">
            {pkg.trackingNumber} - {pkg.receiverName}
            <button onClick={() => handleEdit(pkg)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(pkg.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
