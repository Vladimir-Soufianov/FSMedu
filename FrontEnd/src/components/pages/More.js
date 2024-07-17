import React from "react";
import Navig from "../incs/Navig"
import styles from "../pagescss/More.module.css"
import MoulayIsmail from "../assets/MoulayIsmail.jpg"
import UMI from "../assets/umi.jpg"
import FSM from "../assets/fsm.jpg"
function More() {
  return (
    <>
    <Navig/>
    <div className={styles.container}>
      <div className={styles.left1}>
     <p>L'université Moulay Ismaïl à Meknès, établie en 1989, 
      est un établissement d'enseignement supérieur de premier plan au Maroc, 
      offrant une variété de programmes académiques dans diverses disciplines.
       Portant le nom du célèbre sultan du XVIIe siècle, 
       l'université est reconnue pour son excellence académique, 
       sa recherche innovante et son rôle crucial dans la formation de la main-d'œuvre
        qualifiée nécessaire au développement socio-économique du pays.
         À travers ses partenariats internationaux,elle favorise les échanges académiques et culturels,
          tout en contribuant activement à la vie sociale et culturelle de la région de Meknès, 
          ce qui en fait un pilier de l'éducation supérieure et du développement régional au Maroc.
     </p>
     <p>Site de l'université : <a href="https://www.umi.ac.ma/">lien</a></p>
      </div>
      <div className={styles.right1}>
      <img src={UMI}></img>
      </div>
      <div className={styles.left2}>
        <img src={MoulayIsmail}></img>
      </div>
      <div className={styles.right2}>
        <p>
          Moulay Ismaïl, également connu sous le nom de Moulay Ismaïl ben Chérif,
          était le septième fils de Moulay Chérif. Né vers 1645 à Sijilmassa et décédé le 22 mars 1727 à Meknès,
          il a été le sultan du Maroc de 1672 à 1727. En tant que gouverneur du Nord du Maroc à partir de 1667, 
          il a consolidé son pouvoir jusqu'à la mort de son demi-frère, le sultan Moulay Rachid, en 1672. 
          C'est à ce moment-là qu'il s'est proclamé sultan du Maroc à Fès. Pendant environ quinze ans,
          il a été en rivalité avec son neveu, Moulay Ahmed ben Mehrez, qui également aspirait au trône,
          jusqu'à la mort de ce dernier en 1687.
          Moulay Ismaïl a marqué son règne par une série de réformes administratives et militaires,
          ainsi que par la construction de la ville impériale de Meknès. 
          Il est également célèbre pour son utilisation de l'esclavage,
          ainsi que pour sa politique expansionniste et sa consolidation du pouvoir central.
        </p>
        <p>
        Le règne de Moulay Ismaïl a été caractérisé par une période d'apogée de la puissance marocaine,
         notamment grâce à ses succès militaires. Il a créé une armée forte et originale reposant sur les "guichs",
          principalement celui des Oudaïas, ainsi que sur la garde des Abid al-Bukhari, 
          des esclaves noirs totalement dévoués à lui. 
          Cette structure militaire a permis au pouvoir central d'être moins dépendant des tribus souvent rebelles.

        Moulay Ismaïl a remporté des victoires significatives contre les Ottomans d'Alger et leurs vassaux, 
        et a expulsé les Européens des ports qu'ils occupaient, notamment Larache, Assilah, El-Mamoura et Tanger,
         grâce à la Jaych Ar-Rifi, une troupe armée originaire de la région du Rif qu'il a mise en place. 
         Il a capturé des milliers de prisonniers chrétiens et a presque réussi à prendre Ceuta. 
         Son règne a été marqué par une expansion territoriale significative et une consolidation du pouvoir central marocain.
        </p>
      </div>
      <div className={styles.left3}>
        <p>La Faculté des Sciences de l'Université Moulay Ismaïl à Meknès est l'une des institutions les plus prestigieuses dans le domaine des sciences au Maroc. Fondée avec l'université en 1989, elle offre une gamme étendue de programmes de premier cycle et de cycles supérieurs dans des disciplines telles que les mathématiques, la physique, la chimie, la biologie et l'informatique. La faculté se distingue par son corps professoral hautement qualifié, composé d'enseignants et de chercheurs renommés, ainsi que par ses laboratoires de pointe équipés des dernières technologies, offrant aux étudiants un environnement propice à l'apprentissage et à la recherche.
</p><p>
En plus de son engagement envers l'excellence académique, la Faculté des Sciences de Meknès joue un rôle vital dans la promotion de la recherche scientifique et de l'innovation. Ses départements et laboratoires mènent des projets de recherche de pointe dans divers domaines, contribuant ainsi à l'avancement des connaissances et à la résolution des défis sociétaux. En outre, la faculté encourage la collaboration interdisciplinaire et les partenariats avec des institutions de recherche nationales et internationales, renforçant ainsi sa position en tant que pôle d'excellence scientifique au Maroc et au-delà.</p>
      </div>
      <div className={styles.right3}>
      <img src={FSM}></img>
      </div>

    </div>
      
    </>
   
  );
}

export default More;
