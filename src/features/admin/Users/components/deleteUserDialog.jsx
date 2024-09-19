import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from '../services/usersService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteUserDialog({ userId }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(userId)
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      toast.success("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Échec de la suppression de l'utilisateur. Veuillez réessayer.");
    } finally {
        setIsLoading(false);
        handleClose();
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Supprimer le compte utilisateur ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment supprimer ce compte ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDelete} 
            color="error" 
            autoFocus
            disabled={isLoading}
          >
            {isLoading ? 'En cours...' : 'Supprimer'}
            
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
