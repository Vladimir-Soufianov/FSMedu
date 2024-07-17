import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ChefDepDrawer';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const ChefDeptLearning = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const chefDeptId = localStorage.getItem('chefd'); // Assuming chief department ID is stored in local storage
        const response = await fetch(`http://localhost:8080/api/chefdepartements/${chefDeptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chief department data');
        }
        const chefDeptData = await response.json();
        const { modIds } = chefDeptData;

        const modulesData = await Promise.all(
          modIds.map(async (moduleId) => {
            const moduleResponse = await fetch(`http://localhost:8080/api/mods/${moduleId}`);
            console.log('moduleId:', moduleId);
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
    navigate(`/Chef-Departement/Dashboard/FSMlearning/module/${moduleId}`);
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

export default ChefDeptLearning;
