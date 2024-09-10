import * as React from 'react';
import Box from '@mui/material/Box';
import { ProceduresList ,Header} from '../../features/DG/proceduresList';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';


const ProceduresListPage = () => {
    const location = useLocation();
    const [marketId,setMarketId] = React.useState(location.state?.marketId ? location.state?.marketId : localStorage.getItem('marketId')); 
    
  

    return (
        <Box sx={{display : "flex" , flexDirection : "column"}}>
            <Box sx={{display : 'flex'}}>
            <Header title={"Procédures d’exécution"}/>
            </Box>
            <Divider variant="middle" />
            <Box sx={{display : 'flex'}}>
            <ProceduresList marketId={marketId}/>
            </Box>
        </Box>
    );
}
export default ProceduresListPage;
