import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:5000/api/";

const createPost = async (newTweet) => {
  try {
    const response = await axios.post(`${API_URL}posts`, newTweet, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.status == 400) {
      window.alert(error.response.data);
      return
    }
    console.error('Error creating post:', error);
    throw error;
  }
};

export default {
  createPost,
};