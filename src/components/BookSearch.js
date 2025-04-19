import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import "../styles/BookSearch.css";
import { FaSearch } from "react-icons/fa";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(query, page);

  const morePage = () => {
    setPage(page + 1);
  };

  const handleSearch = () => {
    setPage(1);
    if (query.trim()) {
      setQuery(query);
    }
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

      {loading && <p>Yükleniyor...</p>}
      {error && console.log(`Hata: ${error.message}`)}

      {data && (
        <>
          <ul>
            {data.docs.map((book) => (
              <li key={book.key}>
                <div className="image-container">
                  <p className="badge">{book.first_publish_year}</p>
                  <img src={getCoverUrl(book.cover_i)} alt={book.title} />
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
    </div>
  );
};

export default BookSearch;
