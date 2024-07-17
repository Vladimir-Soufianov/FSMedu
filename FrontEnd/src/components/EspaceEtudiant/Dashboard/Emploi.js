import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
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

const Emploi = () => {
  const [emplois, setEmplois] = useState([]);
  const [moduleNames, setModuleNames] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchEmploiDuTemps = async () => {
      try {
        console.log('Fetching seances...');
        const response = await axios.get('http://localhost:8080/api/seances');
        const seances = response.data;
        console.log('Seances fetched:', seances);

        // Extract unique module IDs from seances
        const moduleIds = [...new Set(seances.map(seance => seance.moduleId))];
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
        setModuleNames(moduleNamesMap);
        console.log('Module names mapped:', moduleNamesMap);

        // Prepare emploi du temps structure
        const emploiDuTemps = seances.reduce((acc, seance) => {
          const day = new Date(seance.start[0], seance.start[1] - 1, seance.start[2]).toLocaleDateString('en-US', { weekday: 'long' });
          const start = `${seance.start[3].toString().padStart(2, '0')}:${seance.start[4].toString().padStart(2, '0')}`;
          const finish = `${seance.finish[3].toString().padStart(2, '0')}:${seance.finish[4].toString().padStart(2, '0')}`;
          const timeSlot = `${start} - ${finish}`;

          // Find or create the day entry in acc
          let dayEntry = acc.find(item => item.day === day);
          if (!dayEntry) {
            dayEntry = {
              day,
              timeSlots: [],
            };
            acc.push(dayEntry);
          }

          // Push the time slot with moduleId and local (room) details
          dayEntry.timeSlots.push({
            id: seance.id,
            timeSlot,
            moduleId: seance.moduleId,
            room: seance.local,
          });

          return acc;
        }, []);

        setEmplois(emploiDuTemps);
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
      <StudentDrawer />
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1050px', marginTop: '50px' }}>
        {loading ? (
          <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: '20px 0' }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: '20px 0', color: 'red' }}>
            {error}
          </Typography>
        ) : (
          <Table aria-label="emploi du temps table">
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>Time Slot / Day</TableCell>
                {emplois.map((emploi) => (
                  <TableCell key={emploi.day} style={cellStyle}>{emploi.day}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {emplois.map((emploi) => (
                emploi.timeSlots.map((timeSlot) => (
                  <TableRow key={timeSlot.id}>
                    <TableCell style={cellStyle}>{timeSlot.timeSlot}</TableCell>
                    <TableCell style={cellStyle}>
                      {`${moduleNames[timeSlot.moduleId]} (${timeSlot.room})`}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </ThemeProvider>
  );
};

export default Emploi;
