import React from 'react';
import { Container, Typography, Link, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../../../assets/images/logo_adm_projet.png'

// Style pour l'image du logo
const Logo = styled('img')({
  maxWidth: '150px',
  height: 'auto',
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={1}>
      {'Copyright © '}
      <Link href="#" color="inherit">ADM Projet</Link>
      {` ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} textAlign="center">
            <Logo src={logo} alt="Logo de l'entreprise" />
          </Grid>
          <Grid item xs={12} md={4}>
           
            <Typography variant="body1" paragraph>
              VILLA N°58, rue Capitaine Abdesalam El Mouden,
              <br />
              Quartier OLM-Souissi
              <br />
              Rabat
              <br />
              Maroc
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
              <strong>Téléphone :</strong> (+212) 5 37 71 51 79
              <br />
              <strong>Fax :</strong> (+212) 5 37 56 83 64
              <br />
              <strong>Email :</strong> <Link href="mailto:admprojet@admprojet.com">admprojet@admprojet.com</Link>
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Copyright />
      </Container>
    </Box>
  );
}
