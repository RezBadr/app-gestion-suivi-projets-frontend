import * as React from 'react';
import Box from '@mui/material/Box';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Step2({ allowed, mainObject, setMainObject ,setAllowed }) {
  const theme = useTheme();
  const [quEmail, setQuEmail] = React.useState(mainObject.formData.usersRole.QUALITICIEN);
  const [rqEmail, setRqEmail] = React.useState(mainObject.formData.usersRole.CHEFDEQUALITE);
  const [clEmail, setClEmail] = React.useState(mainObject.formData.usersRole.CHEFDELOT);
  const [ttEmail, setTtEmail] = React.useState(mainObject.formData.usersRole.TECHNICIENDETRAVAUX);

  const handleChangeQuEmail = (event) => {
    const value = event.target.value;
    setQuEmail(value);
    setMainObject(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        usersRole: {
          ...prev.formData.usersRole,
          QUALITICIEN: value
        }
      }
    }));
  };

  const handleChangeRqEmail = (event) => {
    const value = event.target.value;
    setRqEmail(value);
    setMainObject(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        usersRole: {
          ...prev.formData.usersRole,
          CHEFDEQUALITE: value
        }
      }
    }));
  };

  const handleChangeClEmail = (event) => {
    const value = event.target.value;
    setClEmail(value);
    setMainObject(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        usersRole: {
          ...prev.formData.usersRole,
          CHEFDELOT: value
        }
      }
    }));
  };

  const handleChangeTtEmail = (event) => {
    const value = event.target.value;
    setTtEmail(value);
    setMainObject(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        usersRole: {
          ...prev.formData.usersRole,
          TECHNICIENDETRAVAUX: value
        }
      }
    }));
  };

  React.useEffect(() => {
    if (quEmail.trim() !== '' && clEmail.trim() !== '' && rqEmail.trim() !== '' && ttEmail.trim() !== '') {
      setAllowed([...allowed,1])
    }
  }, [rqEmail]);

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '10%' }}>
      <Box sx={{ whiteSpace: 'nowrap', flex: '1', marginBottom: '10%' }}>
        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
          <EngineeringIcon sx={{ fontSize: '50px', color: theme.palette.primary.main }} />
          <Typography variant="h6">Qualiticien</Typography>
        </Box>
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            placeholder='email'
            value={quEmail}
            onChange={handleChangeQuEmail}
          />
        </FormControl>
      </Box>
      <Box sx={{ whiteSpace: 'nowrap', flex: '1', marginBottom: '10%' }}>
        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
          <EngineeringIcon sx={{ fontSize: '50px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Responsable de qualité</Typography>
        </Box>
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            placeholder='email'
            value={rqEmail}
            onChange={handleChangeRqEmail}
          />
        </FormControl>
      </Box>
      <Box sx={{ whiteSpace: 'nowrap', flex: '1', marginBottom: '10%' }}>
        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
          <EngineeringIcon sx={{ fontSize: '50px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Chef de lot</Typography>
        </Box>
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            placeholder='email'
            value={clEmail}
            onChange={handleChangeClEmail}
          />
        </FormControl>
      </Box>
      <Box sx={{ whiteSpace: 'nowrap', flex: '1', marginBottom: '10%' }}>
        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
          <EngineeringIcon sx={{ fontSize: '50px', color: theme.palette.primary.main }} />
          <Typography variant='h6'>Technicien de travaux</Typography>
        </Box>
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            placeholder='email'
            value={ttEmail}
            onChange={handleChangeTtEmail}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
