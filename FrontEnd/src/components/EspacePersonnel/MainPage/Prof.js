import React, { useEffect, useState } from 'react';
import Navig from '../../incs/Navig';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { School, AssignmentTurnedIn, Notifications, Schedule, Security, Work, LibraryBooks, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cards = [
  { title: 'Modules', icon: <AssignmentTurnedIn />, path: '/Prof/Dashboard/Modules' },
  { title: 'Notes', icon: <Assignment />, path: '/Prof/Dashboard/Notes' },
  { title: 'Annonces', icon: <Notifications />, path: '/Prof/Dashboard/Annonces' },
  { title: 'Emploi du temps', icon: <Schedule />, path: '/Prof/Dashboard/Emplois' },
  { title: 'Garde', icon: <Security />, path: '/Prof/Dashboard/Garde' },
  { title: 'Devoirs', icon: <Work />, path: '/Prof/Dashboard/Devoirs' },
  { title: 'FSMlearning', icon: <LibraryBooks />, path: '/Prof/Dashboard/FSMlearning' },
];

const Prof = () => {
  const navigate = useNavigate();
  const [profDetails, setProfDetails] = useState(null);

  useEffect(() => {
    const fetchProfDetails = async () => {
      try {
        const profId = localStorage.getItem('profoId');
        if (!profId) {
          throw new Error('Prof ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/profs/${profId}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch prof details');
        }

        setProfDetails(response.data);
      } catch (error) {
        console.error('Error fetching prof details:', error.message);
        // Handle error state if needed
      }
    };

    fetchProfDetails();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navig />
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Bienvenue  {profDetails?.nom} {profDetails?.prenom}
      </Typography>
      <div style={{ marginLeft: 185, marginRight: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={6}>
          {cards.map((card, index) => (
            <Grid item xs={3.5} key={index}>
              <Card onClick={() => handleNavigation(card.path)} style={{ borderRadius:"20px 20px 20px 20px",cursor: 'pointer', border: "1px solid orange", height: '100%', width: "250px", justifyContent: 'center', alignItems: 'center' }}>
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

export default Prof;
