import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import { updateUser } from '../services/usersService'; // Import de la fonction pour mettre à jour l'utilisateur

function UpdateUser({ idUser }) {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
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
    const formData = new FormData(event.currentTarget);
    const updatedUser = {
      user: formData.get('email'),
      role: formData.get('role')
    };
    try {
      await updateUser(idUser, updatedUser); // Mise à jour de l'utilisateur via l'API
      console.log('User updated successfully');
      handleClose(); // Fermer la boîte de dialogue après la mise à jour
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="updateUser"
        size="large"
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
      >
        <EditIcon />
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
          <h2>Modifier l'utilisateur {idUser}</h2>
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
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-label">Rôle</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <MenuItem value="CHEFDEPROJET">Chef de projet</MenuItem>
              <MenuItem value="CHEFDELOT">Chef de lot</MenuItem>
              <MenuItem value="RESPONSABLEDEQUALITE">Responsable de qualité</MenuItem>
              <MenuItem value="TECHNICIENTRAVAUX">Technicien travaux</MenuItem>
              <MenuItem value="QUALITICIEN">Qualiticien</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Modifier</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UpdateUser;
