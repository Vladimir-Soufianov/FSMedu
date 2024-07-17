import React, { useState, useEffect } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';

const Infos = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [modules, setModules] = useState([]);
  const [filieres, setFilieres] = useState([]); // New state for filiere names
  const [openDialog, setOpenDialog] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    nom: '',
    prenom: '',
    cin: '',
    cne: '',
    email: '',
    email_aca: '',
    ce: ''
  });

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        throw new Error('Student ID not found in local storage');
      }

      const response = await axios.get(`http://localhost:8080/api/students/${studentId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch student information');
      }

      const { nom, prenom, cin, cne, email, email_aca, ce, clubIds, modIds, filiereIds } = response.data;
      const studentData = { nom, prenom, cin, cne, email, email_aca, ce };
      setStudentInfo(studentData);

      // Fetch club names
      const clubPromises = clubIds.map(async (clubId) => {
        const clubResponse = await axios.get(`http://localhost:8080/api/clubs/${clubId}`);
        return clubResponse.data.nom;
      });
      const clubNames = await Promise.all(clubPromises);
      setClubs(clubNames);

      // Fetch module names
      const modulePromises = modIds.map(async (moduleId) => {
        const moduleResponse = await axios.get(`http://localhost:8080/api/mods/${moduleId}`);
        return moduleResponse.data.nom;
      });
      const moduleNames = await Promise.all(modulePromises);
      setModules(moduleNames);

      // Fetch filiere names
      const filierePromises = filiereIds.map(async (filiereId) => {
        const filiereResponse = await axios.get(`http://localhost:8080/api/filieres/${filiereId}`);
        return filiereResponse.data.nom;
      });
      const filiereNames = await Promise.all(filierePromises);
      setFilieres(filiereNames);

    } catch (error) {
      console.error('Error fetching student information:', error.message);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setUpdatedFields({
      nom: studentInfo.nom || '',
      prenom: studentInfo.prenom || '',
      cin: studentInfo.cin || '',
      cne: studentInfo.cne || '',
      email: studentInfo.email || '',
      email_aca: studentInfo.email_aca || '',
      ce: studentInfo.ce || ''
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUpdatedFields({
      nom: '',
      prenom: '',
      cin: '',
      cne: '',
      email: '',
      email_aca: '',
      ce: ''
    });
  };

  const handleUpdateFields = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        throw new Error('Student ID not found in local storage');
      }

      const response = await axios.post(`http://localhost:8080/api/students/${studentId}`, updatedFields);
      if (response.status !== 200) {
        throw new Error('Failed to update student information');
      }

      setUpdateSuccess(true);
      fetchStudentInfo(); // Refresh student information after update
    } catch (error) {
      console.error('Error updating student information:', error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUpdateSuccess(false);
  };

  const handleChange = (field, value) => {
    setUpdatedFields({
      ...updatedFields,
      [field]: value
    });
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 40, textAlign: 'center' }}>
        Informations Personnelles
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{ marginLeft:"1100px",marginTop:"-80px",marginBottom:"10px" }}
      >
        Modifier Informations
      </Button>
      <Grid container spacing={2} style={{ marginLeft: "180px" }} justifyContent="center">
        {studentInfo && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Nom</Typography>
                  <Typography variant="body1">{studentInfo.nom}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Prénom</Typography>
                  <Typography variant="body1">{studentInfo.prenom}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">CIN</Typography>
                  <Typography variant="body1">{studentInfo.cin || '-'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">CNE</Typography>
                  <Typography variant="body1">{studentInfo.cne || '-'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body1">{studentInfo.email || '-'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Email Académique</Typography>
                  <Typography variant="body1">{studentInfo.email_aca || '-'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Code Étudiant</Typography>
                  <Typography variant="body1">{studentInfo.ce}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Clubs</Typography>
                  <Typography variant="body1">{clubs.join(', ')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}>
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Modules</Typography>
                  <Typography variant="body1">{modules.join(', ')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={6}> {/* Add this block for Filiere */}
              <Card style={{ width: "400px", maxWidth: "500px"}}>
                <CardContent>
                  <Typography variant="h6">Filieres</Typography>
                  <Typography variant="body1">{filieres.join(', ')}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modifier Informations</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            fullWidth
            margin="normal"
            value={updatedFields.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
          />
          <TextField
            label="Prénom"
            fullWidth
            margin="normal"
            value={updatedFields.prenom}
            onChange={(e) => handleChange('prenom', e.target.value)}
          />
          <TextField
            label="CIN"
            fullWidth
            margin="normal"
            value={updatedFields.cin}
            onChange={(e) => handleChange('cin', e.target.value)}
          />
          <TextField
            label="CNE"
            fullWidth
            margin="normal"
            value={updatedFields.cne}
            onChange={(e) => handleChange('cne', e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={updatedFields.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextField
            label="Email Académique"
            fullWidth
            margin="normal"
            value={updatedFields.email_aca}
            onChange={(e) => handleChange('email_aca', e.target.value)}
          />
          <TextField
            label="Code Étudiant"
            fullWidth
            margin="normal"
            value={updatedFields.ce}
            onChange={(e) => handleChange('ce', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUpdateFields} color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={updateSuccess} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Informations mises à jour avec succès!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Infos;
