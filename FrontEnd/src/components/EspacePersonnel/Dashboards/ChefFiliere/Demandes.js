import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

const dummyData = [
  {
    id: 1,
    student: 'Ahmed Alaoui',
    currentFiliere: 'SMI',
    semester: 'Semester 4',
    wishedFiliere: 'SMA',
  },
  {
    id: 2,
    student: 'Rachid Yassini',
    currentFiliere: 'MIP',
    semester: 'Semester 2',
    wishedFiliere: 'SVTU',
  },
  {
    id: 3,
    student: 'Saousan rechdani',
    currentFiliere: 'BCG',
    semester: 'Semester 6',
    wishedFiliere: 'SMI',
  },
 
];

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching with a timeout
    const fetchDemandes = () => {
      try {
        console.log('Fetching demandes...');

        // Simulate network delay
        setTimeout(() => {
          setDemandes(dummyData);
          setLoading(false);
          console.log('Demandes fetched:', dummyData);
        }, 2000);
      } catch (error) {
        console.error('Error fetching demandes data:', error);
        setError('Failed to fetch demandes data');
        setLoading(false);
      }
    };

    fetchDemandes();
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
      <ChefFilDrawer />
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '20px' }}>
        <Table aria-label="demandes table">
          <TableHead>
            <TableRow>
              <TableCell>Etudiant</TableCell>
              <TableCell>Filiere currente </TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Filiere voulu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              demandes.map((demande) => (
                <TableRow key={demande.id}>
                  <TableCell>{demande.student}</TableCell>
                  <TableCell>{demande.currentFiliere}</TableCell>
                  <TableCell>{demande.semester}</TableCell>
                  <TableCell>{demande.wishedFiliere}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Demandes;
