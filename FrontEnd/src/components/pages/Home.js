import React from "react";
import Navig from "../incs/Navig.js";
import styles from "../pagescss/Home.module.css";
import { Link } from "react-router-dom";
import  {Footer}  from "../incs/Footer.js";
import Actualite from "./Actualite.js";
import Events from "./Events.js"
import Services from "./Services.js"
function Home() {
  return (
    <>
      <Navig />
      <div className={styles.details}>
        <div className={styles.bg}>
          <div className={styles.infos}>
            <div className={styles.texto}>
              <h1>Faculté des sciences Meknès</h1>
              <br/>
              <p>Crée en 1982, la Faculté des Sciences de Meknès (FSM) en tant que premier établissement universitaire à accès ouvert dans la région Meknès-Tafilalt, peut être fière de ses 42 ans d’expérience cumulée qui font d’elle la locomotive du système éducatif universitaire à l’échelle de la région.</p>
              <Link to="More" className={styles.button}>Plus d'informations </Link>
            </div>
            </div>
        </div>
      </div>
      <Services/>
      <Actualite/>
      <Events/>
      <div className={styles.numbers}>
      <div className={styles.numbers_item}>
        <p>72</p>
        <h3>Professeur</h3>
      </div>
      <div className={`${styles.numbers_item} ${styles.centerItem}`}>
      <p>780</p> 
      <h3>Etudiants</h3>
      </div>
      <div className={styles.numbers_item}>
      <p>35</p>
        <h3>Doctorants</h3>
      </div>
    </div>
      <Footer/>
    </>
  );
}
export default Home;


