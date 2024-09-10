import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'UNE LONGUE EXPERIENCE DANS LA GESTION DE GRANDS PROJETS',
    description: "Les équipes d'ADM PROJET disposent d'une expérience de planification et de suivi de plus de 50 projets d'autoroutes. En plus de l'aspect maîtrise d'ouvrage, les équipes de maîtrise d'œuvre étude disposent de toute l'expérience nécessaire pour le contrôle et l'optimisation de l'étude, la gestion de l'interface ainsi que la gestion administrative et technique des contrats d'études.",
    imgPath:
      'https://www.adm.co.ma/sites/default/files/styles/style_home_slider/public/photos/adm-pont-bouregreg-2970.jpg?itok=8NfKsvHH',
  },
  {
    label: 'UNE MAITRISE DE L\'EXPLOIATATION ET DE L\'ENTRETIEN DE L\'INFRASTRUCTURE',
    description: "Les équipes d'ADM PROJET disposent d'une expérience de planification et de suivi de plus de 50 projets d'autoroutes. En plus de l'aspect maîtrise d'ouvrage, les équipes de maîtrise d'œuvre étude disposent de toute l'expérience nécessaire pour le contrôle et l'optimisation de l'étude, la gestion de l'interface ainsi que la gestion administrative et technique des contrats d'études.",
    imgPath:
      'https://emdera.net/megabau/hoch-und-tiefbau.jpg',
  },
  {
    label: 'DES COMPETENCES CERTIFIEES',
    description: "Les équipes d'ADM PROJET disposent d'une expérience de planification et de suivi de plus de 50 projets d'autoroutes. En plus de l'aspect maîtrise d'ouvrage, les équipes de maîtrise d'œuvre étude disposent de toute l'expérience nécessaire pour le contrôle et l'optimisation de l'étude, la gestion de l'interface ainsi que la gestion administrative et technique des contrats d'études.",
    imgPath:
      'https://www.gestiondeprojets.ca/content/uploads/2017/08/Charg%C3%A9-de-projet-construction.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div id='home'>
      <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative' }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 490,
                      display: 'block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                  <Box
                    sx={{
                      width: '70%',
                      height: 'auto',
                      position: 'absolute',
                      top: '20%', // Ajuster la position du label
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(191, 196, 201, 0.5)',
                      padding: '20px',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                    >
                    <h1
                      sx={{
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                      }}
                    >
                    {step.label}
                    </h1>
                  <hr />
                  <p sx={{ fontSize: '1em', color: '#fff' }}>{step.description}</p>
                  </Box>
                </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        
        {/* Bouton de navigation à gauche */}
        <Button
          size="small"
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>

        {/* Bouton de navigation à droite */}
        <Button
          size="small"
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: '#fff',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
        
      </Box>
    </div>
  );
}

export default SwipeableTextMobileStepper;
