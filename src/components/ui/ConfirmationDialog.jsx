import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';



export default function ConfirmationDialog({title ,context,open,handleCloseConfirmationDialog}) {

  const theme = useTheme();

  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          '& .MuiPaper-root': {
          color : `${theme.palette.primary.main}`,

          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
           <Stack direction="row" spacing={2}>
            <VerifiedIcon color={theme.palette.primary.main}/>
            <Typography>
             {title}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {context}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="error">
  Annuler
</Button>
          <Button variant="contained" color="success">
           Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}