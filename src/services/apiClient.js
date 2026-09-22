const BASE_URL = "http://localhost:5001/api";

export const get = async (endpoint) => {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Client GET Error:", error);
    throw error;
  }
};
