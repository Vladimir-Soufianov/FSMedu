import React, { useEffect, useState } from 'react';
import Navig from '../../incs/Navig';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { People, School, CalendarToday, Book, Announcement, Assignment, LibraryBooks, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cards = [
  { title: 'Modules', icon: <Book />, path: '/Chef-Filiere/Dashboard/Modules' },
  { title: 'Notes', icon: <People />, path: '/Chef-Filiere/Dashboard/Notes' },
  { title: 'Annonces', icon: <Announcement />, path: '/Chef-Filiere/Dashboard/Annonces' },
  { title: 'Emplois du temps', icon: <CalendarToday />, path: '/Chef-Filiere/Dashboard/Emplois' },
  { title: 'Garde', icon: <School />, path: '/Chef-Filiere/Dashboard/Garde' },
  { title: 'Devoirs', icon: <Assignment />, path: '/Chef-Filiere/Dashboard/Devoirs' },
  { title: 'FSMlearning', icon: <LibraryBooks />, path: '/Chef-Filiere/Dashboard/FSMlearning' },
  { title: 'Filieres', icon: <LibraryBooks />, path: '/Chef-Filiere/Dashboard/Filieres' },
  { title: 'Demandes', icon: <Description />, path: '/Chef-Filiere/Dashboard/Demandes' },

];

const ChefFiliere = () => {
  const navigate = useNavigate();
  const [chefDetails, setChefDetails] = useState(null);

  useEffect(() => {
    const fetchChefDetails = async () => {
      try {
        const chefId = localStorage.getItem('cheffId');
        if (!chefId) {
          throw new Error('Chef Filiere ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/chefFilieres/${chefId}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch Chef Filiere details');
        }

        setChefDetails(response.data);
      } catch (error) {
        console.error('Error fetching Chef Filiere details:', error.message);
        // Handle error state if needed
      }
    };

    fetchChefDetails();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navig />
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Bienvenue  {chefDetails?.nom} {chefDetails?.prenom}
      </Typography>
      <div style={{ marginLeft: 185, marginRight: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={6}>
          {cards.map((card, index) => (
            <Grid item xs={3.5} key={index}>
              <Card onClick={() => handleNavigation(card.path)} style={{ borderRadius: "20px", cursor: 'pointer', border: "1px solid orange", height: '100%', width: "250px", justifyContent: 'center', alignItems: 'center' }}>
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
          <Grid item xs={4} />
        </Grid>
      </div>
    </>
  );
};

export default ChefFiliere;
