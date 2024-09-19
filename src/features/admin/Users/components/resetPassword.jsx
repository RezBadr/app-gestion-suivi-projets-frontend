import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { resetPassword } from '../services/usersService'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPasswordDialog({ username, userId }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); 
  const [error, setError] = React.useState(null); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleResetPassword = async () => {
    setLoading(true); 
    try {
      await resetPassword(userId); 
      toast.success(`Le mot de passe pour ${username} a été réinitialisé avec succès !`);
      handleClose();
    } catch (err) {
      setError('Échec de la réinitialisation du mot de passe. Veuillez réessayer.'); 
      toast.error('Erreur lors de la réinitialisation du mot de passe.');
      console.error('Error resetting password:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <React.Fragment>
      <Button 
        size="small" 
        variant="outlined" 
        startIcon={<RefreshIcon />} 
        onClick={handleClickOpen}
      >
        Réinitialiser 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Réinitialiser le mot de passe
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment réinitialiser le mot de passe de {username} ?
          </DialogContentText>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button 
            onClick={handleResetPassword} 
            color="error" 
            autoFocus
            disabled={loading} 
          >
            {loading ? 'Réinitialisation...' : 'Réinitialiser'}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> 
    </React.Fragment>
  );
}
