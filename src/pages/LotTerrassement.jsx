import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EngineeringIcon from '@mui/icons-material/Engineering'; // Pour les procédures d'exécution
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // Pour l'agrément des matériaux
import DescriptionIcon from '@mui/icons-material/Description'; // Pour les fiches de validation
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../services/userService';
import { useLocation } from "react-router-dom";

const LotTerrassement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const marketId = location.state?.marketId;

  const items = [
    { 
      label: "Procédures d’exécution", 
      icon: <EngineeringIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />,
      onClick: () => {
        navigate(`${getUserRole()}/ProceduresListPage`, { state: { marketId: marketId } });
        console.log(marketId);
      }
    },
    { 
      label: "Agrément des matériaux", 
      icon: <AssignmentTurnedInIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />,
      onClick: () => {
        navigate(`${getUserRole()}/AgrementsListPage`, { state: { marketId: marketId } });
        console.log(marketId);
      }
    },
    { 
      label: "Fiches de validation", 
      icon: <DescriptionIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />,
      onClick: () => {
        navigate(`${getUserRole()}/FicheDeValidationPage`, { state: { marketId: marketId } });
        console.log(marketId);
      }
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        textAlign: 'center',
        marginTop: '90px',
        marginLeft: '40px',
        gap: '50px'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '40px', fontWeight: 'bold' }}>
        Lot Terrassement
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
            onClick={item.onClick}
          >
            {item.icon}
            <Typography variant='h6'>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LotTerrassement;
