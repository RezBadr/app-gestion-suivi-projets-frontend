import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { createNewUser, getAllUsers } from '../services/usersService'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewUser() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
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
      await createNewUser({ username: email, roles: role });
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
            label="Adresse Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChangeEmail}
          />
          <FormControl fullWidth variant="standard" margin="normal" required>
            <InputLabel id="role-label">Rôle</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={handleChangeRole}
              label="Rôle"
            >
              <MenuItem value="DIRECTEURGENERAL">Directeur Général</MenuItem>
              <MenuItem value="CHEFDEPROJET">Chef de Projet</MenuItem>
            </Select>
          </FormControl>
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
