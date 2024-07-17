import React from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const Documents = () => {
  const handleDocumentRequest = async (documentType) => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        throw new Error('Student ID not found in local storage');
      }

      // Example POST request to api/documents endpoint
      const response = await axios.post('http://localhost:8080/api/documents', {
        studentId: studentId,
        documentType: documentType,
      });

      console.log('Document request successful:', response.data);
      // Handle success (e.g., show success message to the user)
    } catch (error) {
      console.error('Error submitting document request:', error.message);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Typography variant="h2" component="div" style={{ textAlign: "center", marginLeft: "260px", marginBottom: "40px" }}>
        Demande de documents
      </Typography>
      <Grid
        container
        spacing={5}
        style={{
          marginLeft: '240px',
          maxWidth: 'calc(100vw - 260px)',
          padding: '20px',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card
            variant="outlined"
            style={{
              height: '150px',
              backgroundColor: "",
              border: "2px solid blue",
              borderRadius: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" style={{marginBottom:"15px"}}>
                Relevé de Notes
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleDocumentRequest('Relevé de Notes')}>
                Demander
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card
            variant="outlined"
            style={{
              height: '150px',
              backgroundColor: "",
              border: "2px solid blue",
              borderRadius: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" style={{marginBottom:"15px"}}>
                Retrait de Bac
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleDocumentRequest('Retrait de Bac')}>
                Demander
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card
            variant="outlined"
            style={{
              height: '150px',
              backgroundColor: "",
              border: "2px solid blue",
              borderRadius: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" style={{marginBottom:"15px"}}>
                Demande de Diplôme
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleDocumentRequest('Demande de Diplôme')}>
                Demander
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card
            variant="outlined"
            style={{
              height: '150px',
 
              border: "2px solid blue",
              borderRadius: "20px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div"style={{marginBottom:"15px"}}>
                Attestation d'Inscription
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleDocumentRequest('Attestation d\'Inscription')}>
                Demander
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Documents;
