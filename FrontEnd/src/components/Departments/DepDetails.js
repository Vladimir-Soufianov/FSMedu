import React from 'react';
import { useParams } from 'react-router-dom';
import Navig from '../incs/Navig';
import styles from "./Dep.module.css"
import { Link } from 'react-router-dom';
import img from '../assets/emp.png'

const departmentDetails = {
    1: {
      title: "Informatique",
      description: "Le département d'informatique forme les étudiants aux principes fondamentaux et aux applications pratiques de l'informatique, tout en stimulant l'innovation et la recherche dans ce domaine en constante évolution.",
      courses: ["SMI ","MIP","Liscence d'excelence"],
      chef: "Bourray Hamid",
      contact: "0641024175",
      email: "bourray.hamid@gmail.com"
    },
    2: {
      title: "Mathématiques",
      description: "Le département de mathématiques offre une formation solide en principes et techniques mathématiques, préparant les étudiants à des carrières en recherche, enseignement et industrie.",
      courses: ["SMA"],
      chef: "Rhoudaf Mohamed",
      contact: "0651288000",
      email: "mohamed.rhou@gmail.com"
    },
    3: {
      title: "Physique",
      description: "Le département de physique propose une éducation complète sur les lois fondamentales de la nature, favorisant l'innovation et la découverte par la recherche et l'expérimentation.",
      courses: ["SMP","SMPC"],
      chef: "Khaliss Mohamed",
      contact: "0727466051",
      email: "khaliss.mo@gmail.com"
    },
    4: {
      title: "Biologie",
      description: "Le département de biologie explore les complexités des organismes vivants, mettant l'accent sur l'apprentissage pratique et la recherche de pointe dans divers domaines biologiques.",
      courses: ["BIO","BCG"],
      chef: "Hajji Elhoussaine",
      contact: "0632927250",
      email: "hajji.hous@gmail.com"
    },
    5: {
      title: "Chimie",
      description: "Le département de chimie se concentre sur l'étude de la matière et de ses interactions, préparant les étudiants à des carrières dans la recherche, la pharmacie et le génie chimique.",
      courses: ["SMP","SMC"],
      chef: "Elmoualij Nouredine",
      contact: "0614703789",
      email: "nouredine.elmoualij@gmail.com"
    },
    6: {
      title: "Géologie",
      description: "Le département de géologie forme les étudiants aux principes fondamentaux de la géologie, mettant en avant l'étude des processus terrestres et des matériaux.",
      courses: ["GEO","BCG"],
      chef: "Houssa Ouali",
      contact: "0620147502",
      email: "oua.houssa@gmail.com"
    },
};

const DepDetails = () => {
    const { id } = useParams();
    const department = departmentDetails[id];

    if (!department) {
      return <div>Department not found</div>;
    }

    return (
        <>
        <Navig/>
      <div className={styles.container}>
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          <h3>Tous les départements</h3>
          <ul>
            {Object.keys(departmentDetails).map(depId => (
              <li key={depId}>
                <Link to={`/Departments/${depId}`}>{departmentDetails[depId].title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Department Details */}
        <div className={styles.departmentDetails}>
          <h2>{department.title}</h2>
          <p>{department.description}</p>
          <h3>Filières :</h3>
          <ul>
            {department.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <h2>Chef Département</h2>
          <img src={img} alt='test' />
          <h3>{department.chef}</h3>
          <p> <strong>Contact : </strong></p> <p style={{marginTop:"5px",color:"white"}}>{department.contact}</p>
          <p><strong>Email : </strong></p><p style={{marginTop:"5px",color:"white"}}>
          {department.email}</p>
        </div>
      </div>
      </>
    );
};

export default DepDetails;
