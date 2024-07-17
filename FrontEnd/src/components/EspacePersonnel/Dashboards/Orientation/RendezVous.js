import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, IconButton, createTheme, ThemeProvider } from '@mui/material';
import { Check, Close } from '@mui/icons-material'; // Icons for accept and refuse buttons
import Navig from '../../../incs/Navig';
import OrientationDrawer from '../../Drawers/OrientationDrawer';

const drawerWidth = 240;

const RendezVous = () => {
  const [rendezvousList, setRendezvousList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRendezvous = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rendezvous'); // Adjust the endpoint as per your backend API
        const formattedRendezvous = response.data.map(rendezvous => ({
          ...rendezvous,
          date: new Date(rendezvous.date[0], rendezvous.date[1] - 1, rendezvous.date[2], rendezvous.date[3], rendezvous.date[4]),
        }));
        setRendezvousList(formattedRendezvous);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRendezvous();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleAcceptRendezvous = async (rendezvousId) => {
    try {
      await axios.post(`http://localhost:8080/api/rendezvous/${rendezvousId}/accept`);
      console.log(`Accepted rendezvous ${rendezvousId}`);
      setRendezvousList(prevRendezvous => prevRendezvous.filter(rendezvous => rendezvous.id !== rendezvousId));
    } catch (error) {
      console.error('Error accepting rendezvous:', error);
    }
  };

  const handleRefuseRendezvous = async (rendezvousId) => {
    try {
      await axios.post(`http://localhost:8080/api/rendezvous/${rendezvousId}/refuse`);
      console.log(`Refused rendezvous ${rendezvousId}`);
      setRendezvousList(prevRendezvous => prevRendezvous.filter(rendezvous => rendezvous.id !== rendezvousId));
    } catch (error) {
      console.error('Error refusing rendezvous:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <Navig />
        <OrientationDrawer />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navig />
        <OrientationDrawer />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Navig />
        <OrientationDrawer />
        <div style={{ marginLeft: drawerWidth + 20, width: "1080px" }}>
          <Typography variant="h4" style={{ color: 'white' }} gutterBottom>
            Rendezvous
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Nom</TableCell>
                  <TableCell align="left" style={{ color: 'white' }}>Prenom</TableCell>
                  <TableCell align="left" style={{ color: 'white' }}>Email</TableCell>
                  <TableCell align="left" style={{ color: 'white' }}>Date</TableCell>
                  <TableCell align="left" style={{ color: 'white' }}>Heure</TableCell>
                  <TableCell align="center" style={{ color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rendezvousList.map((rendezvous) => (
                  <TableRow key={rendezvous.id}>
                    <TableCell component="th" scope="row" style={{ color: 'white' }}>
                      {rendezvous.nom}
                    </TableCell>
                    <TableCell align="left" style={{ color: 'white' }}>{rendezvous.prenom}</TableCell>
                    <TableCell align="left" style={{ color: 'white' }}>{rendezvous.email}</TableCell>
                    <TableCell align="left" style={{ color: 'white' }}>{new Date(rendezvous.date).toLocaleDateString()}</TableCell>
                    <TableCell align="left" style={{ color: 'white' }}>{new Date(rendezvous.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleAcceptRendezvous(rendezvous.id)}
                        style={{ marginRight: '10px' }}
                      >
                        <Check />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleRefuseRendezvous(rendezvous.id)}
                      >
                        <Close />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    </ThemeProvider>
  );
};

export default RendezVous;
