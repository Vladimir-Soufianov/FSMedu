import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import ChefFilDrawer from '../../Drawers/ChefFilDrawer';
import { Card, CardContent, Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';

const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

const Filiere = () => {
  const [chefFiliere, setChefFiliere] = useState(null);
  const [filiere, setFiliere] = useState(null);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chefFiliereId = localStorage.getItem('cheffId');
        console.log('Fetching Chef Filiere details...');
        const chefFiliereResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${chefFiliereId}`);
        
        if (chefFiliereResponse.status !== 200) {
          throw new Error('Failed to fetch ChefFiliere details');
        }
        
        console.log('Chef Filiere details fetched:', chefFiliereResponse.data);
        setChefFiliere(chefFiliereResponse.data);
  
        const filiereId = chefFiliereResponse.data.filiereId;
        console.log(`Fetching filiere for filiere ID: ${filiereId}`);
  
        const filiereResponse = await axios.get(`http://localhost:8080/api/filieres/${filiereId}`);
        
        if (filiereResponse.status !== 200) {
          throw new Error('Failed to fetch filiere');
        }
        
        console.log('Filiere fetched:', filiereResponse.data);
        setFiliere(filiereResponse.data);
  
        console.log('Fetching modules for the filiere...');
        
        const modulesResponse = await axios.get(`http://localhost:8080/api/mods`);
        
        if (modulesResponse.status !== 200) {
          throw new Error('Failed to fetch modules');
        }
        
        const filteredModules = modulesResponse.data.filter(mod => mod.filiereId === filiereId);
        console.log('Modules fetched for filiere:', filteredModules);

        console.log('Fetching semestres...');
        const semestresResponse = await axios.get(`http://localhost:8080/api/semestres`);

        if (semestresResponse.status !== 200) {
          throw new Error('Failed to fetch semestres');
        }

        const semestres = semestresResponse.data;
        const enrichedModules = await Promise.all(filteredModules.map(async (mod) => {
          const semestre = semestres.find(sem => sem.id === mod.semestreId);
          let associatedName = 'N/A';

          if (mod.profId) {
            const profResponse = await axios.get(`http://localhost:8080/api/profs/${mod.profId}`);
            if (profResponse.status === 200) {
              associatedName = `${profResponse.data.nom} ${profResponse.data.prenom}`;
            } else {
              throw new Error(`Failed to fetch prof details for ID: ${mod.profId}`);
            }
          } else if (mod.chefdepId) {
            const chefDepResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${mod.chefdepId}`);
            if (chefDepResponse.status === 200) {
              associatedName = `${chefDepResponse.data.nom} ${chefDepResponse.data.prenom}`;
            } else {
              throw new Error(`Failed to fetch Chef Department details for ID: ${mod.chefdepId}`);
            }
          } else if (mod.cheffilId) {
            const chefFiliereResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${mod.cheffilId}`);
            if (chefFiliereResponse.status === 200) {
              associatedName = `${chefFiliereResponse.data.nom} ${chefFiliereResponse.data.prenom}`;
            } else {
              throw new Error(`Failed to fetch Chef Filiere details for ID: ${mod.cheffilId}`);
            }
          }

          return {
            ...mod,
            semestreName: semestre ? semestre.nom : 'Unknown',
            associatedName
          };
        }));

        setModules(enrichedModules);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (isLoading) {
    console.log('Loading data...');
    return (
      <>
        <Navig />
        <ChefFilDrawer />
        <LoadingScreen />
      </>
    );
  }

  if (error) {
    console.error('Error rendering component:', error);
    return <div>Error: {error}</div>;
  }

  console.log('Rendering component with data:', { chefFiliere, filiere, modules });

  return (
    <>
      <Navig />
      <ChefFilDrawer />

      <Container style={{ marginLeft: '260px', marginTop: '20px', width: '1080px' }}>
        {chefFiliere && (
          <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary">Chef Filiere Details</Typography>
              <Typography variant="body2"><strong>Nom:</strong> {chefFiliere.nom} {chefFiliere.prenom}</Typography>
              {/* Add more details as needed */}
            </CardContent>
          </Card>
        )}

        {filiere && (
          <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#e0f7fa' }}>
            <CardContent>
              <Typography variant="h4" component="h2" color="green">Filiere: {filiere.nom}</Typography>
              <Divider style={{ margin: '10px 0' }} />
              <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Module</TableCell>
                      <TableCell>Semestre</TableCell>
                      <TableCell>Enseignant</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modules.map(mod => (
                      <TableRow key={mod.nom}>
                        <TableCell>{mod.nom}</TableCell>
                        <TableCell>{mod.semestreName}</TableCell>
                        <TableCell>{mod.associatedName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Filiere;
