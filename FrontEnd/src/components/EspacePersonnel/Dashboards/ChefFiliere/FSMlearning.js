import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ChefFilDrawer';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const FsmLearning = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const chefId = localStorage.getItem('cheffId'); // Assuming chefFiliere ID is stored in local storage
        if (!chefId) {
          throw new Error('chefFiliere ID not found in localStorage');
        }
        
        const response = await fetch(`http://localhost:8080/api/chefFilieres/${chefId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chefFiliere data');
        }
        
        const cheffData = await response.json();
        const { modIds } = cheffData;

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
    navigate(`/Chef-Filiere/Dashboard/FSMlearning/module/${moduleId}`);
  };

  return (
    <>
      <Navig />
      <ProfDrawer />
      <Container maxWidth="lg" style={{ marginTop: '20px', marginLeft: '250px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
          Learning Page
        </Typography>

        <Grid container spacing={3} style={{ width: '500px' }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom style={{ color: '#f57c00' }}>
              Modules
            </Typography>
            {modules.map((module) => (
              <Card key={module.id} style={{ marginBottom: '20px' }} onClick={() => handleModuleClick(module.id)}>
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

export default FsmLearning;
