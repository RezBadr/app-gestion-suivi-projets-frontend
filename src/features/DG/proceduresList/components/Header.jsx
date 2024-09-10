import * as React from 'react';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
export default function Header({ title }) {
    const theme = useTheme();

    return (
        <Box component="section" 
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                width : '100%'
            }}
        >
            <Box
                sx={{ 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                }}
            >
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center', 
                    padding: '8px',
                }}>
                    <InsertDriveFileIcon sx={{ color: '#201E43', fontSize: '40px' }} />
                </Box>
                <Box sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px', 
                    whiteSpace: 'nowrap'
                }}>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                </Box>
            </Box>  

        </Box>
    );
}
