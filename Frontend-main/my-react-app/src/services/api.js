import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this with your backend URL

const api = {
  searchVehicle: async (vehicleNumber) => {
    try {
      console.log('Searching for vehicle:', vehicleNumber);
      const response = await axios.get(`${API_BASE_URL}/vehicles/search`, {
        params: { number: vehicleNumber }
      });
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching vehicle:', error.response?.data || error.message);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to search vehicle. Please try again.');
    }
  }
};

export default api; 