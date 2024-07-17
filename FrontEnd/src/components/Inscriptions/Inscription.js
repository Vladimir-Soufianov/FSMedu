import React, { useState } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Grid, Box, Stepper, Step, StepLabel, Container } from '@mui/material';
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
    imgFile: null, // Updated for image file
    cinFile: null, // Updated for CIN file
    bacFile: null, // Updated for Bac file
    anneObtentionBac: '',
    filiere: '',
  });

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    cne: '',
    cin: '',
    telephone: '',
    filiere: '',
  });

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'nom':
        if (!value) {
          errorMessage = 'Nom est requis';
        } else if (/\d/.test(value)) {
          errorMessage = 'Pas de chiffres dans le nom';
        }
        break;
      case 'prenom':
        if (!value) {
          errorMessage = 'Prenom est requis';
        } else if (/\d/.test(value)) {
          errorMessage = 'Pas de chiffres dans le prenom';
        }
        break;
      case 'email':
        if (!value) {
          errorMessage = 'Email est requis';
        }
        break;
      case 'cne':
        if (!value) {
          errorMessage = 'CNE est requis';
        } else if (value.length > 10) {
          errorMessage = 'Le CNE ne doit pas contenir plus de 10 caractères';
        }
        break;
      case 'telephone':
        if (!value) {
          errorMessage = 'Telephone est requis';
        } else if (!/^\d+$/.test(value)) {
          errorMessage = 'Le numéro contient que des chiffres';
        }
        break;
      case 'cin':
        if (!value) {
          errorMessage = 'CIN est requis';
        } else if (value.length > 8) {
          errorMessage = 'Le CIN ne peut pas dépasser 8 caractères';
        }
        break;
      case 'region':
        if (!value) {
          errorMessage = 'Region est requise';
        }
        break;
      case 'anneObtentionBac':
        if (!value) {
          errorMessage = 'Année Obtention Bac est requise';
        }
        break;
      case 'filiere':
        if (!value) {
          errorMessage = 'Filiere est requise';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const validateStep = (step) => {
    let valid = true;
    let newErrors = { ...errors };

    switch (step) {
      case 0:
        newErrors.nom = validateField('nom', form.nom);
        newErrors.prenom = validateField('prenom', form.prenom);
        newErrors.email = validateField('email', form.email);
        break;
      case 1:
        newErrors.cne = validateField('cne', form.cne);
        newErrors.telephone = validateField('telephone', form.telephone);
        newErrors.cin = validateField('cin', form.cin);
        break;
      case 2:
        if (!form.region) {
          newErrors.region = 'Region est requise';
          valid = false;
        } else {
          newErrors.region = '';
        }
        if (!form.anneObtentionBac) {
          newErrors.anneObtentionBac = 'Année Obtention Bac est requise';
          valid = false;
        } else {
          newErrors.anneObtentionBac = '';
        }
        if (!form.filiere) {
          newErrors.filiere = 'Filiere est requise';
          valid = false;
        } else {
          newErrors.filiere = '';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);

    for (let key in newErrors) {
      if (newErrors[key]) {
        valid = false;
        break;
      }
    }

    return valid;
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

    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nom', form.nom);
    formData.append('prenom', form.prenom);
    formData.append('cin', form.cin);
    formData.append('cne', form.cne);
    formData.append('email', form.email);
    formData.append('region', form.region);
    formData.append('telephone', form.telephone);
    formData.append('annebac', form.anneObtentionBac); // Adjusted to match JSON key 'annebac'
    formData.append('filiere', form.filiere); // Matched with JSON key 'filiere'
    formData.append('imgFile', form.imgFile); // Updated for image file upload
    formData.append('cinFile', form.cinFile); // Updated for CIN file upload
    formData.append('bacFile', form.bacFile); // Updated for Bac file upload

    try {
      const response = await axios.post('http://localhost:8080/api/inscriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data);
      // Handle success, e.g., show a success message and redirect if needed
      window.alert('Inscription soumise avec succès !');
      window.location.href = '/'; // Redirect to homepage after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, e.g., show an error message to the user
      window.alert('Erreur lors de la soumission du formulaire.');
    }
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 2015; year--) {
    years.push(year.toString());
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Navig />
      <Container sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{
          maxWidth: '700px',
          width: '600px',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '20px',
          paddingRight: '30px',
          height: '670px',
          paddingLeft: '30px',
          paddingTop: '40px'
        }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {getStepContent(activeStep, form, handleChange, handleFileChange, errors, years)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
              >
                Retour
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Soumettre' : 'Suivant'}
              </Button>
            </Box>
          </form>

        </Box>
      </Container>
    </>
  );
};

const getStepContent = (stepIndex, form, handleChange, handleFileChange, errors, years) => {
  const textFieldStyle = {
    width: '100%',
    marginTop: 10
  };

  switch (stepIndex) {
    case 0:
      return (
        <Grid container spacing={0} direction="column">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              fullWidth
              error={!!errors.nom}
              helperText={errors.nom || ' '}
              sx={{ ...textFieldStyle, marginTop: 5 }}
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
              helperText={errors.prenom || ' '}
              sx={textFieldStyle}
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
              error={!!errors.email}
              helperText={errors.email || ' '}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              name="imgFile"
              onChange={(e) => handleFileChange(e, 'imgFile')}
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
        <Grid container spacing={0} direction="column">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="CNE"
              name="cne"
              value={form.cne}
              onChange={handleChange}
              fullWidth
              error={!!errors.cne}
              helperText={errors.cne || ' '}
              sx={{ ...textFieldStyle, marginTop: 5 }}
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
              helperText={errors.telephone || ' '}
              sx={textFieldStyle}
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
              helperText={errors.cin || ' '}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="cin-upload"
              type="file"
              name="cinFile"
              onChange={(e) => handleFileChange(e, 'cinFile')}
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
        <Grid container spacing={0} direction="column">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Region"
              name="region"
              value={form.region}
              onChange={handleChange}
              select
              fullWidth
              helperText={errors.region || ' '}
              sx={{ ...textFieldStyle, marginTop: 5 }}
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              label="Année Obtention Bac"
              name="anneObtentionBac"
              value={form.anneObtentionBac}
              onChange={handleChange}
              select
              fullWidth
              helperText={errors.anneObtentionBac || ' '}
              sx={textFieldStyle}
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
              helperText={errors.filiere || ' '}
              sx={textFieldStyle}
            >
              <MenuItem value="smia">SMIA</MenuItem>
              <MenuItem value="smpc">SMPC</MenuItem>
              <MenuItem value="svtu">SVTU</MenuItem>
              <MenuItem value="bcg">BCG</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="bac-upload"
              type="file"
              name="bacFile"
              onChange={(e) => handleFileChange(e, 'bacFile')}
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
