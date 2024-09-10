import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { createNewUser } from '../services/usersService'; 
import { toast } from 'react-toastify';
import { getAllUsers } from '../services/usersService'; 
import 'react-toastify/dist/ReactToastify.css';

function AddNewUser() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await createNewUser({ username: email, roles: "CHEFDEPROJET" });
      toast.success('Utilisateur créé avec succès !');
      setIsLoading(false);
      handleClose();
      await getAllUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error("Échec de la création de l'utilisateur. Veuillez réessayer.");
    }
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="newUser"
        size="large"
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
      >
        <PersonAddRoundedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          <h2>Enregistrer un nouvel utilisateur</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entrez l’adresse email, le nom complet, et le rôle ici.
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChangeEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button> 
          <Button
            type="submit"
            disabled={isLoading}
          >
              {isLoading ? 'En cours...' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddNewUser;
