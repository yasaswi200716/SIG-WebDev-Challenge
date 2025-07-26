//import firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDScRRIB18yVYcMSAtadeuR2uVPTy_7ObU",
  authDomain: "author-finder-c5f18.firebaseapp.com",
  projectId: "author-finder-c5f18",
  storageBucket: "author-finder-c5f18.appspot.com",
  messagingSenderId: "955196221979",
  appId: "1:955196221979:web:e28dd65271bb6f80dbe6be",
  databaseURL: "https://author-finder-c5f18-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add Author
document.getElementById("addAuthorBtn").addEventListener("click", () => {
  const authorName = document.getElementById("authorInput").value.trim();// to trim the spaces from left and right from user input


  if (authorName !== "") {
    const authorsRef = ref(db, "authors");
    push(authorsRef, authorName);
    alert("Author added!");

    // Fetch books after adding author
    fetchBooks(authorName);

    document.getElementById("authorInput").value = "";
  } else {
    alert("Please enter a name!");
  }
});

// Fetch books from Open Library API
function fetchBooks(authorName) {
  const url = `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}`;//encodeURIComponent makes sure speacial characters dont break the URL
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const books = data.docs.slice(0, 10); // show only top 10 books
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
