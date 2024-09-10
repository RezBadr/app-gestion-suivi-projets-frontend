import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici la logique pour envoyer le formulaire
    alert("Le formulaire a été envoyé !");
  };

  return (
    <Container id='contact' sx={{ marginTop: '40px', marginBottom: '10px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact
      </Typography>
      <hr />
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Envoyer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
