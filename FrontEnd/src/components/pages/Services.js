import React from 'react';
import styles from '../pagescss/services.module.css';
import image1 from '../assets/espetu.jpg'
import image2 from '../assets/esppro.jpg'
import image3 from '../assets/bib.jpg'
import image4 from '../assets/orie.jpg'
import image5 from '../assets/inscription.jpg'

const Services = () => {
  return (
    <div className={styles.container}>
      <a href="/Login/Etudiant" className={styles.parallelogram1}>
        <div className={styles.line}>
          <h1>Espace Etudiant</h1>
        </div>
        <img src={image1} alt="etudiant" className={styles.image} />
      </a>
      <a href="/Login/Personnel" className={styles.parallelogram2}>
        <div className={styles.line}>
          <h1>Espace Personnel</h1>
        </div>
        <img src={image2} alt="personnel" className={styles.image} />
      </a>
      <a href="/Biblio" className={styles.parallelogram3}>
        <div className={styles.line}>
          <h1>Bibliothèque</h1>
        </div>
        <img src={image3} alt="biblio" className={styles.image} />
      </a>
      <a href="/Orientation" className={styles.parallelogram4}>
        <div className={styles.line}>
          <h1>Orientation</h1>
        </div>
        <img src={image4} alt="orientation" className={styles.image} />
      </a>
      <a href="/EspaceInscription" className={styles.parallelogram5}>
        <div className={styles.line}>
          <h1>Espace d'inscriptions</h1>
        </div>
        <img src={image5} alt="inscription" className={styles.longimage} />
      </a>
     
    </div>
    
  );
};

export default Services;
