import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, createTheme, ThemeProvider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Navig from '../../../incs/Navig';
import OrientationDrawer from '../../Drawers/OrientationDrawer';

const drawerWidth = 240;

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newClubName, setNewClubName] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clubs');
        setClubs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addClub = async () => {
    handleClose(); // Close the dialog
    try {
      const newClub = {
        id: 2, // Replace with actual ID generation logic
        nom: newClubName,
        students: [],
      };
      
      // Assuming backend API supports adding clubs via POST request
      const response = await axios.post('http://localhost:8080/api/clubs', newClub);
      
      // Update clubs state with the new club
      setClubs([...clubs, newClub]);
      
      console.log('Club added successfully:', response.data);
    } catch (error) {
      console.error('Error adding club:', error);
      // Handle error (e.g., display error message)
    }
  };

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Ajouter un club
            </Button>
          </div>
          <Typography variant="h4" style={{ marginBottom:"40px", marginTop:"-40px" }} gutterBottom>
            Liste des clubs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Club</TableCell>
                  <TableCell align="left" style={{ color: 'white' }}>Etudiants</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell component="th" scope="row" style={{ color: 'white' }}>
                      {club.nom}
                    </TableCell>
                    <TableCell align="left" style={{ color: 'white' }}>
                      <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: 0, padding: 0 }}>
                        {club.students.map((student, index) => (
                          <li 
                            key={student.id} 
                            style={{ 
                              color: 'white', 
                              paddingBottom: '20px', 
                              marginTop: '10px', 
                              borderBottom: index === club.students.length - 1 ? 'none' : '1px solid #555555' 
                            }}
                          >
                            <span>{`${student.nom} ${student.prenom}`}</span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Entre le nom du club</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="club-name"
              label="Nom de club"
              type="text"
              fullWidth
              value={newClubName}
              onChange={(e) => setNewClubName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={addClub} variant="contained" color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ThemeProvider>
  );
};

export default Clubs;
