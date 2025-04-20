import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import "../styles/FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteBooks");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
      setFilteredFavorites(parsedFavorites);
    }
  }, []);

  // Filter favorites based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.author_name &&
            book.author_name.some((author) =>
              author.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setFilteredFavorites(filtered);
    }
  }, [searchQuery, favorites]);

  const removeFromFavorites = (bookKey) => {
    const updatedFavorites = favorites.filter((book) => book.key !== bookKey);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
  };

  const getCoverUrl = (coverId) => {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093";
  };

  return (
    <div className="favorites-container">
      <h1>Favori Kitaplarım</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Favorilerinizde ara..."
        />
        <button>
          <FaSearch />
        </button>
      </div>

      {favorites.length === 0 ? (
        <p className="no-favorites">Henüz favori kitap eklemediniz.</p>
      ) : filteredFavorites.length === 0 ? (
        <p className="no-results">
          Aramanızla eşleşen favori kitap bulunamadı.
        </p>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map((book) => (
            <div key={book.key} className="favorite-book-card">
              <div className="book-image">
                <img src={getCoverUrl(book.cover_i)} alt={book.title} />
                <button
                  className="remove-favorite"
                  onClick={() => removeFromFavorites(book.key)}
                >
                  <FaHeart color="red" />
                </button>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Yazar bilgisi yok"}
                </p>
                {book.first_publish_year && (
                  <p className="year">{book.first_publish_year}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
