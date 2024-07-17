import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const FSMlearning = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const studentId = localStorage.getItem('studentId'); // Fetching student ID from localStorage
        if (!studentId) {
          throw new Error('Student ID not found in local storage');
        }

        const response = await fetch(`http://localhost:8080/api/students/${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const studentData = await response.json();
        const { modIds } = studentData;

        const modulesData = await Promise.all(
          modIds.map(async (moduleId) => {
            const moduleResponse = await fetch(`http://localhost:8080/api/mods/${moduleId}`);
            if (!moduleResponse.ok) {
              throw new Error(`Failed to fetch module ${moduleId}`);
            }
            const module = await moduleResponse.json();
            return { id: moduleId, nom: module.nom };
          })
        );

        setModules(modulesData);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  const handleModuleClick = (moduleId) => {
    navigate(`/FSMlearning/module/${moduleId}`);
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Container maxWidth="lg" style={{ marginTop: '20px', marginLeft: '250px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
          Learning Page
        </Typography>

        <Grid container spacing={3} style={{ width: '1080px' }}>
          {/* Modules Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom style={{ color: '#f57c00' }}>
              Modules
            </Typography>
            {modules.map((module) => (
              <Card key={module.id} style={{ marginBottom: '20px', width: '450px' }} onClick={() => handleModuleClick(module.id)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {module.nom}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FSMlearning;
