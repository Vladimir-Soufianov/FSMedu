import React, { useState, useEffect } from 'react';
import Navig from '../../../incs/Navig';
import AdminDrawer from '../../Drawers/AdminDrawer';
import {
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  createTheme,
  ThemeProvider,
  Typography,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Define a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Students = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({
    nom: '',
    prenom: '',
    cin: '',
    cne: '',
    ce: '',
    email: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setUpdatedStudent(student); // Initialize with current student data
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setUpdatedStudent({
      nom: '',
      prenom: '',
      cin: '',
      cne: '',
      ce: '',
      email: '',
    }); // Reset updatedStudent state
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${selectedStudent.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      // Update successful, show success message
      setSnackbarSeverity('success');
      setSnackbarMessage('Update successful!');
      setSnackbarOpen(true);
      handleCloseDialog();
      fetchStudents(); // Refresh the list of students
    } catch (error) {
      console.error('Error updating student:', error);
      // Show error message
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to update student');
      setSnackbarOpen(true);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navig />
      <AdminDrawer />
      <Box sx={{ p: 3, marginLeft: '260px', width: '1080px' }}>
        <Typography variant="h4" gutterBottom component="div" style={{ color: 'white' }}>
         Liste des étudiants
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="Students">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>CIN</TableCell>
                <TableCell>CNE</TableCell>
                <TableCell>CE</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.cin}</TableCell>
                  <TableCell>{student.cne}</TableCell>
                  <TableCell>{student.ce}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleUpdateClick(student)}>Mise à jour</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Update Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update fields for student: {selectedStudent && `${selectedStudent.nom} ${selectedStudent.prenom}`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="Nom"
              fullWidth
              name="nom"
              value={updatedStudent.nom}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              id="prenom"
              label="Prénom"
              fullWidth
              name="prenom"
              value={updatedStudent.prenom}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              id="cin"
              label="CIN"
              fullWidth
              name="cin"
              value={updatedStudent.cin}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              id="cne"
              label="CNE"
              fullWidth
              name="cne"
              value={updatedStudent.cne}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              id="ce"
              label="CE"
              fullWidth
              name="ce"
              value={updatedStudent.ce}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              fullWidth
              name="email"
              value={updatedStudent.email}
              onChange={handleFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Update</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

      </Box>
    </ThemeProvider>
  );
};

export default Students;
