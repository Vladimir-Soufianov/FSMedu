import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Button,
  TextField,
} from '@mui/material';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedNote, setUpdatedNote] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const chefId = localStorage.getItem('cheffId');

        if (!chefId) {
          throw new Error('Chef ID not found in local storage');
        }

        console.log(`Fetching notes for chef ID: ${chefId}`);

        // Fetch module IDs associated with the chef
        const chefDetailsResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${chefId}`);
        if (chefDetailsResponse.status !== 200) {
          throw new Error('Failed to fetch chef details');
        }
        const modIds = chefDetailsResponse.data.modIds;

        console.log(`Module IDs associated with chef:`, modIds);

        // Fetch notes for each module associated with the chef
        const notesPromises = modIds.map(async (moduleId) => {
          console.log(`Fetching notes for module ID: ${moduleId}`);
          const notesResponse = await axios.get(`http://localhost:8080/api/notes/mods/${moduleId}`);
          return notesResponse.data;
        });

        const notesData = await Promise.all(notesPromises);

        console.log(`Fetched notes data:`, notesData);

        // Process notes data to include student, module, and semester details
        const processedNotes = [];

        for (let notesArray of notesData) {
          for (let note of notesArray) {
            const studentResponse = await axios.get(`http://localhost:8080/api/students/${note.studentId}`);
            const student = studentResponse.data;

            console.log(`Fetched student data for student ID ${note.studentId}:`, student);

            const moduleResponse = await axios.get(`http://localhost:8080/api/mods/${note.modId}`);
            const module = moduleResponse.data;

            console.log(`Fetched module data for module ID ${note.modId}:`, module);

            // Ensure module.semestreId exists before fetching semester data
            if (!module.semestreId) {
              throw new Error(`Semestre ID not found for module ID ${note.modId}`);
            }

            const semesterResponse = await axios.get(`http://localhost:8080/api/semestres/${module.semestreId}`);
            const semester = semesterResponse.data;

            console.log(`Fetched semester data for semester ID ${module.semestreId}:`, semester);

            processedNotes.push({
              id: note.id,
              student: `${student.nom} ${student.prenom}`,
              module: module.nom,
              semester: semester.nom,
              note: note.note,
            });
          }
        }

        console.log(`Processed notes data:`, processedNotes);

        setNotes(processedNotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes data:', error);
        setError('Failed to fetch notes data');
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleUpdateNote = async (noteId) => {
    try {
      console.log(`Updating note with ID ${noteId} to: ${updatedNote}`);

      // Perform POST request to update the note
      const response = await axios.post(`http://localhost:8080/api/notes/${noteId}`, {
        note: updatedNote,
      });

      console.log('Updated note response:', response.data);

      // Update notes state with the updated note data
      const updatedNotes = notes.map(note => {
        if (note.id === noteId) {
          return {
            ...note,
            note: updatedNote,
          };
        }
        return note;
      });

      setNotes(updatedNotes);

      // Clear edit mode
      setEditNoteId(null);
      setUpdatedNote('');

    } catch (error) {
      console.error('Error updating note:', error);
      // Handle error appropriately
    }
  };

  const handleEditNote = (noteId, currentNote) => {
    // Set the note ID and current note content to edit mode
    setEditNoteId(noteId);
    setUpdatedNote(currentNote);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Navig />
      <ChefFilDrawer />
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '20px' }}>
        <Table aria-label="notes table">
          <TableHead>
            <TableRow>
              <TableCell>Etudiant</TableCell>
              <TableCell>Module </TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>{note.student}</TableCell>
                  <TableCell>{note.module}</TableCell>
                  <TableCell>{note.semester}</TableCell>
                  {editNoteId === note.id ? (
                    <TableCell>
                      <TextField
                        label="Update Note"
                        variant="outlined"
                        size="small"
                        value={updatedNote}
                        onChange={(e) => setUpdatedNote(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateNote(note.id)}
                        style={{ marginLeft: '8px' }}
                      >
                        Save
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>{note.note}</TableCell>
                  )}
                  <TableCell>
                    {editNoteId !== note.id && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditNote(note.id, note.note)}
                      >
                        Edit Note
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Notes;
