import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import "../styles/BookSearch.css";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const { data, loading, error } = useFetch(query, page);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteBooks");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
  }, [favorites]);

  const morePage = () => {
    setPage(page + 1);
  };

  const handleSearch = () => {
    setPage(1);
    if (query.trim()) {
      setQuery(query);
    }
  };

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      const isBookFavorited = prevFavorites.some((fav) => fav.key === book.key);
      if (isBookFavorited) {
        return prevFavorites.filter((fav) => fav.key !== book.key);
      } else {
        return [...prevFavorites, book];
      }
    });
  };

  const isBookFavorite = (bookKey) => {
    return favorites.some((fav) => fav.key === bookKey);
  };

  const getCoverUrl = (coverId) => {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093"; // Eğer kapak yoksa yedek resim
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kitap adı girin"
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && console.log(`Hata: ${error.message}`)}

      {data && (
        <>
          <ul>
            {data.docs.map((book) => (
              <li key={book.key}>
                <div className="image-container">
                  <p className="badge">{book.first_publish_year}</p>
                  <img src={getCoverUrl(book.cover_i)} alt={book.title} />
                  <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(book)}
                  >
                    {isBookFavorite(book.key) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <div className="author-container">
                    <p className="title">{book.title}</p>
                    <p className="author">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Yazar bilgisi yok"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={morePage}>Daha Fazla</button>
        </>
      )}

      {/* Display Favorites Section */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>Favori Kitaplarım</h2>
          <ul>
            {favorites.map((book) => (
              <li key={book.key}>
                <div className="image-container">
                  <p className="badge">{book.first_publish_year}</p>
                  <img src={getCoverUrl(book.cover_i)} alt={book.title} />
                  <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(book)}
                  >
                    <FaHeart color="red" />
                  </button>
                  <div className="author-container">
                    <p className="title">{book.title}</p>
                    <p className="author">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Yazar bilgisi yok"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
