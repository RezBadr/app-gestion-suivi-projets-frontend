import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Icon } from '@mui/material';
import {
  Engineering,
  AccountTree,
  Construction,
  Settings,
  Assessment
} from '@mui/icons-material';

function Services() {
  const services = [
    {
      title: "Assistance Maîtrise d'Ouvrage Étude",
      description: "Support dans la gestion des études et la maîtrise d'ouvrage pour garantir la réussite des projets d'infrastructure.",
      icon: <Engineering />
    },
    {
      title: "Maîtrise d'Ouvrage Déléguée",
      description: "Gestion déléguée des projets, en supervisant toutes les étapes pour assurer le respect des objectifs et des délais.",
      icon: <AccountTree />
    },
    {
      title: "Pilotage, Coordination et Suivi des Projets de Construction",
      description: "Coordination des différents acteurs du projet pour assurer le bon déroulement des opérations et la qualité des résultats.",
      icon: <Construction />
    },
    {
      title: "Mise en Place de Système de Management de Projets",
      description: "Élaboration et mise en œuvre de systèmes pour gérer efficacement les projets et améliorer les performances.",
      icon: <Settings />
    },
    {
      title: "Audit, Conseil, Évaluations et Autres",
      description: "Services d'audit et de conseil pour évaluer et optimiser les processus et la gestion des projets.",
      icon: <Assessment />
    }
  ];

  return (
    <Container id="services" sx={{ marginTop: '40px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Nos Services
      </Typography>
      <hr />
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item color={'#2e9cb2'}>
                    {service.icon}
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5" gutterBottom color={'#2e9cb2'}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1">
                      {service.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Services;
