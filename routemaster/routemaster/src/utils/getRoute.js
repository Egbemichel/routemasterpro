import axios from 'axios';

const getRoute = async (start, end) => {
  const apiKey = '5b3ce3597851110001cf62482174186d76ed43d2a3909fa6b9654992';
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.data && response.data.features.length > 0) {
      // Convert coordinates from [lng, lat] to [lat, lng]
      return response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    } else {
      throw new Error('No route found');
    }
  } catch (error) {
    console.error('Error fetching route:', error);
    return [];
  }
};

export default getRoute;
