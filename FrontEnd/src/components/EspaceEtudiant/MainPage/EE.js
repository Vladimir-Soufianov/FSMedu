import React, { useState, useEffect } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { Info, Notes, CalendarToday, Assignment, Description, School, Event, AssignmentInd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cases = [
  { title: 'Informations', icon: <Info />, path: 'infos' },
  { title: 'Notes', icon: <Notes />, path: 'notes' },
  { title: 'Emploi', icon: <CalendarToday />, path: 'emploi' },
  { title: 'Examens', icon: <Assignment />, path: 'examens' },
  { title: 'Documents', icon: <Description />, path: 'documents' },
  { title: 'FSMLearning', icon: <School />, path: 'fsmlearning' },
  { title: 'Devoirs', icon: <Event />, path: 'devoirs' },
  { title: 'Réinscription', icon: <AssignmentInd />, path: 'reinscription' },
];

const EE = () => {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        if (!studentId) {
          throw new Error('Student ID not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/api/students/${studentId}`);

        if (response.status !== 200) {
          throw new Error('Failed to fetch student details');
        }

        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error.message);
        // Handle error state if needed
      }
    };

    fetchStudentDetails();
  }, []);

  const handleNavigation = (path) => {
    navigate(`/EspaceEtudiant/${path}`);
  };

  return (
    <>
      <Navig />
    
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        {studentDetails ? `Bienvenue  ${studentDetails.nom} ${studentDetails.prenom}` : 'Chargement...'}
      </Typography>
      <div style={{ marginLeft: 185, marginRight: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={6}>
          {cases.map((caseItem, index) => (
            <Grid item xs={3.5} key={index}>
              <Card onClick={() => handleNavigation(caseItem.path)} style={{ cursor: 'pointer', border: '1px solid orange', borderRadius: '20px', height: '100%', width: '250px', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                  <IconButton style={{ fontSize: 50, color: '#3f51b5', border: '1px solid orange' }}>
                    {caseItem.icon}
                  </IconButton>
                  <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 8 }}>
                    {caseItem.title}
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

export default EE;
