import React, { useState, useEffect } from "react";
import Navig from "../incs/Navig";
import styles from "./Ori.module.css";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

import ClubIcon from '../../components/assets/club.png';

const CardComponent = ({ id, title, image }) => (
  <div className={styles.card}>
    <img src={ClubIcon || ClubIcon} alt={title} className={styles.cardImage} />
    <h3 className={styles.cardTitle}>{title}</h3>
    <Link to={`/clubs/registration/${id}`}>
      <button
        className={styles.cardButton}
        onClick={() => localStorage.setItem('selectedClubId', id)}
      >
        S'inscrire
      </button>
    </Link>
  </div>
);

const Orientation = () => {
  const redirectToUrl = () => {
    window.location.href = "https://e-bourse-maroc.onousc.ma/";
  };

  const [clubs, setClubs] = useState([]);
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clubs');
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  const handlePrevious = () => {
    setFirstVisibleIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  const handleNext = () => {
    setFirstVisibleIndex((prevIndex) => Math.min(prevIndex + 2, clubs.length - 1));
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    try {
      const response = await fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formDataObject.nom,
          prenom: formDataObject.prenom,
          qst: formDataObject.qst,
          resp: formDataObject.email, // Assuming `resp` in backend corresponds to `email` from frontend
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
      console.log('Question submitted successfully');
      // Optionally, reset the form fields after successful submission
      event.target.reset();
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };
  
  return (
    <>
      <Navig />
      <div className={styles.club}>
        <div className={styles.row1}>
          <h1>Clubs disponibles</h1>
          <div className={styles.cardContainer}>
            {clubs.slice(firstVisibleIndex, firstVisibleIndex + 2).map((club) => (
              <CardComponent key={club.id} id={club.id} title={club.nom} image={club.image} />
            ))}
          </div>
          {clubs.length > 1 && (
            <div className={styles.navigateButtons}>
              <button className={styles.navigateButton} onClick={handlePrevious}><HiArrowSmallLeft /></button>
              <button className={styles.navigateButton} onClick={handleNext}><HiArrowSmallRight /></button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.down}>
        <div className={styles.rv}>
          <h1>Rendez-vous</h1>
          <p>Ici, vous pouvez prendre un rendez-vous pour une consultation, ou pour créer la carte de bus.</p>
          <Link to={`/Orientation/RendezVous`}>
            <button className={styles.button}>Prendre un rendez-vous</button>
          </Link>
        </div>
        <div className={styles.line}></div>
        <div className={styles.brs}>
          <h1>Bourses</h1>
          <p>Pour consulter les bourses, ou voir plus de détails, vous pouvez consulter le site e-bourse en cliquant ici :</p>
          <button className={styles.button} onClick={redirectToUrl}>Consulter le site E-Bourse</button>
        </div>
      </div>
      <div className={styles.qst}>
        <h2>Poser une question</h2>
        <form onSubmit={handleSubmitQuestion}>
          <label htmlFor="name">Votre nom:</label>
          <input type="text" id="name" name="nom" placeholder="Entrez votre nom" required />

          <label htmlFor="prenom">Votre Prénom:</label>
          <input type="text" id="prenom" name="prenom" placeholder="Entrez votre Prénom" required />

          <label htmlFor="email">Votre email:</label>
          <input type="text" id="email" name="email" placeholder="Entrez votre email" required />

          <label htmlFor="question">Votre question:</label>
          <textarea id="question" name="qst" placeholder="Entrez votre question ici" required></textarea>

          <button type="submit">Soumettre</button>
        </form>
      </div>
    </>
  );
};

export default Orientation;
