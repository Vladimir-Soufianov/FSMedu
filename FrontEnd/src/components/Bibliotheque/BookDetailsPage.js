import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './BookDetailsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Navig from "../incs/Navig"
const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from URL parameters
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    // Fetch book details based on the ID
    axios.get(`http://localhost:8080/api/books/${id}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => {
        console.error('Error fetching book details:', err);
      });

    // Fetch comments based on the book ID
    axios.get(`http://localhost:8080/api/commentaires/${id}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: null, // Assuming your backend assigns IDs
      nom: name,
      prenom: prenom,
      cmmnt: question,
      bookId: id
    };

    // Post the new comment to backend
    axios.post(`http://localhost:8080/api/commentaires`, newComment)
      .then(res => {
        console.log('Comment posted successfully:', res.data);
        // Optionally, update state or fetch comments again after posting
        // For simplicity, you can reload the page or fetch comments
        // axios.get(`http://localhost:8080/api/commentaires/${id}`)
        //   .then(res => {
        //     setComments(res.data);
        //   })
        //   .catch(err => {
        //     console.error('Error fetching comments after posting:', err);
        //   });
      })
      .catch(err => {
        console.error('Error posting comment:', err);
      });

    // Clear the form inputs
    setName('');
    setPrenom('');
    setQuestion('');
  };

  if (!book) return <p>Loading...</p>;

  return (
    <>
    <Navig/>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-md-4">
              {/* Left side content, if any */}
            </div>
            <div className={`col-md-8 ${styles.bookDetails}`}>
              <h2>{book.titre}</h2>
              <p ><strong>Auteur:</strong> {book.auteur}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Catégorie:</strong> {book.category}</p>
              <p><strong>Disponibilité:</strong> {book.dispo ? 'Oui' : 'Non'}</p>
              {book.dispo && (
                <Link to={`/Biblio/book/${id}/demander`}>
                  <button className="btn btn-primary">Demander</button>
                </Link>
              )}
            </div>
          </div>
          <div className={styles.commentsSection}>
            <h2>Commentaires</h2>
            <ul className={styles.commentList}>
              {comments.map(comment => (
                <li key={comment.id} className={styles.commentItem}>
                  <FontAwesomeIcon icon={faUser} className={styles.commentIcon} />
                  <div className={styles.commentContent}>
                    <p className={styles.commentAuthor}>{comment.nom} {comment.prenom}</p>
                    <p>{comment.cmmnt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.cmmnts}>
          <h2>Poser un commentaire</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Votre nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
            />

            <label htmlFor="prenom">Votre Prenom:</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrez votre Prenom"
            />
        
            <label htmlFor="question">Votre commentaire:</label>
            <textarea
              id="question"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Entrez votre commentaire ici"
            ></textarea>

            <button type="submit" className={styles.btn}>Soumettre</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
