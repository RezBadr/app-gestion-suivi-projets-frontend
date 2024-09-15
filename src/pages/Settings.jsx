import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, InputBase, IconButton, Box, Divider, Alert } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';

// Remplacez ceci par le chemin correct vers votre service d'authentification
import { getAuthenticatedUser, updateUserInfoSettings } from '../services/updateUserInfo';

const SettingsPage = () => {
  const theme = useTheme();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [editing, setEditing] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getAuthenticatedUser();
        const roleMatch = userData.roles.match(/authority=([A-Z]+)/);
        const role = roleMatch ? roleMatch[1] : '';

        setUser(prevUser => ({
          ...prevUser,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          email: userData.username,
          role: role,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    if (field === 'confirmPassword') {
      setPasswordError(value !== user.password);
    }
  };

  const handleSave = async () => {
    if (passwordError) return;

    try {
      const formData = {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        password: user.password,
        email: user.email
      };
      await updateUserInfoSettings(formData);
      setEditing(null);
      toast.success('Informations mises à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
      if (error.message.includes('numéro de téléphone')) {
        toast.error(error.message);
      }
    }
  };

  // Fonction pour obtenir le nom complet du rôle
  const getRoleFullName = (role) => {
    switch (role) {
      case 'CHEFDEPROJET':
        return 'Chef de projet';
      case 'CHEFDELOT':
        return 'Chef de Lot';
      case 'CHEFDEQUALITÉ':
        return 'Responsable de Qualité';
      case 'TECHNICIENDETRAVAUX':
        return 'Technicien de travaux';
      case 'ADMIN':
        return 'Admin';
      case 'QUALITICIEN':
        return 'Qualiticien';
        case 'DIRECTEURGENERAL':
          return 'Directeur general';
      default:
        return role;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: theme.spacing(3), minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: theme.palette.background.default }}>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Paramètres
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.secondary }}>
          Rôle Utilisateur : {getRoleFullName(user.role)}
        </Typography>
        <Divider sx={{ marginY: theme.spacing(2), borderColor: theme.palette.primary.light }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
              Informations Personnelles
            </Typography>
            {['firstName', 'lastName', 'phoneNumber', 'email'].map((key) => (
              <Box display="flex" alignItems="center" sx={{ marginBottom: theme.spacing(3), borderBottom: `1px solid ${theme.palette.divider}` }} key={key}>
                <InputBase
                  fullWidth
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={user[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={editing !== key}
                  sx={{ padding: theme.spacing(1), color: theme.palette.text.primary }}
                />
                {editing === key ? (
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton color="secondary" onClick={() => setEditing(key)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
              Changer le Mot de Passe
            </Typography>
            <Box display="flex" alignItems="center" sx={{ marginBottom: theme.spacing(3), borderBottom: `1px solid ${theme.palette.divider}` }}>
              <InputBase
                fullWidth
                placeholder="Nouveau Mot de Passe"
                type="password"
                value={user.password}
                onChange={(e) => handleChange('password', e.target.value)}
                disabled={editing !== 'password'}
                sx={{ padding: theme.spacing(1), color: theme.palette.text.primary }}
              />
            </Box>
            <Box display="flex" alignItems="center" sx={{ marginBottom: theme.spacing(3), borderBottom: `1px solid ${theme.palette.divider}` }}>
              <InputBase
                fullWidth
                placeholder="Confirmer le Mot de Passe"
                type="password"
                value={user.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={passwordError}
                disabled={editing !== 'password'}
                sx={{ padding: theme.spacing(1), color: theme.palette.text.primary }}
              />
              {editing === 'password' ? (
                <IconButton color="primary" onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton color="secondary" onClick={() => setEditing('password')}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            {passwordError && (
              <Typography variant="body2" color="error">
                Les mots de passe ne correspondent pas
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 'auto', paddingTop: theme.spacing(3), textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          © {new Date().getFullYear()} ADM PROJET
        </Typography>
      </Box>
    </Container>
  );
};

export default SettingsPage;
