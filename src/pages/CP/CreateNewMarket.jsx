import * as React from 'react';
import Box from '@mui/material/Box';
import {StepperForcreatingNewMarket} from '../../features/CP/CreateNewMarket'

const CreateNewMarket = () => {
  return (
    <Box component="section" sx={{ paddingTop : '50px',paddingBottom: '10px',paddingLeft :'10px',paddingRight :'10px',height : '78vh' }}>
            <StepperForcreatingNewMarket/>
    </Box>
  );
}

export default CreateNewMarket;
