import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; 

export const fetchImageFromUnsplash = async (query) => {
  try {
    const response = await axios.get(`${UNSPLASH_API_URL}/search/photos`, {
      params: { query, per_page: 1 }, // Get an image 
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small; // URL img
    }
    return null; // No results 
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
};