import React, { useEffect, useState } from 'react';
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
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';

// Define a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [updateEmployee, setUpdateEmployee] = useState(null); // Employee to update
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/emp');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();

      // Combine all employee types into a single array
      const combinedEmployees = [
        ...data.chefDepartements.map(emp => ({ ...emp, role: 'Chef Departement' })),
        ...data.admins.map(emp => ({ ...emp, role: 'Admin' })),
        ...data.chefFilieres.map(emp => ({ ...emp, role: 'Chef Filiere' })),
        ...data.orientations.map(emp => ({ ...emp, role: 'Orientation' })),
        ...data.profs.map(emp => ({ ...emp, role: 'Prof' }))
      ];

      // Sort employees by role
      combinedEmployees.sort((a, b) => a.role.localeCompare(b.role));

      setEmployees(combinedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenUpdateDialog = (employee) => {
    setUpdateEmployee(employee);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setUpdateEmployee(null);
  };

  const handleUpdateEmployee = async () => {
    try {
      let endpoint = '';
      switch (updateEmployee.role) {
        case 'Chef Departement':
          endpoint = `http://localhost:8080/api/chefdepartements/${updateEmployee.id}`;
          break;
        case 'Admin':
          endpoint = `http://localhost:8080/api/admins/${updateEmployee.id}`;
          break;
        case 'Chef Filiere':
          endpoint = `http://localhost:8080/api/chefFilieres/${updateEmployee.id}`;
          break;
        case 'Orientation':
          endpoint = `http://localhost:8080/api/orientations/${updateEmployee.id}`;
          break;
        case 'Prof':
          endpoint = `http://localhost:8080/api/profs/${updateEmployee.id}`;
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await fetch(endpoint, {
        method: 'POST', // Assuming you use PUT method for update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      setUpdateSuccess(true);
      fetchEmployees(); // Refresh the employee list after update
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setOpenUpdateDialog(false);
      setUpdateEmployee(null);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUpdateSuccess(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navig />
      <AdminDrawer />
      <Box sx={{ p: 3, marginLeft: "260px", width: "1080px" }}>
        <Typography variant="h4" gutterBottom component="div" style={{ color: 'white' }}>
          Liste de Personnel
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="Employees">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>CIN</TableCell>
                <TableCell>Matricule</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.nom}</TableCell>
                  <TableCell>{employee.prenom}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.cin}</TableCell>
                  <TableCell>{employee.matricule}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenUpdateDialog(employee)} variant="outlined">Mise à jour</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* Update Employee Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nom"
            label="Nom"
            type="text"
            fullWidth
            value={updateEmployee ? updateEmployee.nom : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, nom: e.target.value })}
          />
          <TextField
            margin="dense"
            id="prenom"
            label="Prénom"
            type="text"
            fullWidth
            value={updateEmployee ? updateEmployee.prenom : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, prenom: e.target.value })}
          />
          <TextField
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            value={updateEmployee ? updateEmployee.role : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, role: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cin"
            label="CIN"
            type="text"
            fullWidth
            value={updateEmployee ? updateEmployee.cin : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, cin: e.target.value })}
          />
          <TextField
            margin="dense"
            id="matricule"
            label="Matricule"
            type="text"
            fullWidth
            value={updateEmployee ? updateEmployee.matricule : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, matricule: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={updateEmployee ? updateEmployee.email : ''}
            onChange={(e) => setUpdateEmployee({ ...updateEmployee, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button onClick={handleUpdateEmployee}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for update success */}
      <Snackbar open={updateSuccess} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Update successful!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Employees;
