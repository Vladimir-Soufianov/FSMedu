import React from 'react';
import Navig from "../incs/Navig";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'; // Import Link for navigation

import image1 from "../assets/reinsciption.jpeg";
import image2 from "../assets/inscrip.avif";

const EspaceInscription = () => {
  return (
    <>
      <Navig />
      <div style={{backgroundColor:"#C0C0C0" , width:"100%",height:"621px" , marginTop:"-20px"}}> 
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/EspaceInscription/Inscription" style={{ textDecoration: 'none' }}>
            <Card style={{ 
              marginTop: "50px", 
              width: '400px', 
              height: '400px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            className="card">
              <img src={image1} alt="Option 1" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
                  Inscription
                </Typography>
                <Typography variant="body2" style={{ marginTop: "20px", fontSize:"15px" }}>
                  Si vous êtes nouveau et que vous souhaitez devenir étudiant dans notre faculté, bienvenue ! Cette option est spécialement conçue pour vous.
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/Login/Etudiant" style={{ textDecoration: 'none' }}>
            <Card style={{ 
              marginTop: "50px", 
              width: '400px', 
              height: '400px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            className="card">
              <img src={image2} alt="Option 2" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
                  Réinscription
                </Typography>
                <Typography variant="body2" style={{ marginTop: "20px" , fontSize:"17px"}}>
                  Si vous êtes déjà étudiant, choisissez cette option et bienvenue à nouveau !
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default EspaceInscription;
