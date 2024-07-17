import React, { useEffect, useState } from "react";
import Navig from "../incs/Navig";
import axios from 'axios';
import styles from './Biblio.module.css';
import bookImage from "../assets/bib.jpg"
import { Link } from 'react-router-dom';

function Biblio() {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]); // Store filtered records

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(res => {
        setRecords(res.data);
        const allCategories = ['Tous', ...new Set(res.data.map(book => book.category))]; // Include 'All' category
        setCategories(allCategories);
        setFilteredRecords(res.data); // Initialize filtered records with all records
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category) => {
    let filtered;
    if (category === 'Tous') {
      filtered = records; // Select all records if 'All' is selected
    } else {
      filtered = records.filter(book => book.category === category);
    }
    setFilteredRecords(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const filteredBooks = records.filter(book =>
      book.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filteredBooks);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <Navig />
      <div className={styles.container}>
        <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />
        <div className={styles.content}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Rechercher un livre par son titre ..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchBar}
            />
            <button className={styles.searchButton} onClick={handleSearchButtonClick}>Rechercher</button>
          </div>
          <div className={styles.bookContainer}>
            {filteredRecords.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar({ categories, onCategorySelect }) {
  return (
    <div className={styles.sidebar}>
      <h2>Catégories</h2>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onCategorySelect(category)} className={styles.categoryItem}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

const BookCard = ({ book }) => {
  return (
    <div className={styles['book-card']}> {/* Apply the CSS class */}
      {/* Display basic information */}
      <h2>{book.titre}</h2>
      <p><strong>Auteur:</strong> {book.auteur}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Disponnibilité:</strong> {book.dispo ? 'Oui' : 'Non'}</p>
      <p><strong>Catégorie:</strong> {book.category}</p>
      {/* Button to navigate to book details page with book ID as parameter */}
      <Link to={`/Biblio/book/${book.id}`} className="btn btn-primary">Plus de détails</Link>
    </div>
  );
};

export default Biblio;
