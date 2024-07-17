import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ProfDrawer';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  Typography
} from '@mui/material';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfModules = async () => {
      try {
        const profId = localStorage.getItem('profoId');
    
        if (!profId) {
          throw new Error('Professor ID not found in local storage');
        }
    
        console.log(`Fetching modules for professor ID: ${profId}`);
    
        const profDetailsResponse = await axios.get(`http://localhost:8080/api/profs/${profId}`);
    
        if (profDetailsResponse.status !== 200) {
          throw new Error('Failed to fetch professor details');
        }
    
        const moduleIds = profDetailsResponse.data.modIds;
    
        const modulePromises = moduleIds.map(async moduleId => {
          const response = await axios.get(`http://localhost:8080/api/mods/${moduleId}`);
          const moduleData = response.data;
    
          // Check if semestreId is null and handle it gracefully
          if (moduleData.semestreId === null || moduleData.semestreId === "null") {
            moduleData.semestreName = "Semestre Non Défini"; // Or handle as per your application's logic
          } else {
            const semestreResponse = await axios.get(`http://localhost:8080/api/semestres/${moduleData.semestreId}`);
            moduleData.semestreName = semestreResponse.data.nom;
          }
    
          return moduleData;
        });
    
        const modulesData = await Promise.all(modulePromises);
        setModules(modulesData);
      } catch (error) {
        console.error('Error fetching professor modules:', error);
        setError('Failed to fetch professor modules');
      } finally {
        setLoading(false);
      }
    };
    

    fetchProfModules();
  }, []);

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Navig />
      <ProfDrawer />
      <Typography variant="h5" gutterBottom style={{marginLeft:"280px"}}>
            Listes des modules
          </Typography>
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '20px' }}>
        <Table aria-label="modules table">
          <TableHead>
            <TableRow >
              <TableCell >Module </TableCell>
              <TableCell>Semestre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell >{module.nom}</TableCell>
                  <TableCell>{module.semestreName}</TableCell> {/* Displaying semester name */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Modules;
