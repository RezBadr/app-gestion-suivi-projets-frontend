import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {checkIsLastVersion} from '../service'

export default function AgrementFooter({handleClickValidButton,handleClickRejectButton,agrementId}) {
    const theme = useTheme();
    const [isLastVersion,setIsLastVersion] = React.useState(false)

    const handleCheckIsLastVersion = async (id)=>{
      
            const IsLastVersion =  await checkIsLastVersion(id);
            setIsLastVersion(IsLastVersion);
            console.log(IsLastVersion)
  
    }

    React.useEffect(()=>{
        handleCheckIsLastVersion(agrementId)
    },[agrementId])
    
    return (
        <Box component="section" sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px', 
        }}>
            <Stack direction="row" spacing={2}>
                <Button 
                    variant="outlined" 
                    startIcon={<CloseIcon />} 
                    sx={{ 
                        color: theme.palette.error.main, 
                        borderColor: theme.palette.error.main, 
                        '&:hover': {
                            borderColor: theme.palette.error.dark,
                        },
                    }}
                    onClick={handleClickRejectButton}
                    disabled={!isLastVersion}
                >
                    Rejeter
                </Button>
                <Button 
                    variant="contained" 
                    endIcon={<DoneIcon />} 
                    sx={{ 
                        color: 'white', 
                        backgroundColor: theme.palette.success.main,
                        '&:hover': {
                            backgroundColor: theme.palette.success.dark,
                        },
                    }}
                    onClick={handleClickValidButton}
                    disabled={!isLastVersion}
                >
                    Valider
                </Button>
            </Stack>
        </Box>
    );
}
