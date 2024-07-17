import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import ChefFilDrawer from '../../Drawers/ChefFilDrawer';
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
import ChefDepDrawer from '../../Drawers/ChefDepDrawer';

const Emplois = () => {
  const [emplois, setEmplois] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Simulate fetching data
    const fetchEmploiDuTemps = async () => {
      try {
        // Simulated data
        const mockEmplois = [
          { id: 1, day: 'Monday', timeSlots: [
            { id: 11, timeSlot: '08:00 - 10:00', moduleName: 'Mathematics', room: 'A101' },
            { id: 12, timeSlot: '10:00 - 12:00', moduleName: 'Physics', room: 'B202' },
            { id: 13, timeSlot: '14:00 - 16:00', moduleName: 'Chemistry', room: 'C303' },
            { id: 14, timeSlot: '16:00 - 18:00', moduleName: 'Biology', room: 'D404' },
          ] },
          { id: 2, day: 'Tuesday', timeSlots: [
            { id: 21, timeSlot: '08:00 - 10:00', moduleName: 'English', room: 'F606' },
            { id: 22, timeSlot: '10:00 - 12:00', moduleName: 'History', room: 'G707' },
            { id: 23, timeSlot: '14:00 - 16:00', moduleName: 'Geography', room: 'H808' },
          ] },
          { id: 3, day: 'Wednesday', timeSlots: [
            { id: 31, timeSlot: '08:00 - 10:00', moduleName: 'Mathematics', room: 'J101' },
            { id: 32, timeSlot: '10:00 - 12:00', moduleName: 'Physics', room: 'K202' },
            { id: 33, timeSlot: '14:00 - 16:00', moduleName: 'Chemistry', room: 'L303' },
            { id: 34, timeSlot: '16:00 - 18:00', moduleName: 'Biology', room: 'M404' },
          ] },
          { id: 4, day: 'Thursday', timeSlots: [
            { id: 41, timeSlot: '08:00 - 10:00', moduleName: 'English', room: 'O606' },
            { id: 42, timeSlot: '10:00 - 12:00', moduleName: 'History', room: 'P707' },
            { id: 43, timeSlot: '14:00 - 16:00', moduleName: 'Geography', room: 'Q808' },
          ] },
          { id: 5, day: 'Friday', timeSlots: [
            { id: 51, timeSlot: '08:00 - 10:00', moduleName: 'Computer Science', room: 'E505' },
            { id: 52, timeSlot: '10:00 - 12:00', moduleName: 'Art', room: 'R909' },
            { id: 53, timeSlot: '14:00 - 16:00', moduleName: 'Music', room: 'S101' },
          ] },
        ];

        setEmplois(mockEmplois);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emploi du temps:', error);
        setError('Failed to fetch emploi du temps'); // Update error state with meaningful message
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
      <ChefFilDrawer/>
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1050px', marginTop: '50px' }}>
        <Table aria-label="emploi du temps table">
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>Time Slot / Day</TableCell>
              {emplois.map((emploi) => (
                <TableCell key={emploi.id} style={cellStyle}>{emploi.day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {emplois.length > 0 && emplois[0].timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot.id}>
                <TableCell style={cellStyle}>{timeSlot.timeSlot}</TableCell>
                {emplois.map((emploi) => (
                  <TableCell key={emploi.id} style={cellStyle}>
                    {emploi.timeSlots.find(item => item.timeSlot === timeSlot.timeSlot) ?
                      `${emploi.timeSlots.find(item => item.timeSlot === timeSlot.timeSlot).moduleName} (${emploi.timeSlots.find(item => item.timeSlot === timeSlot.timeSlot).room})` :
                      '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Emplois;
