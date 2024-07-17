// src/components/Test.js
import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Paper, Typography, Stepper, Step, StepLabel, Container } from '@mui/material';
import Navig from '../incs/Navig';


const Inscription = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    cin: '',
    cne: '',
    email: '',
    region: 'Meknes',
    sexe: '',
    telephone: '',
    image: null,
    cinImage: null,
    bacImage: null,
    anneObtentionBac: '',
  });

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    cne: '',
    cin: '',
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'nom':
        if (/\d/.test(value)) {
          return 'Pas de chiffres dans le nom';
        }
        break;
      case 'prenom':
        if (/\d/.test(value)) {
          return 'Pas de chiffres dans le prenom';
        }
        break;
      case 'cin':
        if (value.length > 8) {
          return 'Le CIN ne peut pas dépasser 8 caractères';
        }
        break;
      case 'cne':
        if (value.length > 10) {
          return 'Le CNE ne doit pas contenir plus de 10 caractères';
        }
        break;
      case 'telephone':
        if (value !== '' && !/^\d+$/.test(value)) {
          return 'Le numéro de téléphone ne peut contenir que des chiffres';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleDebouncedChange = debounce((event) => {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  }, 300);

  const handleChange = (event) => {
    handleInputChange(event);
    handleDebouncedChange(event);
  };

  const handleFileChange = (event, fieldName) => {
    const { files } = event.target;
    setForm({ ...form, [fieldName]: files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2015; year--) {
    years.push(year.toString());
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
    <Navig/>
    <Container sx={{ marginTop:"30px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{
        maxWidth: '700px',
        width: '600px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '20px',
        paddingRight:"30px",
        height: '550px',
        paddingLeft:"30px",
        paddingTop:"40px"
      }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Typography>All steps completed</Typography>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {getStepContent(activeStep, form, handleChange, handleFileChange, errors, years)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Container>
    </>
  );
  
};

const getStepContent = (stepIndex, form, handleChange, handleFileChange, errors, years) => {
  switch (stepIndex) {
    case 0:
      return (
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              fullWidth
              error={!!errors.nom}
              helperText={errors.nom}
              sx={{ width: 350 , mb:3,marginTop:5 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
            label="Prenom"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            fullWidth
            error={!!errors.prenom}
            helperText={errors.prenom}
            sx={{ width: 350,mb:3}}
        />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{ width: 350 , mb:3}}
            />
          </Grid>
        
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              name="image"
              onChange={(e) => handleFileChange(e, 'image')}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span" fullWidth>
                Upload Image
              </Button>
            </label>
          </Grid>
          
        </Grid>
      );
    case 1:
      return (
        <Grid container spacing={2} direction="column" >
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="CNE"
              name="cne"
              value={form.cne}
              onChange={handleChange}
              fullWidth
              error={!!errors.cne}
              helperText={errors.cne}
              sx={{ marginTop:5,width:350, mb:3}}
            />
          </Grid>
         
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Telephone"
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              fullWidth
              error={!!errors.telephone}
              helperText={errors.telephone}
              sx={{ width: 350 , mb:3}}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField 
              label="CIN"
              name="cin"
              value={form.cin}
              onChange={handleChange}
              fullWidth
              error={!!errors.cin}
              helperText={errors.cin}
              sx={{ width:350,mb:3 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="cin-upload"
              type="file"
              name="cinImage"
              onChange={(e) => handleFileChange(e, 'cinImage')}
            />
            <label htmlFor="cin-upload">
              <Button variant="contained" color="primary" component="span" fullWidth>
                Upload CIN Image
              </Button>
            </label>
          </Grid>
         
        </Grid>
      );
    case 2:
      return (
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Region"
              name="region"
              value={form.region}
              onChange={handleChange}
              select
              fullWidth
              sx={{ marginTop:5,width:350, mb:3}}
            >
              <MenuItem value="Meknes">Meknes</MenuItem>
              <MenuItem value="Fes">Fes</MenuItem>
              <MenuItem value="Rabat">Rabat</MenuItem>
              <MenuItem value="Casablanca">Casablanca</MenuItem>
              <MenuItem value="Marrakech">Marrakech</MenuItem>
              <MenuItem value="Agadir">Agadir</MenuItem>
              <MenuItem value="Laayoune">Laayoune</MenuItem>
              <MenuItem value="Dakhla">Dakhla</MenuItem>
              <MenuItem value="Tanger">Tanger</MenuItem>
              <MenuItem value="Oujda">Oujda</MenuItem>
              <MenuItem value="Houseima">Houseima</MenuItem>
              <MenuItem value="Benimellal">Beni mellal</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Année Obtention Bac"
              name="anneObtentionBac"
              value={form.anneObtentionBac}
              onChange={handleChange}
              select
              fullWidth
              sx={{ width:350, mb:3}}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
                label="Filiere"
                name="filiere"
                select
                value={form.filiere}
                onChange={handleChange}
                fullWidth
                error={!!errors.filiere}
                helperText={errors.filiere}
                sx={{ width: 350, mb: 3 }}
            >
                <MenuItem value="smia">SMIA</MenuItem>
                <MenuItem value="smpc">SMPC</MenuItem>
                <MenuItem value="svtu">SVTU</MenuItem>
                <MenuItem value="bcg">BCG</MenuItem>
            </TextField>
            </Grid>

          <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="bac-upload"
              type="file"
              name="bac"
              onChange={(e) => handleFileChange(e, 'bacImage')}
            />
            <label htmlFor="bac-upload">
              <Button variant="contained" color="primary" component="span" fullWidth>
                Upload Bac Image
              </Button>
            </label>
          </Grid>
          
        </Grid>
         
      );
    default:
      return 'Unknown stepIndex';
     
  }
 
};

export default Inscription;
