
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box } from '@mui/material';
import { updateUserInfo } from '../services/updateUserInfo';

export default function FirstLoginForm() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Limite le numéro de téléphone à 10 chiffres
      if (value.length > 10) {
        return;
      }
    }

    setFormValues({
      ...formValues,
      [name]: value
    });

    // Clear error when user starts typing again
    setErrors({
      ...errors,
      [name]: false
    });
  };

  const steps = [
    {
      label: 'Informations personnelles',
      content: (
        <>
          <TextField
            variant="standard"
            fullWidth
            label="Prénom"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
            error={errors.firstName}
            helperText={errors.firstName ? 'Ce champ est requis' : ''}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Nom"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
            error={errors.lastName}
            helperText={errors.lastName ? 'Ce champ est requis' : ''}
          />
        </>
      )
    },
    {
      label: 'Coordonnées',
      content: (
        <TextField
          variant="standard"
          fullWidth
          label="Numéro de téléphone"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          required
          error={errors.phoneNumber}
          helperText={errors.phoneNumber ? 'Le numéro de téléphone doit contenir 10 chiffres' : ''}
          type="tel"
        />
      )
    },
    {
      label: 'Sécurité',
      content: (
        <>
          <TextField
            variant="standard"
            fullWidth
            label="Nouveau mot de passe"
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleChange}
            required
            error={errors.newPassword}
            helperText={errors.newPassword ? 'Ce champ est requis' : ''}
            type="password"
            style={{ marginBottom: '16px' }}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Confirmer le mot de passe"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
            helperText={
              errors.confirmPassword
                ? 'Les mots de passe ne correspondent pas ou ce champ est requis'
                : ''
            }
            type="password"
          />
        </>
      )
    }
  ];

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation pour chaque étape spécifique
    if (currentStep === 0) {
      if (!formValues.firstName) {
        newErrors.firstName = true;
        valid = false;
      }
      if (!formValues.lastName) {
        newErrors.lastName = true;
        valid = false;
      }
    } else if (currentStep === 1) {
      if (!formValues.phoneNumber) {
        newErrors.phoneNumber = true;
        valid = false;
      } else if (formValues.phoneNumber.length !== 10) {
        newErrors.phoneNumber = true;
        valid = false;
      }
    } else if (currentStep === 2) {
      if (!formValues.newPassword) {
        newErrors.newPassword = true;
        valid = false;
      }
      if (formValues.newPassword !== formValues.confirmPassword) {
        newErrors.confirmPassword = true;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = async () => {
    if (validateForm()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        try {
          setLoading(true);
          setError('');
          const response = await updateUserInfo({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
            password: formValues.newPassword
          });

          console.log('Formulaire soumis avec succès!');
          
          window.location.reload();
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4">Bienvenue!</Typography>
        <Typography variant="subtitle1">Veuillez compléter les informations suivantes</Typography>
      </div>
      <Box mt={4}>
        <Typography variant="h6" align="center" gutterBottom>
          {steps[currentStep].label}
        </Typography>
        {steps[currentStep].content}
        <Grid container spacing={2} style={{ marginTop: '24px' }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
            >
              Retour
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={loading}
            >
              {currentStep === steps.length - 1 ? (loading ? 'Chargement...' : 'Soumettre') : 'Suivant'}
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Box mt={2} textAlign="center">
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        <Box mt={2} textAlign="center">
          <Typography variant="caption">
            Étape {currentStep + 1} sur {steps.length}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}