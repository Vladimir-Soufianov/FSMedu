import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import ChefDepDrawer from '../../Drawers/ChefDepDrawer';
import { Card, CardContent, Typography, CircularProgress, Container, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

const Departement = () => {
  const [chefDepartment, setChefDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chefDepartId = localStorage.getItem('chefd');
        console.log('Fetching Chef Department details...');
        const chefDepartResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${chefDepartId}`);
        
        if (chefDepartResponse.status !== 200) {
          throw new Error('Failed to fetch ChefDepartment details');
        }
        
        console.log('Chef Department details fetched:', chefDepartResponse.data);
        setChefDepartment(chefDepartResponse.data);
  
        const depId = chefDepartResponse.data.departmentId;
        console.log(`Fetching departments for department ID: ${depId}`);
  
        const departmentsResponse = await axios.get(`http://localhost:8080/api/departements/${depId}`);
        
        if (departmentsResponse.status !== 200) {
          throw new Error('Failed to fetch departments');
        }
        
        console.log('Departments fetched:', departmentsResponse.data);
        
        const departmentsData = Array.isArray(departmentsResponse.data) ? departmentsResponse.data : [departmentsResponse.data];
        
        setDepartments(departmentsData);
  
        console.log('Fetching filieres for each department...');
        
        const fetchFilieresPromises = departmentsData.map(async (department) => {
          const filieresResponse = await axios.get(`http://localhost:8080/api/departements/${department.id}/filieres`);
          
          if (filieresResponse.status !== 200) {
            throw new Error(`Failed to fetch filieres for department ID: ${department.id}`);
          }
          
          console.log(`Filieres fetched for department ${department.id}:`, filieresResponse.data);
          return filieresResponse.data;
        });
  
        const allFilieres = await Promise.all(fetchFilieresPromises);
        const flattenedFilieres = allFilieres.flat();
        console.log('All filieres fetched:', flattenedFilieres);
        setFilieres(flattenedFilieres);
  
        console.log('Fetching modules for each filiere...');
        
        const fetchModulesPromises = flattenedFilieres.map(async (filiere) => {
          const modulesResponse = await axios.get(`http://localhost:8080/api/filieres/${filiere.id}/modules`);
          
          if (modulesResponse.status !== 200) {
            throw new Error(`Failed to fetch modules for filiere ID: ${filiere.id}`);
          }
          
          console.log(`Modules fetched for filiere ${filiere.id}:`, modulesResponse.data);
          return modulesResponse.data;
        });
  
        const allModules = await Promise.all(fetchModulesPromises);
        const flattenedModules = allModules.flat();
        
        // Fetch semestre and associated details for each module
        const updatedModules = await Promise.all(flattenedModules.map(async (mod) => {
          try {
            const semestreResponse = await axios.get(`http://localhost:8080/api/semestres/${mod.semestreId}`);
            if (semestreResponse.status !== 200) {
              throw new Error(`Failed to fetch semestre details for ID: ${mod.semestreId}`);
            }
            console.log(`Semestre fetched for module ${mod.id}:`, semestreResponse.data);
  
            let associatedName = 'N/A';
            if (mod.profId) {
              const profResponse = await axios.get(`http://localhost:8080/api/profs/${mod.profId}`);
              if (profResponse.status === 200) {
                associatedName = `${profResponse.data.nom} ${profResponse.data.prenom}`;
              } else {
                throw new Error(`Failed to fetch prof details for ID: ${mod.profId}`);
              }
            } else if (mod.chefdepId) {
              const chefDepResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${mod.chefdepId}`);
              if (chefDepResponse.status === 200) {
                associatedName = `${chefDepResponse.data.nom} ${chefDepResponse.data.prenom}`;
              } else {
                throw new Error(`Failed to fetch Chef Department details for ID: ${mod.chefdepId}`);
              }
            } else if (mod.cheffilId) {
              const chefFiliereResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${mod.cheffilId}`);
              if (chefFiliereResponse.status === 200) {
                associatedName = `${chefFiliereResponse.data.nom} ${chefFiliereResponse.data.prenom}`;
              } else {
                throw new Error(`Failed to fetch Chef Filiere details for ID: ${mod.cheffilId}`);
              }
            }
  
            return { ...mod, semestre: semestreResponse.data.nom, associatedName };
          } catch (error) {
            console.error(`Error fetching details for module ${mod.id}:`, error.message);
            return { ...mod, semestre: 'N/A', associatedName: 'N/A' }; // Handle error case
          }
        }));

        console.log('All modules fetched and updated:', updatedModules);
        setModules(updatedModules);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navig />
        <ChefDepDrawer />
        <LoadingScreen />
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navig />
      <ChefDepDrawer />
      <Container style={{ marginLeft: '260px', marginTop: '20px', width: '1080px' }}>
        {chefDepartment && (
          <Card variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary">Chef Department Details</Typography>
              <Typography variant="body2"><strong>Nom:</strong> {chefDepartment.nom} {chefDepartment.prenom}</Typography>
              {/* Add more details as needed */}
            </CardContent>
          </Card>
        )}

        {departments.map(department => (
          <Card key={department.id} variant="outlined" style={{ marginBottom: '20px', backgroundColor: '#e0f7fa' }}>
            <CardContent>
              <Typography variant="h4" component="h2" color="green">Departement: {department.nom}</Typography>
              <Divider style={{ margin: '10px 0' }} />
              <List style={{ backgroundColor: '#ffffff' }}>
                {filieres
                  .filter(filiere => filiere.departmentId === department.id)
                  .map(filiere => (
                    <React.Fragment key={filiere.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={<Typography variant="h6">Filiere: {filiere.nom}</Typography>}
                          secondary={
                            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Module</TableCell>
                                    <TableCell>Semestre</TableCell>
                                    <TableCell>Enseignant</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {modules
                                    .filter(mod => mod.filiereId === filiere.id)
                                    .map(mod => (
                                      <TableRow key={mod.id}>
                                        <TableCell>{mod.nom}</TableCell>
                                        <TableCell>{mod.semestre}</TableCell>
                                        <TableCell>{mod.associatedName}</TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Departement;
