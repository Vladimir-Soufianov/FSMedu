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
  Typography,
} from '@mui/material';

const Emplois = () => {
  const [emploiDuTemps, setEmploiDuTemps] = useState([]);
  const [nomsModules, setNomsModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmploiDuTemps = async () => {
      try {
        const chefId = localStorage.getItem('chefd'); // Fetch chefId from localStorage
        console.log('Fetching seances for chefId:', chefId);

        // Fetch all seances
        console.log('Fetching seances...');
        const response = await axios.get('http://localhost:8080/api/seances');
        const seances = response.data;
        console.log('Seances fetched:', seances);

        // Filter seances by chefdepid and moduleId
        const filteredSeances = seances.filter(seance => seance.chefdepid === 1 && seance.moduleId === 4);
        console.log('Filtered Seances:', filteredSeances);

        // Extract unique module IDs from filtered seances
        const moduleIds = [...new Set(filteredSeances.map(seance => seance.moduleId))];
        console.log('Unique module IDs:', moduleIds);

        // Fetch module names for each module ID separately
        const moduleNamesMap = {};
        for (const moduleId of moduleIds) {
          try {
            const moduleResponse = await axios.get(`http://localhost:8080/api/mods/${moduleId}`);
            const module = moduleResponse.data;
            moduleNamesMap[moduleId] = module.nom;
          } catch (moduleError) {
            console.error(`Error fetching module ${moduleId}:`, moduleError);
          }
        }
        setNomsModules(moduleNamesMap);
        console.log('Module names mapped:', moduleNamesMap);

        // Prepare emploi du temps structure
        const emploiDuTempsStructure = filteredSeances.map(seance => ({
          id: seance.id,
          start: `${seance.start[3].toString().padStart(2, '0')}:${seance.start[4].toString().padStart(2, '0')}`,
          finish: `${seance.finish[3].toString().padStart(2, '0')}:${seance.finish[4].toString().padStart(2, '0')}`,
          moduleId: seance.moduleId,
          salle: seance.local,
        }));

        setEmploiDuTemps(emploiDuTempsStructure);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emploi du temps:', error);
        setError('Failed to fetch emploi du temps');
        setLoading(false);
      }
    };

    fetchEmploiDuTemps();
  }, []);

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // Custom styles for TableCell
  const cellStyle = {
    width: '200px',
    height: '100px',
    border: '1px solid #000',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '8px',
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Navig />
      <ChefDepDrawer />
      <Typography variant="h5" gutterBottom style={{ marginLeft: '280px' }}>
        Emploi du temps
      </Typography>
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1050px', marginTop: '30px' }}>
        {loading ? (
          <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: '20px 0' }}>
            Chargement...
          </Typography>
        ) : error ? (
          <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: '20px 0', color: 'red' }}>
            {error}
          </Typography>
        ) : (
          <Table aria-label="emploi du temps table">
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>code Séance</TableCell>
                <TableCell style={cellStyle}>Début - Fin</TableCell>
                <TableCell style={cellStyle}>Module</TableCell>
                <TableCell style={cellStyle}>Salle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emploiDuTemps.map(seance => (
                <TableRow key={seance.id}>
                  <TableCell style={cellStyle}>{`20${seance.id}`}</TableCell>
                  <TableCell style={cellStyle}>{`${seance.start} - ${seance.finish}`}</TableCell>
                  <TableCell style={cellStyle}>{nomsModules[seance.moduleId]}</TableCell>
                  <TableCell style={cellStyle}>{`${seance.salle}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </ThemeProvider>
  );
};

export default Emplois;
