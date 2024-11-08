import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register 
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data; 
};

// Login

export const login = async(userData) => {
  console.log(userData);
  const response =  await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Get posts
export const getPost = async() => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// Create post
export const createPost = async (postData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/posts/post`,postData, config);
  return response.data;
};

// Get user posts
export const getUserPosts = async(token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(`${API_URL}/posts/user`, config);
  return response.data;
};

