import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, Paper, CircularProgress } from '@mui/material';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ProfDrawer';

const DevoirDetails = () => {
  const { id } = useParams();
  const [devoir, setDevoir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reponses, setReponses] = useState([]);

  useEffect(() => {
    const fetchDevoirDetails = async () => {
      try {
        // Fetch assignment details
        const devoirResponse = await fetch(`http://localhost:8080/api/devoirs/${id}`);
        if (!devoirResponse.ok) {
          throw new Error('Failed to fetch assignment details');
        }
        const devoirData = await devoirResponse.json();
        setDevoir(devoirData);

        // Fetch responses for the assignment
        const reponsesResponse = await fetch(`http://localhost:8080/api/reponses/devoir/${id}`);
        if (!reponsesResponse.ok) {
          throw new Error('Failed to fetch responses');
        }
        const reponsesData = await reponsesResponse.json();
        setReponses(reponsesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
        setLoading(false);
      }
    };

    fetchDevoirDetails();
  }, [id]);

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      const studentData = await response.json();
      return `${studentData.nom} ${studentData.prenom}`;
    } catch (error) {
      console.error('Error fetching student details:', error);
      return 'Unknown Student';
    }
  };

  const fetchModuleNom = async (moduleId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/mods/${moduleId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch module details');
      }
      const moduleData = await response.json();
      return moduleData.nom;
    } catch (error) {
      console.error('Error fetching module details:', error);
      return 'Unknown Module';
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!devoir) {
    return <Typography variant="h6">Assignment not found</Typography>;
  }

  return (
    <>
      <Navig />
      <ProfDrawer />
      <Grid container spacing={3} style={{ padding: '20px', marginLeft: '260px', boxSizing: 'border-box', width: '1100px' }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              {devoir.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {devoir.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Module: <ModuleDetails moduleId={devoir.moduleId} fetchModuleNom={fetchModuleNom} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Réponses:</Typography>
          {reponses.length > 0 ? (
            reponses.map((reponse) => (
              <ResponseDetails key={reponse.id} reponse={reponse} fetchStudentDetails={fetchStudentDetails} />
            ))
          ) : (
            <Typography variant="body2">Pas de réponses !</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const ModuleDetails = ({ moduleId, fetchModuleNom }) => {
  const [moduleName, setModuleName] = useState('Loading...');

  useEffect(() => {
    const getModuleName = async () => {
      const name = await fetchModuleNom(moduleId);
      setModuleName(name);
    };

    getModuleName();
  }, [moduleId, fetchModuleNom]);

  return <span>{moduleName}</span>;
};

const ResponseDetails = ({ reponse, fetchStudentDetails }) => {
  const [studentName, setStudentName] = useState('Loading...');

  useEffect(() => {
    const getStudentName = async () => {
      const name = await fetchStudentDetails(reponse.studentId);
      setStudentName(name);
    };

    getStudentName();
  }, [reponse.studentId, fetchStudentDetails]);

  return (
    <Paper key={reponse.id} elevation={3} style={{ padding: '20px', margin: '10px 0' }}>
      <Typography variant="body1" style={{marginBottom:"40px", marginTop:"10px"}}>
        Etudiant: {studentName}
      </Typography>
      {reponse.fichierUrl ? (
        <Button variant="contained" color="primary" href={reponse.fichierUrl} target="_blank" rel="noopener noreferrer">
          Ouvrir fichier de réponse 
        </Button>
      ) : (
        <Typography variant="body2" color="error">
          Pas de réponse
        </Typography>
      )}
    </Paper>
  );
};

export default DevoirDetails;
