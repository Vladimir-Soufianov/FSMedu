import React, { useEffect, useState } from 'react';
import { Grid, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import Navig from '../../../incs/Navig';
import AdminDrawer from '../../Drawers/AdminDrawer';

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocumentsData = async () => {
      try {
        const documentsResponse = await fetch('http://localhost:8080/api/documents');
        if (!documentsResponse.ok) {
          throw new Error(`Failed to fetch documents data. Status: ${documentsResponse.status}`);
        }
        const documentsData = await documentsResponse.json();

        const promises = documentsData.map(async (document) => {
          try {
            const studentResponse = await fetch(`http://localhost:8080/api/students/${document.studentId}`);
            if (!studentResponse.ok) {
              throw new Error(`Failed to fetch student data for studentId: ${document.studentId}. Status: ${studentResponse.status}`);
            }
            const studentData = await studentResponse.json();

            // Assuming studentData contains nom and prenom properties
            return {
              id: document.id,
              nom: studentData.nom,
              prenom: studentData.prenom,
              typeDocument: document.documentType,
            };
          } catch (error) {
            console.error(`Error fetching student data for studentId ${document.studentId}:`, error);
            throw error;
          }
        });

        const fetchedDocuments = await Promise.all(promises);
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error('Error fetching documents data:', error);
      }
    };

    fetchDocumentsData();
  }, []);

  return (
    <>
      <Navig />
      <AdminDrawer />
      <Grid container spacing={3} style={{ padding: '20px', marginLeft: '260px', boxSizing: 'border-box', width: '1100px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Documents
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Type de document</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>{document.nom}</TableCell>
                    <TableCell>{document.prenom}</TableCell>
                    <TableCell>{document.typeDocument}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Documents;
