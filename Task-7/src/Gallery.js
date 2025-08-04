import React, { useState } from "react";
import photoData from "./data";

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Mountains", "Beaches", "Forest", "City", "Deserts"];

  const filteredPhotos = photoData.filter((photo) => {
    const matchesCategory = filter === "All" || photo.tag === filter;
    const matchesSearch = photo.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h1>Photo Gallery</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {/* 🔘 Category Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              background: filter === category ? "#333" : "#ccc",
              color: filter === category ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🖼 Photo Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredPhotos.length === 0 ? (
          <p>No images found 😔</p>
        ) : (
          filteredPhotos.map((photo, index) => (
            <div key={index}>
              <img
                src={photo.url}
                alt={photo.title}
                width="300"
                height="200"
                style={{ objectFit: "cover", borderRadius: "8px" }}
                onError={(e) => (e.target.style.display = "none")}
              />
              <p>{photo.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Gallery;
