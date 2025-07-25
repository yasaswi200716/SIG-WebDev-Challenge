const apiKey = "DEMO_KEY"; 
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("API response not OK");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.getElementById("title").textContent = data.title;
    document.getElementById("image").src = data.url;
    document.getElementById("image").alt = data.title;
    document.getElementById("description").textContent = data.explanation;
  })
  .catch(error => {
    console.error("Error fetching NASA APOD:", error);
    document.getElementById("title").textContent = "Could not fetch today's image";
    document.getElementById("description").textContent = "Try again later or check your internet connection.";
  });
