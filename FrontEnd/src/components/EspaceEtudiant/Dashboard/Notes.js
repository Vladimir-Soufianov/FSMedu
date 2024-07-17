import React, { useState, useEffect } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState({ nom: '', prenom: '' });

 // Adjusted useEffect block for fetching notes with semestreId handling
useEffect(() => {
  const fetchNotes = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        throw new Error('Student ID not found in local storage');
      }

      const notesResponse = await axios.get(`http://localhost:8080/api/notes/student/${studentId}`);
      if (notesResponse.status === 200) {
        const fetchedNotes = notesResponse.data;

        const notesWithDetails = await Promise.all(
          fetchedNotes.map(async (note) => {
            try {
              const moduleResponse = await axios.get(`http://localhost:8080/api/mods/${note.modId}`);
              const moduleData = moduleResponse.data;
              console.log('Module data:', moduleData); // Check moduleData

              const semestreId = moduleData.semestreId;
              const semesterResponse = await axios.get(`http://localhost:8080/api/semestres/${semestreId}`);
              const semesterData = semesterResponse.data;
              console.log('Semester data:', semesterData); // Check semesterData

              return {
                moduleName: moduleData.nom,
                note: note.note,
                semesterName: semesterData.nom,
              };
            } catch (error) {
              console.error('Error fetching module or semester data:', error);
              return null; // Handle error case as needed
            }
          })
        );

        setNotes(notesWithDetails.filter(Boolean)); // Filter out null entries
        setLoading(false);
      } else {
        throw new Error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchNotes();
}, []);


  // Placeholder function for handling verification button click
  const handleVerification = (note) => {
    console.log('Verifying note:', note);
    // Implement verification logic here
  };

  // Custom styles for TableCell
  const cellStyle = {
    width: '200px',
    height: '100px',
    border: '1px solid #000',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '8px',
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
        Notes des Modules
      </Typography>

      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1050px', marginTop: '50px' }}>
        {loading ? (
          <Typography variant="h6" component="div" style={{ textAlign: 'center', margin: '20px 0' }}>
            Loading...
          </Typography>
        ) : (
          <Table aria-label="notes table">
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>Module</TableCell>
                <TableCell style={cellStyle}>Note</TableCell>
                <TableCell style={cellStyle}>Semestre</TableCell>
                <TableCell style={cellStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={index}>
                  <TableCell style={cellStyle}>{note.moduleName || '-'}</TableCell>
                  <TableCell style={cellStyle}>{note.note}</TableCell>
                  <TableCell style={cellStyle}>{note.semesterName || '-'}</TableCell>
                  <TableCell style={cellStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleVerification(note)}
                    >
                      Vérification
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
};

export default Notes;
