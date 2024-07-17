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
} from '@mui/material';
import Navig from '../../../components/incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';

const FsmLearningDetails = () => {
  const { id } = useParams();
  const [moduleName, setModuleName] = useState('');
  const [lessons, setLessons] = useState([]);

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

  function getFileNameFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Container maxWidth="lg" style={{ marginTop: '20px', marginLeft: '260px', width: '1080px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
          {moduleName}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                                  Files:
                                </Typography>
                                <ListItem key={lesson.fileUrl} disableGutters>
                                  <ListItemText primary={getFileNameFromUrl(lesson.fileUrl)} />
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleViewFile(lesson.fileUrl)}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    View File
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
        </Grid>
      </Container>
    </>
  );
};

export default FsmLearningDetails;
