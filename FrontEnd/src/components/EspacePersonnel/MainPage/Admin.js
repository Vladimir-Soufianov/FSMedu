import React, { useEffect, useState } from 'react';
import Navig from '../../incs/Navig';
import AdminDrawer from '../Drawers/AdminDrawer';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { People, School, CalendarToday, Book, Event, Announcement, Assignment, LibraryBooks, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cards = [
  { title: 'Personnel', icon: <People />, path: '/Admin/Dashboard/Employees' },
  { title: 'Etudiants', icon: <School />, path: '/Admin/Dashboard/Etudiants' },
  { title: 'Seances', icon: <CalendarToday />, path: '/Admin/Dashboard/Seances' },
  { title: 'Modules', icon: <Book />, path: '/Admin/Dashboard/Modules' },
  { title: 'Bibliothèque', icon: <LibraryBooks />, path: '/Admin/Dashboard/Librairie' },
  { title: 'Evénments', icon: <Event />, path: '/Admin/Dashboard/Evenements' },
  { title: 'Annonces', icon: <Announcement />, path: '/Admin/Dashboard/Actualites' },
  { title: 'Inscriptions', icon: <Assignment />, path: '/Admin/Dashboard/Inscription' },
  { title: 'Documents', icon: <Description />, path: '/Admin/Dashboard/Documents' },
];

const Admin = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const adminId = localStorage.getItem('adminoId');
        if (!adminId) {
          throw new Error('Admin ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/admins/${adminId}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch admin details');
        }

        setAdminDetails(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error.message);
        // Handle error state if needed
      }
    };

    fetchAdminDetails();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navig />
      <Typography variant="h4" style={{marginTop:20, marginBottom: 20, textAlign: 'center' }}>
          Bienvenue  {adminDetails?.nom} {adminDetails?.prenom}
        </Typography>
      <div style={{ marginLeft:185,marginRight:20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      
        <Grid container spacing={6}>
          {cards.map((card, index) => (
            <Grid item xs={3.5} key={index}>
              <Card onClick={() => handleNavigation(card.path)} style={{ cursor: 'pointer', border :"1px solid orange",borderRadius:"20px 20px 20px 20px", height: '100%' ,width:"250px",  justifyContent: 'center', alignItems: 'center'}}>
                <CardContent>
                  <IconButton style={{ fontSize: 50, color: '#3f51b5' ,border :"1px solid orange"}}>
                    {card.icon}
                  </IconButton>
                  <Typography variant="h6" style={{ textAlign: 'center',marginBottom:8}}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Admin;
