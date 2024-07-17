import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navig from '../../../incs/Navig';
import AdminDrawer from '../../Drawers/AdminDrawer';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mods');
        console.log(response.data); // Log the data to check the structure

        // Fetch additional data for each module
        const modulesWithData = await Promise.all(
          response.data.map(async (module) => {
            // Fetch semestre details if semestreId is not null
            let semestre = null;
            if (module.semestreId) {
              const semestreResponse = await axios.get(`http://localhost:8080/api/semestres/${module.semestreId}`);
              semestre = semestreResponse.data;
            }

            // Fetch professor details if profId is not null
            let prof = null;
            if (module.profId) {
              const profResponse = await axios.get(`http://localhost:8080/api/profs/${module.profId}`);
              prof = profResponse.data;
            }

            // Fetch chef département details if chefdepId is not null
            let chefdep = null;
            if (module.chefdepId) {
              const chefdepResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${module.chefdepId}`);
              chefdep = chefdepResponse.data;
            }

            // Fetch chef filière details if cheffilId is not null
            let cheffil = null;
            if (module.cheffilId) {
              const cheffilResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${module.cheffilId}`);
              cheffil = cheffilResponse.data;
            }

            // Fetch filieres details if filiereId is not null
            let filiere = null;
            if (module.filiereId) {
              const filiereResponse = await axios.get(`http://localhost:8080/api/filieres/${module.filiereId}`);
              filiere = filiereResponse.data.nom;
            }

            // Return module with additional data
            return {
              ...module,
              semestre,
              prof,
              chefdep,
              cheffil,
              filiere,
            };
          })
        );

        setModules(modulesWithData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Navig />
      <AdminDrawer />
      <Typography variant="h4" gutterBottom component="div" style={{ marginLeft:"280px" }}>
         Liste des modules
        </Typography>
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '20px' }}>
        <Table aria-label="modules table">
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Filière</TableCell>
              {/* Add more headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              modules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.nom}</TableCell>
                  <TableCell>{module.semestre ? module.semestre.nom : 'N/A'}</TableCell>
                  <TableCell>
                    {module.prof ? `${module.prof.nom} ${module.prof.prenom}` : ''}
                    {module.chefdep ? `${module.chefdep.nom} ${module.chefdep.prenom}` : ''}
                    {module.cheffil ? `${module.cheffil.nom} ${module.cheffil.prenom}` : ''}
                  </TableCell>
                  <TableCell>{module.filiere}</TableCell>
                  {/* Add more cells based on module properties */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default Modules;
