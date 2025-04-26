import axios from 'axios';

// Replace with your Geoapify API key
const API_KEY = 'bdb042532b5145e38b6f6c3f7c9db544';

export const geocodeAddress = async (address) => {
  const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    if (data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;
      return { lat, lng: lon };
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
