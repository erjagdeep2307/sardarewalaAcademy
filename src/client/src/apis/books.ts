import axios from "axios";
const API_URL = "http://172.17.222.128:3000/books";
// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
