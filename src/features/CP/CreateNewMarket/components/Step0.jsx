import * as React from 'react';
import Box from '@mui/material/Box';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import ColorLensIcon from '@mui/icons-material/ColorLens';


export default function Step1({allowed,mainObject}) {
    const theme = useTheme();

    const [isDone ,setIsDone] = React.useState(false);
    const finishStep=()=>{
        setIsDone(true);
        allowed.push(0);
    }

  return (
    <Box component="section" sx={{display : 'flex' , flexDirection : 'row' , width : '90%' , gap : '15%'}}>
        <Box onClick={()=>{finishStep()}} sx={{ flex : 1 , border :`1px solid ${theme.palette.primary[isDone ? 'dark' : 'main']}` , borderRadius : '10px' ,padding : '20px' ,display : 'flex' , justifyContent :'center'  ,alignItems : 'center' , flexDirection :'column' , gap : '40px' , cursor :'pointer' , '&:hover':{border : `1px solid ${theme.palette.primary.dark}` , color : theme.palette.primary.dark },'&:hover svg': {color: theme.palette.primary.dark }}}>
            <PublicIcon sx={{fontSize : '100px' , color : theme.palette.primary[isDone ? 'dark' : 'main']}}/>
            <Typography variant='h6' sx={{color : `${!isDone ? '':theme.palette.primary.dark}`}}>LOT TERRASSEMENT</Typography>
        </Box>
        <Box sx={{flex : 1 , border : `1px solid ${theme.Other.disable.main}` , borderRadius : '10px' , padding : '20px' ,display : 'flex' , justifyContent :'center'  ,alignItems : 'center' , flexDirection :'column' , gap : '40px' ,cursor :'pointer'}}>
            <AddRoadIcon sx={{fontSize : '100px' , color : theme.Other.disable.main}}/>
            <Typography variant='h6'>LOT CHAUSSEE</Typography>
        </Box>
        
        <Box sx={{flex : 1 ,border : `1px solid ${theme.Other.disable.main}` , borderRadius : '10px' ,padding : '20px' ,display : 'flex' , justifyContent :'center'  ,alignItems : 'center' , flexDirection :'column' , gap : '40px', cursor :'pointer'}}>
            <ColorLensIcon sx={{fontSize : '100px' , color : theme.Other.disable.main}}/>
            <Typography variant='h6'>LOT OUVRAGE D’ART</Typography>
        </Box>
    
    </Box>
  );
}
