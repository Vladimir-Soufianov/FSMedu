import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Visibility, Edit, Delete, DeleteForever, Add } from '@mui/icons-material';

// Define a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Librairie = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [addBookDialogOpen, setAddBookDialogOpen] = useState(false);
  const [editBookDialogOpen, setEditBookDialogOpen] = useState(false); // New state for edit dialog
  const [newBook, setNewBook] = useState({
    titre: '',
    auteur: '',
    description: '',
    category: '',
    disponibilite: 'non',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (bookId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const bookDetails = await response.json();
      setSelectedBook(bookDetails);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (bookId) => {
    try {
      setLoading(true);
      // Fetch the book details first
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const bookDetails = await response.json();
      // Set the initial values for editing
      setNewBook({
        titre: bookDetails.titre,
        auteur: bookDetails.auteur,
        description: bookDetails.description,
        category: bookDetails.category,
        disponibilite: bookDetails.dispo ? 'oui' : 'non',
      });
      setSelectedBook(bookDetails);
      setEditBookDialogOpen(true); // Open the edit dialog
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      // Validate input fields (e.g., check for empty fields)
      if (!newBook.titre || !newBook.auteur || !newBook.description || !newBook.category) {
        throw new Error('All fields are required');
      }

      // Set 'dispo' based on 'disponibilite' value
      const dispoValue = newBook.disponibilite === 'oui';

      // Construct the updated book object to send to the server
      const updatedBook = {
        ...selectedBook, // Include existing book details
        titre: newBook.titre,
        auteur: newBook.auteur,
        description: newBook.description,
        category: newBook.category,
        dispo: dispoValue,
      };

   
      const response = await axios.post(`http://localhost:8080/api/books/${selectedBook.id}`, updatedBook);
      if (!response.data) {
        throw new Error('Failed to update book');
      }

      // Refresh the book list after updating
      fetchBooks();
      setSnackbarMessage('Book updated successfully');
      setSnackbarOpen(true);
      // Close the edit book dialog
      setEditBookDialogOpen(false);
    } catch (error) {
      console.error('Error updating book:', error);
      setSnackbarMessage('Failed to update book');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDeleteConfirmation = (bookId) => {
    setDeleteBookId(bookId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleAddBook = async () => {
    try {
      setLoading(true);
      // Validate input fields (e.g., check for empty fields)
      if (!newBook.titre || !newBook.auteur || !newBook.description || !newBook.category) {
        throw new Error('All fields are required');
      }

      // Set 'dispo' based on 'disponibilite' value
      const dispoValue = newBook.disponibilite === 'oui';

      // Construct the new book object to send to the server
      const newBookData = {
        titre: newBook.titre,
        auteur: newBook.auteur,
        description: newBook.description,
        category: newBook.category,
        dispo: dispoValue,
      };

      // Send POST request to add the new book
      const response = await axios.post('http://localhost:8080/api/books', newBookData);
      if (!response.data) {
        throw new Error('Failed to add new book');
      }

      // Refresh the book list after adding
      fetchBooks();
      setSnackbarMessage('Livre bien ajouté !');
      setSnackbarOpen(true);
      // Close the add book dialog
      setAddBookDialogOpen(false);
    } catch (error) {
      console.error('Error adding book:', error);
      setSnackbarMessage('Erreur');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Send DELETE request to remove the book
      const response = await axios.delete(`http://localhost:8080/api/books/${deleteBookId}`);
      if (!response.data) {
        throw new Error('Failed to delete book');
      }

      // Refresh the book list after deleting
      fetchBooks();
      setSnackbarMessage('Livre bien supprimé');
      setSnackbarOpen(true);
      // Close the delete confirmation dialog
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting book:', error);
      setSnackbarMessage('Failed to delete book');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navig />
      <AdminDrawer />
      <Box sx={{ p: 3, marginLeft: '260px', width: '1080px' }}>
        <Typography variant="h4" gutterBottom component="div" style={{ color: 'white' }}>
          Liste des Livres de Bibliothèque
        </Typography>
        <Button
          variant="contained"
          color="primary"
    
          startIcon={<Add />}
          onClick={() => setAddBookDialogOpen(true)}
          style={{ marginBottom: '1rem' , marginLeft:"830px", marginTop:"-60px"}}
        >
          Ajouter un Livre
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="Books">
              <TableHead>
                <TableRow>
                  <TableCell>Titre</TableCell>
                  <TableCell>Auteur</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Disponibilité</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.titre}</TableCell>
                    <TableCell>{book.auteur}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.dispo ? 'oui' : 'non'}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewDetails(book.id)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(book.id)} // Call handleEdit function
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpenDeleteConfirmation(book.id)}
                        color="secondary"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Add Book Dialog */}
      <Dialog open={addBookDialogOpen} onClose={() => setAddBookDialogOpen(false)}>
        <DialogTitle>Ajouter un Livre</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="add-titre"
            name="titre"
            label="Titre"
            fullWidth
            value={newBook.titre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="add-auteur"
            name="auteur"
            label="Auteur"
            fullWidth
            value={newBook.auteur}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="add-description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newBook.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="add-category"
            name="category"
            label="Category"
            fullWidth
            value={newBook.category}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="add-disponibilite-label">Disponibilité</InputLabel>
            <Select
              labelId="add-disponibilite-label"
              id="add-disponibilite"
              name="disponibilite"
              value={newBook.disponibilite}
              onChange={handleInputChange}
            >
              <MenuItem value="oui">oui</MenuItem>
              <MenuItem value="non">non</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddBookDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddBook} color="primary"> {/* Call handleAddBook function */}
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={editBookDialogOpen} onClose={() => setEditBookDialogOpen(false)}>
        <DialogTitle>Modifier le Livre</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edit-titre"
            name="titre"
            label="Titre"
            fullWidth
            value={newBook.titre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="edit-auteur"
            name="auteur"
            label="Auteur"
            fullWidth
            value={newBook.auteur}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="edit-description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newBook.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="edit-category"
            name="category"
            label="Category"
            fullWidth
            value={newBook.category}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="edit-disponibilite-label">Disponibilité</InputLabel>
            <Select
              labelId="edit-disponibilite-label"
              id="edit-disponibilite"
              name="disponibilite"
              value={newBook.disponibilite}
              onChange={handleInputChange}
            >
              <MenuItem value="oui">oui</MenuItem>
              <MenuItem value="non">non</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBookDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Détails du Livre</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <div>
              <Typography variant="subtitle1">Titre: {selectedBook.titre}</Typography>
              <Typography variant="subtitle1">Auteur: {selectedBook.auteur}</Typography>
              <Typography variant="subtitle1">Description: {selectedBook.description}</Typography>
              <Typography variant="subtitle1">Category: {selectedBook.category}</Typography>
              <Typography variant="subtitle1">
                Disponibilité: {selectedBook.dispo ? 'oui' : 'non'}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Êtes-vous sûr de vouloir supprimer ce livre?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary" startIcon={<DeleteForever />}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Actions */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default Librairie;
