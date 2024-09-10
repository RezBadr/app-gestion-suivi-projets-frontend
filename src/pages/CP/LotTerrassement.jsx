import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedIcon from '@mui/icons-material/Verified';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import {getUserRole} from '../services/userService'
import { useLocation } from "react-router-dom";


// Animation for hover effect
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LotTerrassement = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [marketId ,setMarketId] = React.useState(location.state );


  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography variant='h4' sx={{ marginBottom: '20px' }}>
        Choisissez une procédure
      </Typography>

      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%',
        }}
      >
        <Box
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
              animation: `${pulse} 1s infinite`,
            },
            '&:hover svg': {
              color: theme.palette.primary.dark,
            },
            width: '200px',
            textAlign: 'center',
          }}
          onClick={()=>{navigate(`${getUserRole()}/ProceduresListPage`,{state : {marketId: marketId}})}}
        >
          <BuildIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Procédures d’exécution</Typography>
        </Box>

        <Box
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
              animation: `${pulse} 1s infinite`,
            },
            '&:hover svg': {
              color: theme.palette.primary.dark,
            },
            width: '200px',
            textAlign: 'center',
          }}
        >
          <VerifiedIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Agrément des matériaux</Typography>
        </Box>

        <Box
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
              animation: `${pulse} 1s infinite`,
            },
            '&:hover svg': {
              color: theme.palette.primary.dark,
            },
            width: '200px',
            textAlign: 'center',
          }}
        >
          <FileCopyIcon sx={{ fontSize: '100px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Fiches de validation</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LotTerrassement;
