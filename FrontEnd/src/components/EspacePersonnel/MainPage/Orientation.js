import React, { useEffect, useState } from 'react';
import Navig from '../../incs/Navig';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { School, CalendarToday, Announcement, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cards = [
  { title: 'Clubs', icon: <School />, path: '/Orientation/Dashboard/Clubs' },
  { title: 'Questions', icon: <CalendarToday />, path: '/Orientation/Dashboard/Questions' },
  { title: 'Rendez-vous', icon: <Assignment />, path: '/Orientation/Dashboard/Rendez-vous' },
  { title: 'Annonces', icon: <Announcement />, path: '/Orientation/Dashboard/Annonces' },

];

const Orientation = () => {
  const navigate = useNavigate();
  const [orientationDetails, setOrientationDetails] = useState(null);

  useEffect(() => {
    const fetchOrientationDetails = async () => {
      try {
        const orientationId = localStorage.getItem('orioId');
        if (!orientationId) {
          throw new Error('Orientation ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/orientations/${orientationId}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch orientation details');
        }

        setOrientationDetails(response.data);
      } catch (error) {
        console.error('Error fetching orientation details:', error.message);
        // Handle error state if needed
      }
    };

    fetchOrientationDetails();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navig />
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Bienvenue M. {orientationDetails?.nom} {orientationDetails?.prenom}
      </Typography>
      <div style={{  marginLeft: 185, marginRight: 20,marginTop:80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={8} >
          {cards.map((card, index) => (
            <Grid item xs={6} key={index}>
              <Card onClick={() => handleNavigation(card.path)} style={{minHeight:"150px" ,borderRadius:"20px 20px 20px 20px",cursor: 'pointer', border: "1px solid orange", height: '100%', width: "400px", justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                  <IconButton style={{ fontSize: 50, color: '#3f51b5', border: "1px solid orange" }}>
                    {card.icon}
                  </IconButton>
                  <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 8 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* This empty Grid item ensures the last card is in the second position of the second row */}
          <Grid item xs={5.5} />
        </Grid>
      </div>
    </>
  );
};

export default Orientation;
