import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import TerrainIcon from '@mui/icons-material/Terrain';
import LayersIcon from '@mui/icons-material/Layers';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useNavigate } from 'react-router-dom';

const FicheValidation = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const items = [
    { label: "Dégagement des emprises", icon: <LayersClearIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Décapage", icon: <LandscapeIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Remblai courant et substitution de purge", icon: <TerrainIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Couche de forme", icon: <LayersIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Déblai", icon: <TerrainRoundedIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Remblai PST", icon: <AltRouteIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> },
    { label: "Purge", icon: <ConstructionIcon sx={{ fontSize: '70px', color: theme.palette.primary.main }} /> }
  ];

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        textAlign: 'center',
        marginTop: '40px',
        gap: '5px',
        marginLeft: '40px'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '40px', fontWeight: 'bold' }}>
        Fiche de validation
      </Typography>

      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '50px',
          width: '100%',
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                border: `1px solid ${theme.palette.primary.dark}`,
                color: theme.palette.primary.dark,
              },
              width: '200px',
              textAlign: 'center',
            }}
            onClick={() => {
              navigate('/some/path', { state: { item: item.label } }); // Change to your desired navigation path
            }}
          >
            {item.icon}
            <Typography variant='h6'>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FicheValidation;
