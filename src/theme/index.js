import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#137C8B',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#283762',
      light: '#7e57c2',
      dark: '#b71c1c',
      contrastText: '#fff',
    },
  },
  Other :{
  back:{
      main : '#EBF2FA',
    },
    divider :{
      main : '#B8CBD0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
      dark : '#69f0ae',
      light : '#388e3c'
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    disable :{
      main : '#9e9e9e'
    },
    pending :{
      main : '#ffab00'
    }
  },
  typography: {
    fontFamily: '"Josefin Sans", monospace',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
