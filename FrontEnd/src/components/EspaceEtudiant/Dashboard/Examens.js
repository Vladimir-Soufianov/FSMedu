import React, { useState, useEffect } from 'react';

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
} from '@mui/material';

const Examens = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Simulate fetching data
    const fetchGrades = async () => {
      try {
        // Simulated data
        const mockGrades = [
          { id: 1, local: 'Room A101', moduleName: 'Mathematics', heureGarde: '08:00 - 10:00' },
          { id: 2, local: 'Room B202', moduleName: 'Physics', heureGarde: '10:00 - 12:00' },
          { id: 3, local: 'Room C303', moduleName: 'Chemistry', heureGarde: '14:00 - 16:00' },
          { id: 4, local: 'Room D404', moduleName: 'Biology', heureGarde: '16:00 - 18:00' },
          { id: 5, local: 'Room E505', moduleName: 'Computer Science', heureGarde: '08:00 - 10:00' },
        ];

        setGrades(mockGrades);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setError('Failed to fetch grades'); // Update error state with meaningful message
        setLoading(false);
      }
    };

    fetchGrades();
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
        <Table aria-label="garde table">
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>Local</TableCell>
              <TableCell style={cellStyle}>Module Name</TableCell>
              <TableCell style={cellStyle}>Heure de Garde</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell style={cellStyle}>{grade.local}</TableCell>
                  <TableCell style={cellStyle}>{grade.moduleName}</TableCell>
                  <TableCell style={cellStyle}>{grade.heureGarde}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Examens;
