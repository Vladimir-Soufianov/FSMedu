import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Snackbar, DialogContentText, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ProfDrawer';
import { Link, useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Devoirs = () => {
  const [devoirs, setDevoirs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDevoir, setNewDevoir] = useState({
    title: '',
    description: '',
    moduleId: '', // Initially set to empty string
    devfile: null, // Store uploaded file
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDevoirId, setCurrentDevoirId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [devoirToDelete, setDevoirToDelete] = useState(null);
  const [modules, setModules] = useState([]);
  const [profs, setProfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevoirs();
    fetchModules(); // Fetch modules when component mounts
    fetchProfs(); // Fetch professors when component mounts
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
            // Fetch module details
            const moduleResponse = await fetch(`http://localhost:8080/api/mods/${devoir.moduleId}`);
            if (!moduleResponse.ok) {
              throw new Error(`Failed to fetch module with ID ${devoir.moduleId}`);
            }
            const moduleData = await moduleResponse.json();
  
            // Fetch professor details
            const profResponse = await fetch(`http://localhost:8080/api/profs/${devoir.profId}`);
            if (!profResponse.ok) {
              throw new Error(`Failed to fetch professor with ID ${devoir.profId}`);
            }
            const profData = await profResponse.json();
  
            return {
              ...devoir,
              profName: `${profData.nom} ${profData.prenom}`,
              moduleName: moduleData.nom,
            };
          } catch (error) {
            console.error('Error fetching details for assignment:', error);
            return devoir;
          }
        })
      );
  
      const profId = localStorage.getItem('profId');
      const filteredDevoirs = devoirsDetails.filter(devoir => devoir.profId === profId);
  
      setDevoirs(filteredDevoirs);
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

  const fetchProfs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/profs');
      if (!response.ok) {
        throw new Error('Failed to fetch professors');
      }
      const data = await response.json();
      setProfs(data); // Set professors state with fetched data
    } catch (error) {
      console.error('Error fetching professors:', error);
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
      formData.append('profId', localStorage.getItem('profId'));
      if (newDevoir.devfile) {
        formData.append('devfile', newDevoir.devfile);
      }

      const requestOptions = {
        method: editMode ? 'PUT' : 'POST',
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
        const prof = profs.find((prof) => prof.id === data.profId);
        const module = modules.find((module) => module.id === data.moduleId);

        const assignmentWithDetails = {
          ...data,
          profName: prof ? `${prof.nom} ${prof.prenom}` : 'Unknown Professor',
          moduleName: module ? module.nom : 'Unknown Module',
        };

        setDevoirs([...devoirs, assignmentWithDetails]);
      }

      setNewDevoir({
        title: '',
        description: '',
        moduleId: '',
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
        moduleId: '',
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
            Liste des devoirs
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpenDialog()}>
            Ajouter un devoir
          </Button>
        </Grid>
        {devoirs.length === 0 ? (
          <Typography variant="body1">Aucun devoir trouvé.</Typography>
        ) : (
          devoirs.map((devoir) => (
            <Grid item xs={12} sm={6} md={4} key={devoir.id}>
              <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {devoir.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {devoir.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Module: {devoir.moduleName || 'Unknown Module'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Professeur: {devoir.profName || 'Unknown Professor'}
                </Typography>
                {devoir.devfile && (
                  <Typography variant="body2" color="textSecondary">
                    <a href={`http://localhost:8080/api/devoirs/${devoir.id}/file`} target="_blank" rel="noopener noreferrer">
                      Télécharger le fichier
                    </a>
                  </Typography>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <IconButton onClick={() => handleClickOpenDialog(devoir)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmationDialog(devoir)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </div>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Modifier le devoir' : 'Ajouter un devoir'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Titre"
              type="text"
              fullWidth
              value={newDevoir.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={newDevoir.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="moduleId"
              label="Module"
              select
              fullWidth
              value={newDevoir.moduleId}
              onChange={handleChange}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.nom}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" component="label">
              Télécharger le fichier
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {editMode ? 'Devoir mis à jour avec succès!' : 'Devoir ajouté avec succès!'}
        </Alert>
      </Snackbar>

      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le devoir "{devoirToDelete?.title}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmationDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={() => handleDelete(devoirToDelete.id)} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Devoirs;
