import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";

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

  // Kitap kapağı URL'sini alacak fonksiyon
  const getCoverUrl = (coverId) => {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093"; // Eğer kapak yoksa yedek resim
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Kitap adı girin"
      />
      <button onClick={handleSearch}>Ara</button>

      {loading && <p>Yükleniyor...</p>}
      {error && <p>Hata: {error.message}</p>}

      {data && (
        <ul>
          {data.docs.map((book) => (
            <li key={book.key}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={getCoverUrl(book.cover_i)}
                  alt={book.title}
                  style={{
                    width: "100px",
                    height: "150px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{book.title}</strong> -{" "}
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Yazar bilgisi yok"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={morePage}>Daha Fazla</button>
    </div>
  );
};

export default BookSearch;
