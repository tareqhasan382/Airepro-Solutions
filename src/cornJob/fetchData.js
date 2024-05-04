import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=2"
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from API: ", error);
  }
}

export default fetchData;
