import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Navig from '../../../incs/Navig';
import AdminDrawer from '../../Drawers/AdminDrawer';

const Inscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inscriptions');
      setInscriptions(response.data.filter(inscription => inscription.id !== 2));
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const openImageDialog = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
  };

  const updateStatus = async (inscriptionId, newStatus) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/inscriptions/${inscriptionId}/update-status`, {
        status: newStatus,
      });
      if (response.status === 200) {
        // Update local state after successful update
        const updatedInscriptions = inscriptions.map(inscription =>
          inscription.id === inscriptionId ? { ...inscription, status: newStatus } : inscription
        );
        setInscriptions(updatedInscriptions);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <Navig />
      <AdminDrawer />
     
      <TableContainer component={Paper} style={{ marginLeft: "260px", marginRight: "20px", marginTop: "20px", width: "calc(100vw - 280px)" }}>
        <Table aria-label="Liste des inscriptions" style={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CNE</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Région</TableCell>
              <TableCell>Année Bac</TableCell>
              <TableCell>Filière</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inscriptions.map((inscription) => (
              <TableRow key={inscription.id}>
                <TableCell>{inscription.nom}</TableCell>
                <TableCell>{inscription.prenom}</TableCell>
                <TableCell>{inscription.email}</TableCell>
                <TableCell>{inscription.cne}</TableCell>
                <TableCell>{inscription.telephone}</TableCell>
                <TableCell>{inscription.cin}</TableCell>
                <TableCell>{inscription.region}</TableCell>
                <TableCell>{inscription.annebac}</TableCell>
                <TableCell>{inscription.filiere}</TableCell>
                <TableCell>{inscription.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => openImageDialog(inscription.cinUrl)} size="small" style={{marginLeft: '10px', marginTop: "10px" }}>
                    Voir CIN
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => openImageDialog(inscription.imgUrl)} size="small" style={{ marginLeft: '10px', marginTop: "10px" }}>
                    Voir Image
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => openImageDialog(inscription.bacUrl)} size="small" style={{ marginLeft: '10px', marginTop: "10px" }}>
                    Voir Bac
                  </Button>
                </TableCell>
                <TableCell>
                  {inscription.status === 'PENDING' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateStatus(inscription.id, 'ACCEPTED')}
                        size="small"
                        style={{ marginLeft: '10px', marginTop: '10px' }}
                      >
                        Accepter
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => updateStatus(inscription.id, 'REJECTED')}
                        size="small"
                        style={{ marginLeft: '10px', marginTop: '10px' }}
                      >
                        Rejeter
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for displaying full-size image */}
      <Dialog open={!!selectedImage} onClose={closeImageDialog}>
        <DialogTitle>Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src={selectedImage} alt="Full Size" style={{ maxWidth: '100%', height: 'auto' }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImageDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inscriptions;
