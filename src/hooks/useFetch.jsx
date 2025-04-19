import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (query, page) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            query
          )}&limit=${page * 20}`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return { data, loading, error };
};
