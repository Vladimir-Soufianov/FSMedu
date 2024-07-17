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
  createTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from '@mui/material';

const Seances = () => {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [modules, setModules] = useState([]);
  const [profs, setProfs] = useState([]);
  const [chefFilieres, setChefFilieres] = useState([]);
  const [chefDeparts, setChefDeparts] = useState([]);
  const [newSeance, setNewSeance] = useState({
    start: new Date(2024, 6, 20, 10, 0),
    finish: new Date(2024, 6, 20, 12, 0),
    profId: null,
    moduleId: null,
    local: '',
    cheffilid: null,
    chefdepid: null,
    role: 'chefdep',
    seanceType: null, // Initialize seanceType state
  });

  useEffect(() => {
    fetchSeances();
    fetchModules();
    fetchProfs();
    fetchChefFilieres();
    fetchChefDeparts();
  }, []);

  const fetchSeances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/seances');
      const seancesWithData = await Promise.all(
        response.data.map(async (seance) => {
          // Convert start and finish arrays to Date objects
          const start = new Date(...seance.start);
          const finish = new Date(...seance.finish);

          // Fetch additional data for each seance
          const moduleResponse = await axios.get(`http://localhost:8080/api/mods/${seance.moduleId}`);
          const module = moduleResponse.data;

          let prof = null;
          if (seance.profId) {
            const profResponse = await axios.get(`http://localhost:8080/api/profs/${seance.profId}`);
            prof = profResponse.data;
          }

          let chefdep = null;
          if (seance.chefdepid) {
            const chefdepResponse = await axios.get(`http://localhost:8080/api/chefdepartements/${seance.chefdepid}`);
            chefdep = chefdepResponse.data;
          }

          let cheffil = null;
          if (seance.cheffilid) {
            const cheffilResponse = await axios.get(`http://localhost:8080/api/chefFilieres/${seance.cheffilid}`);
            cheffil = cheffilResponse.data;
          }

          return {
            ...seance,
            module,
            prof,
            chefdep,
            cheffil,
            start,
            finish,
          };
        })
      );

      setSeances(seancesWithData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seances:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mods');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const fetchProfs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profs');
      setProfs(response.data);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const fetchChefFilieres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chefFilieres');
      setChefFilieres(response.data);
    } catch (error) {
      console.error('Error fetching chef filieres:', error);
    }
  };

  const fetchChefDeparts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chefdepartements');
      setChefDeparts(response.data);
    } catch (error) {
      console.error('Error fetching chef departements:', error);
    }
  };

  const handleAddSeance = async () => {
    try {
      // Perform API call to add the new seance using newSeance state
      await axios.post('http://localhost:8080/api/seances', newSeance);

      // Refresh seances list
      fetchSeances();
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding seance:', error);
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    // Reset newSeance state or perform any cleanup
    setNewSeance({
      start: new Date(2024, 6, 20, 10, 0),
      finish: new Date(2024, 6, 20, 12, 0),
      profId: null,
      moduleId: null,
      local: '',
      cheffilid: null,
      chefdepid: null,
      role: 'chefdep',
      seanceType: null,
    });
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <Navig />
      <AdminDrawer />
      <Button
        variant="contained"
        color="primary"
        style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000 }}
        onClick={() => setOpenAddDialog(true)}
      >
        Ajouter Seance
      </Button>
      <Typography variant="h4" gutterBottom component="div" style={{ marginLeft:"280px" }}>
         Liste des seances
        </Typography>
      <TableContainer component={Paper} style={{ marginLeft: '260px', width: '1080px', marginTop: '40px' }}>
        <Table aria-label="seances table">

          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Heure Debut</TableCell>
              <TableCell>Heure Fin</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Professeur</TableCell>
              <TableCell>Chef de Departement</TableCell>
              <TableCell>Chef de Filiere</TableCell>
              <TableCell>Type de Seance</TableCell> {/* New column for seance type */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center' }}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center' }}>Error fetching data</TableCell>
              </TableRow>
            ) : (
              seances.map((seance) => (
                <TableRow key={seance.id}>
                  <TableCell>{seance.start.toLocaleDateString()}</TableCell>
                  <TableCell>{seance.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{seance.finish.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{seance.local}</TableCell>
                  <TableCell>{seance.module ? seance.module.nom : 'N/A'}</TableCell>
                  <TableCell>
                    {seance.prof ? `${seance.prof.nom} ${seance.prof.prenom}` : ''}
                    {seance.chefdep ? `${seance.chefdep.nom} ${seance.chefdep.prenom}` : ''}
                    {seance.cheffil ? `${seance.cheffil.nom} ${seance.cheffil.prenom}` : ''}
                  </TableCell>
                  <TableCell>{seance.chefdep ? `${seance.chefdep.nom} ${seance.chefdep.prenom}` : 'N/A'}</TableCell>
                  <TableCell>{seance.cheffil ? `${seance.cheffil.nom} ${seance.cheffil.prenom}` : 'N/A'}</TableCell>
                  <TableCell>{seance.seanceType}</TableCell> {/* Display seance type */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding Seance */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Créer Seance</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="start"
            label="Start Date and Time"
            type="datetime-local"
            fullWidth
            value={newSeance.start.toISOString().substring(0, 16)}
            onChange={(e) => setNewSeance({ ...newSeance, start: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            id="finish"
            label="Finish Date and Time"
            type="datetime-local"
            fullWidth
            value={newSeance.finish.toISOString().substring(0, 16)}
            onChange={(e) => setNewSeance({ ...newSeance, finish: new Date(e.target.value) })}
          />
          <TextField
            margin="dense"
            id="local"
            label="Local"
            type="text"
            fullWidth
            value={newSeance.local}
            onChange={(e) => setNewSeance({ ...newSeance, local: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="module-label">Module</InputLabel>
            <Select
              labelId="module-label"
              id="module-select"
              value={newSeance.moduleId}
              onChange={(e) => setNewSeance({ ...newSeance, moduleId: e.target.value })}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="prof-label">Professeur</InputLabel>
            <Select
              labelId="prof-label"
              id="prof-select"
              value={newSeance.profId}
              onChange={(e) => setNewSeance({ ...newSeance, profId: e.target.value })}
            >
              {profs.map((prof) => (
                <MenuItem key={prof.id} value={prof.id}>
                  {`${prof.nom} ${prof.prenom}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="cheffil-label">Chef de Filière</InputLabel>
            <Select
              labelId="cheffil-label"
              id="cheffil-select"
              value={newSeance.cheffilid}
              onChange={(e) => setNewSeance({ ...newSeance, cheffilid: e.target.value })}
            >
              {chefFilieres.map((chef) => (
                <MenuItem key={chef.id} value={chef.id}>
                  {`${chef.nom} ${chef.prenom}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="chefdep-label">Chef de Département</InputLabel>
            <Select
              labelId="chefdep-label"
              id="chefdep-select"
              value={newSeance.chefdepid}
              onChange={(e) => setNewSeance({ ...newSeance, chefdepid: e.target.value })}
            >
              {chefDeparts.map((chef) => (
                <MenuItem key={chef.id} value={chef.id}>
                  {`${chef.nom} ${chef.prenom}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="seanceType-label">Type de Seance</InputLabel>
            <Select
              labelId="seanceType-label"
              id="seanceType-select"
              value={newSeance.seanceType}
              onChange={(e) => setNewSeance({ ...newSeance, seanceType: e.target.value })}
            >
              <MenuItem value="SEANCE">Seance</MenuItem>
              <MenuItem value="EXAMS">Garde</MenuItem>
              <MenuItem value="RATTRAPAGE">Rattrapage</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Annuler</Button>
          <Button onClick={handleAddSeance} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Seances;
