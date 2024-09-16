import * as React from 'react';
import Box from '@mui/material/Box';
import { AgrementsList ,Header} from '../../features/CP/agrementsList';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';


const AgrementsListPage = () => {
    const location = useLocation();
    const marketId = location.state?.marketId;    
    return (
        <Box sx={{display : 'flex' , flexDirection : 'column' , width : '100%'}}>
            <Header title={"Agrément des matériaux"}/>
            <Divider variant="middle" />
            <AgrementsList marketId={marketId}/>
        </Box>
    );
}
export default AgrementsListPage;
