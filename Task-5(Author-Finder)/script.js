// Firebase config - replace with your real config during development
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add Author Button Event
document.getElementById("addAuthorBtn").addEventListener("click", () => {
  const authorName = document.getElementById("authorInput").value.trim();

  if (authorName !== "") {
    const authorsRef = ref(db, "authors");
    push(authorsRef, authorName);
    alert("Author added!");

    fetchBooks(authorName); // Fetch books after adding author
    document.getElementById("authorInput").value = "";
  } else {
    alert("Please enter a name!");
  }
});

// Fetch Books from Open Library API
function fetchBooks(authorName) {
  const url = `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const books = data.docs.slice(0, 10);
      const bookListDiv = document.getElementById("bookList");
      bookListDiv.innerHTML = `<h2>Books by ${authorName}:</h2>`;

      if (books.length === 0) {
        bookListDiv.innerHTML += "<p>No books found.</p>";
        return;
      }

      const ul = document.createElement("ul");
      books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = book.title;
        ul.appendChild(li);
      });

      bookListDiv.appendChild(ul);
    })
    .catch(error => {
      console.error("Error fetching books:", error);
    });
}
