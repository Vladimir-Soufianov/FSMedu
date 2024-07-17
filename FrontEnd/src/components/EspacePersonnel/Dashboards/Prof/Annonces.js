import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Snackbar, DialogContentText } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Navig from '../../../incs/Navig';
import ProfDrawer from '../../Drawers/ProfDrawer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Actualites = () => {
  const [annonces, setAnnonces] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAnnonce, setNewAnnonce] = useState({
    title: '',
    description: '',
    imageFile: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAnnonceId, setCurrentAnnonceId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/annonces');
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnonces(data);
    } catch (error) {
      console.error('Error fetching annonces:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      imageFile: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', newAnnonce.title);
      formData.append('description', newAnnonce.description);
      if (newAnnonce.imageFile) {
        formData.append('imageFile', newAnnonce.imageFile);
      }

      const requestOptions = {
        method: editMode ? 'POST' : 'POST',
        body: formData,
      };

      const url = editMode ? `http://localhost:8080/api/annonces/${currentAnnonceId}` : 'http://localhost:8080/api/annonces';
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${editMode ? 'Update' : 'Add'} announcement failed: ${errorText}`);
      }

      const data = await response.json();
      if (editMode) {
        setAnnonces(annonces.map((annonce) => (annonce.id === currentAnnonceId ? data : annonce)));
      } else {
        setAnnonces([...annonces, data]);
      }

      setNewAnnonce({
        title: '',
        description: '',
        imageFile: null,
      });

      setOpenDialog(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} annonce:`, error.message);
    }
  };

  const handleClickOpenDialog = (annonce = null) => {
    if (annonce) {
      setNewAnnonce({
        title: annonce.title,
        description: annonce.description,
        imageFile: null,
      });
      setEditMode(true);
      setCurrentAnnonceId(annonce.id);
    } else {
      setNewAnnonce({
        title: '',
        description: '',
        imageFile: null,
      });
      setEditMode(false);
      setCurrentAnnonceId(null);
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

      const url = `http://localhost:8080/api/annonces/${id}`;
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Delete announcement failed');
      }

      setAnnonces(annonces.filter((annonce) => annonce.id !== id));
      setOpenSnackbar(true);
      setDeleteConfirmationOpen(false); // Close confirmation dialog after deletion
    } catch (error) {
      console.error('Error deleting annonce:', error);
    }
  };

  const openDeleteConfirmationDialog = (annonce) => {
    setAnnouncementToDelete(annonce);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setAnnouncementToDelete(null);
  };

  return (
    <>
      <Navig />
      <ProfDrawer />
      <Grid container spacing={3} style={{ padding: '20px', marginLeft: '260px', boxSizing: 'border-box', width: '1100px' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Annonces
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpenDialog()}>
            Ajouter une annonce
          </Button>
        </Grid>

        {/* List of Announcements */}
        <Grid item xs={12} style={{ marginTop: '20px', width: '100%' }}>
          <Grid container spacing={3}>
            {annonces.map((annonce) => (
              <Grid key={annonce.id} item xs={12} md={6} lg={4} style={{ marginBottom: '20px' }}>
                <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <img
                    src={annonce.imageUrl} // Assuming 'annonce' is the object representing your fetched announcement
                    alt={annonce.title}
                    style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '20px' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {annonce.title} {/* Use `title` from your API response */}
                    </Typography>
                    <Typography variant="body1">
                      {annonce.description} {/* Use `description` from your API response */}
                    </Typography>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="primary" onClick={() => handleClickOpenDialog(annonce)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => openDeleteConfirmationDialog(annonce)}>
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
        <DialogTitle>{editMode ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              value={newAnnonce.title}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Description"
              name="description"
              value={newAnnonce.description}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={2}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginTop: '20px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editMode ? 'Update Announcement' : 'Add Announcement'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the announcement: {announcementToDelete && announcementToDelete.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(announcementToDelete.id)} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Announcement {editMode ? 'updated' : 'added'} successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Actualites;
