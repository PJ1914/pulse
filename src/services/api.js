// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Your Django API URL

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}messages/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the messages!", error);
        throw error;
    }
};
