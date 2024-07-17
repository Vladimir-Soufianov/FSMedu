import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ProfDrawer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FsmLearningDetails = () => {
  const { id } = useParams();
  const [moduleName, setModuleName] = useState('');
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);
  const [showLessonFormAlert, setShowLessonFormAlert] = useState(false);
  const [showAnnouncementFormAlert, setShowAnnouncementFormAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        // Fetch module details
        const moduleResponse = await fetch(`http://localhost:8080/api/mods/${id}`);
        if (!moduleResponse.ok) {
          throw new Error(`Failed to fetch module ${id}`);
        }
        const moduleData = await moduleResponse.json();
        setModuleName(moduleData.nom);

        // Fetch lessons for the module
        const lessonsResponse = await fetch(`http://localhost:8080/api/lessons/module/${id}`);
        if (!lessonsResponse.ok) {
          throw new Error(`Failed to fetch lessons for module ${id}`);
        }
        const lessonsData = await lessonsResponse.json();
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [id]);

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank'); // Open fileUrl in a new tab
  };

  const handleSubmitLesson = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('lessonFile', file);
    formData.append('moduleId', localStorage.getItem('selectedModuleId'));

    try {
      const response = await fetch('http://localhost:8080/api/lessons', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit lesson');
      }

      const newLesson = await response.json();
      setLessons((prevLessons) => [...prevLessons, newLesson]);
      setTitle('');
      setDescription('');
      setType('');
      setFile(null);
      setOpenSnackbar(true); // Open success snackbar
      setShowLessonFormAlert(false); // Hide lesson form after submission
      console.log('Lesson submitted successfully');
    } catch (error) {
      console.error('Error submitting lesson:', error);
    }
  };

  const handleSubmitAnnouncement = async () => {
    const formData = new FormData();
    formData.append('subject', announcementTitle); // Use announcementTitle for subject
    formData.append('message', announcementDescription); // Use announcementDescription for message
    formData.append('moduleId', id); // Use current module id

    try {
      const response = await fetch(`http://localhost:8080/api/students/email/module/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit announcement');
      }

      setOpenSnackbar(true); // Open success snackbar
      setAnnouncementTitle(''); // Clear announcement title after submission
      setAnnouncementDescription(''); // Clear announcement description after submission
      console.log('Announcement submitted successfully');
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  function getFileNameFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  return (
    <>
      <Navig />
      <ProfDrawer />
      <Container maxWidth="lg" style={{ marginTop: '20px', marginLeft: '260px', width: '1080px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
          {moduleName}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowLessonFormAlert(true)}
          style={{ marginBottom: '10px', marginTop: '-70px', marginLeft: '500px' }}
        >
          Ajouter une lecon
        </Button>

        {showLessonFormAlert && (
          <Dialog open={showLessonFormAlert} onClose={() => setShowLessonFormAlert(false)}>
            <DialogTitle>Créer nouvelle lecon</DialogTitle>
            <DialogContent>
              <TextField
                label="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="cour">Cour</MenuItem>
                  <MenuItem value="td">TD</MenuItem>
                  <MenuItem value="tp">TP</MenuItem>
                  <MenuItem value="exams">Exams</MenuItem>
                </Select>
              </FormControl>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitLesson}
                fullWidth
              >
                Soumettre lecon
              </Button>
            </DialogContent>
          </Dialog>
        )}

  

        {showAnnouncementFormAlert && (
          <Dialog open={showAnnouncementFormAlert} onClose={() => setShowAnnouncementFormAlert(false)}>
            <DialogTitle>Soumettre une annonce</DialogTitle>
            <DialogContent>
              <TextField
                label="Titre"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Message"
                value={announcementDescription}
                onChange={(e) => setAnnouncementDescription(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAnnouncement}
                fullWidth
              >
                Envoyer l'annonce
              </Button>
            </DialogContent>
          </Dialog>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {type === 'annonce' ? 'Announcement' : 'Lesson'} Soumis avec succès !
          </Alert>
        </Snackbar>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            {/* Lessons Section */}
            {['cour', 'td', 'tp', 'exams'].map((category) => (
              <Card key={category} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.toUpperCase()}
                  </Typography>
                  {lessons.length > 0 &&
                    lessons
                      .filter((lesson) => lesson.type === category)
                      .map((lesson) => (
                        <Card key={lesson.id} style={{ marginBottom: '10px' }}>
                          <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                              {lesson.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                              {lesson.description}
                            </Typography>
                            {lesson.fileUrl && (
                              <List dense disablePadding style={{ marginTop: '10px' }}>
                                <Typography variant="body2" component="div">
                                  Fichiers:
                                </Typography>
                                <ListItem key={lesson.fileUrl} disableGutters>
                                  <ListItemText primary={getFileNameFromUrl(lesson.fileUrl)} />
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleViewFile(lesson.fileUrl)}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    Voir fichier
                                  </Button>
                                </ListItem>
                              </List>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" gutterBottom style={{ color: '#f57c00' }}>
              Annonces
            </Typography>
            <Card style={{ marginBottom: '20px', height: 'calc(100vh - 180px)', overflow: 'auto' }}>
              <CardContent>
                <TextField
                  label="Titre"
                  variant="outlined"
                  fullWidth
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={announcementDescription}
                  onChange={(e) => setAnnouncementDescription(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitAnnouncement}
                  fullWidth
                >
                 Envoyer annonce
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FsmLearningDetails;
