import React, { useState, useEffect } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import axios from 'axios';

const Devoirs = () => {
  const [devoirs, setDevoirs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      fetchModulesAndDevoirs(studentId);
    }
  }, []);

  const fetchModulesAndDevoirs = async (studentId) => {
    try {
      // Fetch modules for the student
      const modulesResponse = await axios.get(`http://localhost:8080/api/students/${studentId}/mods`);
      const moduleIds = modulesResponse.data.map(mod => mod.id);

      // Fetch devoirs for the modules
      const devoirsResponse = await Promise.all(
        moduleIds.map(moduleId => axios.get(`http://localhost:8080/api/devoirs/module/${moduleId}`))
      );

      // Combine all devoirs into a single array
      const allDevoirs = devoirsResponse.flatMap(response => response.data);
      
      // Filter out devoirs with id 1 or 2
      const filteredDevoirs = allDevoirs.filter(devoir => devoir.id !== 1 && devoir.id !== 2);

      setDevoirs(filteredDevoirs);
    } catch (error) {
      console.error('Error fetching modules or devoirs:', error);
    }
  };

  const handleFileChange = (event) => {
    const devoirId = event.target.dataset.devoirId;
    setSelectedFiles({
      ...selectedFiles,
      [devoirId]: event.target.files[0]
    });
  };

  const handleSubmitFile = async (devoirId) => {
    const studentId = localStorage.getItem('studentId');
    const file = selectedFiles[devoirId];

    if (studentId && file) {
      try {
        const formData = new FormData();
        formData.append('devfile', file);
        formData.append('devoirId', devoirId);
        formData.append('studentId', studentId);

        const response = await axios.post('http://localhost:8080/api/reponses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Update devoir in state to show the file URL
        const updatedDevoirs = devoirs.map(devoir => {
          if (devoir.id === devoirId) {
            return {
              ...devoir,
              fichierUrl: response.data.fichierUrl // Assuming your API response includes the file URL
            };
          }
          return devoir;
        });

        setDevoirs(updatedDevoirs);
        alert('File submitted successfully');
      } catch (error) {
        console.error('Error submitting file:', error);
        alert('Error submitting file');
      }
    } else {
      alert('Please select a file');
    }
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Container style={{ marginLeft: "280px", marginTop: "40px" }}>
        <Typography variant="h4" style={{ marginBottom: "50px" }}>Mes Devoirs</Typography>
        <Grid container spacing={3}>
          {devoirs.map(devoir => (
            <Grid item key={devoir.id}>
              <Card style={{ width: "450px", minHeight: "250px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent>
                  <Typography variant="h4" component="div" style={{ marginBottom: "50px", textAlign: "center" }}>{devoir.title}</Typography>
                  <Typography variant="h5" color="text.secondary" style={{ marginBottom: "20px", color: "black" }}>{devoir.description}</Typography>
                  <Typography variant="h5" color="text.secondary" style={{ marginBottom: "20px", color: "black" }}>Due Date: {devoir.fin}</Typography>
                  {devoir.fileUrl && (
                    <Typography variant="body2" color="primary">
                      <a href={devoir.fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
                    </Typography>
                  )}
                  {devoir.fichierUrl && (
                    <Typography variant="body2" color="primary">
                      <a href={devoir.fichierUrl} target="_blank" rel="noopener noreferrer">View Submission</a>
                    </Typography>
                  )}
                </CardContent>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the default file input UI
                    data-devoir-id={devoir.id} // Attach devoir ID as data attribute
                    id={`file-upload-${devoir.id}`} // Unique ID for each file input
                  />
                  <label htmlFor={`file-upload-${devoir.id}`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      component="span"
                    >
                      Upload File
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleSubmitFile(devoir.id)}
                  >
                    Submit File
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Devoirs;
