import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import ChefDepDrawer from '../../Drawers/ChefDepDrawer';
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
} from '@mui/material';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefDeptModules = async () => {
      try {
        const chefDeptId = localStorage.getItem('chefd');
    
        if (!chefDeptId) {
          throw new Error('Chief department ID not found in local storage');
        }
    
        console.log(`Fetching modules for chief department ID: ${chefDeptId}`);
    
        const chefDeptDetailsResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${chefDeptId}`);
    
        if (chefDeptDetailsResponse.status !== 200) {
          throw new Error('Failed to fetch chief department details');
        }
    
        const moduleIds = chefDeptDetailsResponse.data.modIds;
    
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
        console.error('Error fetching chief department modules:', error);
        setError('Failed to fetch chief department modules');
      } finally {
        setLoading(false);
      }
    };
    

    fetchChefDeptModules();
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
      <ChefDepDrawer />
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '20px' }}>
        <Table aria-label="modules table">
          <TableHead>
            <TableRow>
          
              <TableCell>Module </TableCell>
              <TableCell>Semester </TableCell>
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
                  <TableCell>{module.nom}</TableCell>
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
