import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Snackbar, DialogContentText, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ChefDepDrawer';
import { Link, useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DevoirsChefDept = () => {
  const [devoirs, setDevoirs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDevoir, setNewDevoir] = useState({
    title: '',
    description: '',
    moduleId: '', // Initially set to null
    devfile: null, // Store uploaded file
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDevoirId, setCurrentDevoirId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [devoirToDelete, setDevoirToDelete] = useState(null);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevoirs();
    fetchModules(); // Fetch modules when component mounts
  }, []);

  const fetchDevoirs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/devoirs');
      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }
      const data = await response.json();

      const devoirsDetails = await Promise.all(
        data.map(async (devoir) => {
          try {
            const chefDeptId = localStorage.getItem('chefd');
            const chefDeptResponse = await fetch(`http://localhost:8080/api/chefdepartements/${chefDeptId}`);
            if (!chefDeptResponse.ok) {
              throw new Error(`Failed to fetch chief department for assignment ${devoir.id}`);
            }
            const chefDeptData = await chefDeptResponse.json();

            const moduleResponse = await fetch(`http://localhost:8080/api/mods/${devoir.moduleId}`);
            if (!moduleResponse.ok) {
              throw new Error(`Failed to fetch module for assignment ${devoir.id}`);
            }
            const moduleData = await moduleResponse.json();

            return {
              ...devoir,
              chefDeptName: chefDeptData.nom,
              moduleName: moduleData.nom,
            };
          } catch (error) {
            console.error('Error fetching details for assignment:', error);
            return devoir;
          }
        })
      );

      setDevoirs(devoirsDetails);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/mods');
      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }
      const data = await response.json();
      setModules(data); // Set modules state with fetched data
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDevoir((prevDevoir) => ({
      ...prevDevoir,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewDevoir((prevDevoir) => ({
      ...prevDevoir,
      devfile: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', newDevoir.title);
      formData.append('description', newDevoir.description);
      formData.append('moduleId', newDevoir.moduleId);
      formData.append('chefDeptId', localStorage.getItem('chefd'));
      if (newDevoir.devfile) {
        formData.append('devfile', newDevoir.devfile);
      }

      const requestOptions = {
        method: editMode ? 'POST' : 'POST',
        body: formData,
      };

      const url = editMode ? `http://localhost:8080/api/devoirs/${currentDevoirId}` : 'http://localhost:8080/api/devoirs';
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${editMode ? 'Update' : 'Add'} assignment failed: ${errorText}`);
      }

      const data = await response.json();
      if (editMode) {
        setDevoirs(devoirs.map((devoir) => (devoir.id === currentDevoirId ? data : devoir)));
      } else {
        const chefDeptResponse = await fetch(`http://localhost:8080/api/chefdepartements/${data.chefDeptId}`);
        if (!chefDeptResponse.ok) {
          throw new Error(`Failed to fetch chief department for assignment ${data.id}`);
        }
        const chefDeptData = await chefDeptResponse.json();
        const moduleResponse = await fetch(`http://localhost:8080/api/mods/${data.moduleId}`);
        if (!moduleResponse.ok) {
          throw new Error(`Failed to fetch module for assignment ${data.id}`);
        }
        const moduleData = await moduleResponse.json();

        const assignmentWithDetails = {
          ...data,
          chefDeptName: chefDeptData.nom,
          moduleName: moduleData.nom,
        };

        setDevoirs([...devoirs, assignmentWithDetails]);
      }

      setNewDevoir({
        title: '',
        description: '',
        moduleId: null,
        devfile: null,
      });

      setOpenDialog(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} assignment:`, error.message);
    }
  };

  const handleClickOpenDialog = (devoir = null) => {
    if (devoir) {
      setNewDevoir({
        title: devoir.title,
        description: devoir.description,
        moduleId: devoir.moduleId,
        devfile: null,
      });
      setEditMode(true);
      setCurrentDevoirId(devoir.id);
    } else {
      setNewDevoir({
        title: '',
        description: '',
        moduleId: null,
        devfile: null,
      });
      setEditMode(false);
      setCurrentDevoirId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDelete = async (id) => {
    try {
      const requestOptions = {
        method: 'DELETE',
      };

      const url = `http://localhost:8080/api/devoirs/${id}`;
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Delete assignment failed');
      }

      setDevoirs(devoirs.filter((devoir) => devoir.id !== id));
      setOpenSnackbar(true);
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const openDeleteConfirmationDialog = (devoir) => {
    setDevoirToDelete(devoir);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setDevoirToDelete(null);
  };

  return (
    <>
      <Navig />
      <ProfDrawer />
      <Grid container spacing={3} style={{ padding: '20px', marginLeft: '260px', boxSizing: 'border-box', width: '1100px' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
        Devoirs           </Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpenDialog()}>
            Créer un devoir
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '20px', width: '100%' }}>
          <Grid container spacing={3}>
            {devoirs.map((devoir) => (
              <Grid key={devoir.id} item xs={12} md={6} lg={4} style={{ marginBottom: '20px' }}>
                <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Link to={`/Chef-Departement/Dashboard/Devoirs/${devoir.id}`} style={{ textDecoration: 'none', color: 'inherit', padding: '20px' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {devoir.title}
                    </Typography>
                    <Typography variant="body1">
                      {devoir.description}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '8px' }}>
                      Chef Departement: {devoir.chefDeptName}
                    </Typography>
                    <Typography variant="body2">
                      Module: {devoir.moduleName}
                    </Typography>
                  </Link>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <IconButton onClick={() => handleClickOpenDialog(devoir)} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDeleteConfirmationDialog(devoir)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Assignment' : 'Add Assignment'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="titre"
              label="Title"
              type="text"
              fullWidth
              value={newDevoir.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={newDevoir.description}
              onChange={handleChange}
              required
            />
            <TextField
              select
              fullWidth
              margin="dense"
              id="moduleId"
              name="moduleId"
              label="Module"
              value={newDevoir.moduleId}
              onChange={handleChange}
              required
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.nom}
                </MenuItem>
              ))}
            </TextField>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginTop: '20px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {editMode ? 'Assignment updated successfully' : 'Assignment added successfully'}
        </Alert>
      </Snackbar>

      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sure de vouloir supprimer "{devoirToDelete ? devoirToDelete.title : ''}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmationDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={() => handleDelete(devoirToDelete.id)} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DevoirsChefDept;
