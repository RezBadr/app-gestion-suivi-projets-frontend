import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography } from '@mui/material';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';



export default function NoteDialog() {

  const theme = useTheme();

  return (
    <React.Fragment>
      <Dialog
              sx={{
                '& .MuiPaper-root': {
                color : `${theme.palette.primary.main}`,
      
                }
              }}
        open={true}
        onClose={()=>{}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const email = formJson.email;
            console.log(email);
            // handleClose();
            
          },
        }}
      >

        <DialogTitle>
        <Stack direction="row" spacing={2}>
        <NoteRoundedIcon color={theme.palette.primary.main}/>
        <Typography>
          Ajouter une note
          </Typography>
          </Stack>

          </DialogTitle>
        <DialogContent>
          <DialogContentText >
            Ajouter une note
         
          </DialogContentText>
          <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
        />
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="error">
  Annuler
</Button>
<Button variant="contained" endIcon={<SendIcon />}>
  Envoyer
</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
