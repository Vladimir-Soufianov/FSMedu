import React, { useState } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Divider, Grid, TextField, Button, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DevoirDetails = () => {
  const { id } = useParams(); // Retrieve id from URL params
  const studentId = localStorage.getItem('studentId'); // Retrieve studentId from localStorage

  // State variables
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded file names
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility

  // Mock data for details based on id (Replace with actual logic)
  const devoir = {
    id: parseInt(id),
    title: `Homework ${id}`,
    description: `Description for Homework ${id}`,
    startDate: '2024-06-25',
    endDate: '2024-06-30',
    files: [`file${id}.pdf`, `file${id}.docx`],
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('studentId', studentId); // Append studentId to FormData
      formData.append('devoirId', id); // Append devoirId to FormData
      selectedFiles.forEach((file) => {
        formData.append('devfile', file); // Append files as devfile
      });

      const response = await axios.post('http://localhost:8080/api/reponses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data); // Handle response as needed

      // Update uploaded files state with file names
      const uploadedFileNames = selectedFiles.map(file => file.name);
      setUploadedFiles([...uploadedFiles, ...uploadedFileNames]);

      // Set upload success state and show Snackbar
      setUploadSuccess(true);
      setSnackbarOpen(true);

      // Optionally, clear form fields or show success message
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error submitting assignment:', error);
      // Handle error state or show error message
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px', marginLeft: '280px' }}>
        <Grid container spacing={3}>
          {/* Left side: Assignment details */}
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {devoir.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {`${devoir.startDate} - ${devoir.endDate}`}
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  {devoir.description}
                </Typography>
                {devoir.files.length > 0 && (
                  <List dense disablePadding style={{ marginTop: '10px' }}>
                    <Typography variant="body2" component="div">
                      Files:
                    </Typography>
                    {devoir.files.map((file, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon>
                          <span role="img" aria-label="file" style={{ marginRight: '5px' }}>📄</span>
                        </ListItemIcon>
                        <ListItemText primary={file} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
              <Divider />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Assigned by: John Doe
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right side: Submission form */}
          <Grid item xs={4}>
            <Card style={{ width: "400px", marginLeft: "55px", height: "400px" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Submit Assignment
                </Typography>
                <form onSubmit={handleSubmit}>
                  <input type="file" id="file-upload" name="file-upload" multiple onChange={handleFileChange} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", marginLeft: "260px" }}
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
              <Card style={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <List dense disablePadding>
                    {uploadedFiles.map((fileName, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon>
                          <span role="img" aria-label="file" style={{ marginRight: '5px' }}>📄</span>
                        </ListItemIcon>
                        <ListItemText primary={fileName} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar to show upload success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Assignment submitted successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </>
  );
};

export default DevoirDetails;
