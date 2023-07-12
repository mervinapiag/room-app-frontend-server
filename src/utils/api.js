import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',

    // Add any additional headers if required
  },
});

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/rooms'); // Replace with your endpoint path
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const joinRoom = async (roomId) => {
  try {

    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg3NzU0NjI2LCJleHAiOjE2ODgzNTk0MjZ9.SI6EKeq-B8ZA3e0RnZTnqfLSZQfLqP5dW8-4yurFyV0' };
        // axios.get('https://testapi.jasonwatmore.com/products/2', { headers })
    const response = await axiosInstance.post('/join-room', {room_id: roomId}, {headers}); // Replace with your endpoint path

    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const createRoomAPI = async (room) => {
  try {
    
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3NzY3NDYwLCJleHAiOjE2ODgzNzIyNjB9.FDdjdeLiL2-GDWy6h7JMtxnCD0W6bInm84JWo5MP_qg' };
        // axios.get('https://testapi.jasonwatmore.com/products/2', { headers })
    const response = await axiosInstance.post('/rooms', room , {headers}); // Replace with your endpoint path

    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};