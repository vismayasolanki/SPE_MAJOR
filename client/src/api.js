import axios from 'axios';






const API = axios.create({
  baseURL: 'http://localhost:5005',
});

export const createUser = async (user) => {
  try {
    const response = await API.post('/users', user);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};




export const getUsersByFoodPreference = async (foodPreference, timeSlot) => {
  try {
    let url = `/users/${foodPreference}`;

    if (timeSlot) {
      url += `?timeSlot=${timeSlot}`;
    }

    const response = await API.get(url);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
