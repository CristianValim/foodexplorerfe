import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles.js";
import { SlMagnifier } from "react-icons/sl";
import { api } from "../../services/api";

export function InputSearch({ placeholder, setOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 0) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/dishes/index?term=${searchTerm}`);
      if (response.status !== 200) {
        throw new Error("Erro ao buscar pratos.");
      }
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (id) => {
    navigate(`/dishes/${id}`);
    setOpen(false);
  };

  return (
    <Container>
      <div className="input-wrapper">
        <SlMagnifier className="searchIcon" size="2.4rem" />
        <input
          type="search"
          placeholder="Busque por pratos ou ingredientes"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((dish) => (
              <li key={dish.id} onClick={() => handleResultClick(dish.id)}>
                <div>
                  <span>{dish.name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
