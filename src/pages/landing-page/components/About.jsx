import React from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

function About() {
  return (
    <Container id="about" sx={{ marginTop: '40px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Présentation
      </Typography>
        <hr />
      <Grid container spacing={4}>
        {/* Groupe Autoroutes du Maroc Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="250"
              image="https://www.lenouvelliste.ma/wp-content/uploads/2023/03/ADM-Autoroute.jpeg" // Replace with a relevant image URL
              alt="Groupe Autoroutes du Maroc"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom color={'#2e9cb2'}>
                GROUPE AUTOROUTES DU MAROC
              </Typography>
              <hr />
              <Typography variant="body1">
                Une maîtrise du secteur autoroutier. Créée en 1989, La société Nationale des Autoroutes du Maroc (ADM) est l'opérateur concessionnaire d'autoroutes de référence au Maroc et en Afrique.
                ADM a impliqué ses propres ressources humaines dans toute la chaîne de valeur de ses projets d'infrastructures : planification, montage, maîtrise d'ouvrage, maîtrise d'œuvre, exploitation, entretien, audit...
                <br />
                Plus d'informations, veuillez visiter le site web <a href='https://www.adm.co.ma/'>adm.co.ma</a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ADM PROJET Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="250"
              image="https://fr.le360.ma/resizer/v2/QLDVMFJBXJF3XHQLF73SJTMBVU.jpeg?auth=3e8d85fb2661d698c8d958ee20665860bc9294b13a067ac55f1c9ee0c3c2ef2a&smart=true&width=1216&height=684" // Replace with a relevant image URL
              alt="ADM PROJET"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom color={'#2e9cb2'}>
                ADM PROJET
              </Typography>
              <hr />
              <Typography variant="body1">
                ADM PROJET est une société anonyme à conseil d’administration. ADM PROJET filiale à 99,9% de la société nationale des Autoroutes Du Maroc (ADM) est une société spécialisée dans les domaines de maîtrise d’œuvre et d’assistance à maîtrise d’ouvrage des projets de génie civil. Notre offre couvre les domaines routiers, portuaires et aéroportuaires. Elle s’étend aussi au conseil pour le montage des projets et leur l’exploitation. La longue expérience acquises par nos compétences dans la gestion de projets innovants et complexes nous permettent de vous offrir des solutions dédiées visant à optimiser les coûts et les délais de vos projets et ce dans un respect total de la qualité
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
