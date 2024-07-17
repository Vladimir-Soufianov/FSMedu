import React from "react";
import { Link } from "react-router-dom";
import Navig from "../incs/Navig";
import { Grid, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import Info from "../assets/deps/info.jpg";
import Math from "../assets/deps/math.jpg";
import Physique from "../assets/deps/phy.jpg";
import Biologie from "../assets/deps/bio.jpg";
import Chim from "../assets/deps/chim.jpg";
import Geo from "../assets/deps/geo.jpg";

const cards = [
  {
    id: 1,
    title: "Informatique",
    image: Info,
    description: "Le département d'informatique forme les étudiants aux principes fondamentaux et aux applications pratiques de l'informatique, tout en stimulant l'innovation et la recherche dans ce domaine en constante évolution."
  },
  {
    id: 2,
    title: "Mathématiques",
    image: Math,
    description: "Le département de mathématiques offre une formation solide en principes et techniques mathématiques, préparant les étudiants à des carrières en recherche, enseignement et industrie."
  },
  {
    id: 3,
    title: "Physique",
    image: Physique,
    description: "Le département de physique propose une éducation complète sur les lois fondamentales de la nature, favorisant l'innovation et la découverte par la recherche et l'expérimentation."
  },
  {
    id: 4,
    title: "Biologie",
    image: Biologie,
    description: "Le département de biologie explore les complexités des organismes vivants, mettant l'accent sur l'apprentissage pratique et la recherche de pointe dans divers domaines biologiques."
  },
  {
    id: 5,
    title: "Chimie",
    image: Chim,
    description: "Le département de chimie se concentre sur l'étude de la matière et de ses interactions, préparant les étudiants à des carrières dans la recherche, la pharmacie et le génie chimique."
  },
  {
    id: 6,
    title: "Géologie",
    image: Geo,
    description: "Le département de géologie forme les étudiants aux principes fondamentaux de la géologie, mettant en avant l'étude des processus terrestres et des matériaux."
  },
];

const CardComponent = ({ id, title, image, description }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link to={`/Departments/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 350, marginTop: 5, marginLeft: 3.5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  </Grid>
);

function Departments() {
  return (
    <>
      <Navig />
      <Grid container spacing={2} justifyContent="center" style={{ backgroundColor: 'lightgray' }}>
        {cards.map((card) => (
          <CardComponent key={card.id} {...card} />
        ))}
      </Grid>
    </>
  );
}

export default Departments;
