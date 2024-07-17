import React, { useState } from 'react';
import Navig from '../../incs/Navig';
import StudentDrawer from '../Drawer/StudentDrawer';
import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from '@mui/material';

const modulesData = [
  {
    filiere: 'SMI S3',
    modules: [
      { id: 1, name: 'Algorithmes' },
      { id: 2, name: 'Probabilité' },
      { id: 3, name: 'Electronique' },
      { id: 4, name: 'Systeme d\'exploitation' },
      { id: 5, name: 'Web Development' },
    ],
  },
 
];

const Reinscription = () => {
  const [selectedModules, setSelectedModules] = useState([]);

  const handleModuleSelect = (moduleId) => {
    // Check if the module is already selected
    const isSelected = selectedModules.includes(moduleId);

    // Update selected modules based on current state
    setSelectedModules((prevSelectedModules) =>
      isSelected
        ? prevSelectedModules.filter((id) => id !== moduleId) // Remove module if already selected
        : prevSelectedModules.length < 3 // Limit selection to 3 modules
        ? [...prevSelectedModules, moduleId] // Add module if not selected and limit is not reached
        : prevSelectedModules // Return current selection if limit reached
    );
  };

  return (
    <>
      <Navig />
      <StudentDrawer />
      <Container maxWidth="md" style={{ marginTop: '20px', marginLeft: '280px' }}>
        <Typography variant="h4" gutterBottom>
          Choisir modules pour le prochain semestre
        </Typography>
        {modulesData.map((program) => (
          <Card key={program.filiere} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {program.filiere}
              </Typography>
              <FormControl component="fieldset">
                <FormGroup>
                  {program.modules.map((module) => (
                    <FormControlLabel
                      key={module.id}
                      control={
                        <Checkbox
                          checked={selectedModules.includes(module.id)}
                          onChange={() => handleModuleSelect(module.id)}
                        />
                      }
                      label={module.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}
        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Confirmer réinscription
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Reinscription;
