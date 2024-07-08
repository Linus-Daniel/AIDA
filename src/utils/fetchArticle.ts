const API_KEY = '099a545d916445b18b8a27c96ae222e7';

export async function fetchAllArticles() {
  const apiUrl = `https://newsapi.org/v2/everything?q=health&apiKey=${API_KEY}`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
