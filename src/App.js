import "./App.css";
import BookSearch from "./components/BookSearch";
import FavoritesPage from "./components/FavoritesPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <Link to="/">Kitap Ara</Link>
        <Link to="/favorites">Favorilerim</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
