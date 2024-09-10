import React from 'react'
import Box from '@mui/material/Box';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AddNewUser from './addNewUser';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function UsersHeader() {
    const theme = useTheme();
  return (
    <div>
        <Box component="section" 
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                // width : '100%'
            }}
        >
            <Box
                sx={{ 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'center', 
                    flex: '1 0 0', 
                    justifyContent: 'flex-start',
                }}
            >
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center', 
                    padding: '8px',
                }}>
                    <PeopleAltTwoToneIcon sx={{ color: '#201E43', fontSize: '40px' }} />
                </Box>
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', 
                    whiteSpace: 'nowrap'
                }}>
                    <Typography variant="h2">
                        Liste des utilisateurs
                    </Typography>
                </Box>
            </Box>  
            <Box
                sx={{ 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'center', 
                    flex: '1 0 0', 
                    justifyContent: 'flex-end',
                }}
            >
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center', 
                    padding: '8px',
                }}>
                   <AddNewUser />
                </Box>

            </Box>
        </Box>
    </div>
  )
}

export default UsersHeader;