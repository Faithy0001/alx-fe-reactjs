import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdvancedUserData = async (username, location, minRepos) => {
  try {
    let query = username ? `user:${username}` : '';
    
    if (location) {
      query += ` location:${location}`;
    }
    
    if (minRepos) {
      query += ` repos:>=${minRepos}`;
    }

    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};