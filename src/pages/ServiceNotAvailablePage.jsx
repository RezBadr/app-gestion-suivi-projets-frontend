// ServiceNotAvailablePage.jsx

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';

const ServiceNotAvailablePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(3),
      }}
    >
      {/* Icon */}
      <IconButton
        sx={{
          color: theme.palette.error.main,
          fontSize: 100,
        }}
        disableRipple
      >
        <ErrorOutlineIcon sx={{ fontSize: '6rem' }} />
      </IconButton>

      {/* Heading */}
      <Typography variant="h4" gutterBottom>
        Service non disponible
      </Typography>

      {/* Message */}
      <Typography variant="body1">
      Nous sommes désolés pour le désagrément. Le service auquel vous essayez d’accéder n’est pas disponible.
      </Typography>
    </Box>
  );
};

export default ServiceNotAvailablePage;
