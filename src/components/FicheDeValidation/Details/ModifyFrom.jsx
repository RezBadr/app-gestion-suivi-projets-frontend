import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Switch,
  FormControlLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';
import { MockData } from '../../../data/MockData'; // Import your mock data
import { updateFileOfValidationFile, updateValidationFile } from '../../../services/FicheDeValidation/Service'; // Import your update functions

const CombinedComponent = ({ open, onClose, prestation, onFileUpdated, validationFileId, setFicheDeValidation }) => {
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState({});
  const [errors, setErrors] = useState([]);

  // Validation data state
  const [pkStartGauche, setPkStartGauche] = useState("");
  const [pkEndGauche, setPkEndGauche] = useState("");
  const [pkStartDroit, setPkStartDroit] = useState("");
  const [pkEndDroit, setPkEndDroit] = useState("");
  const [couche, setCouche] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isGaucheEnabled, setIsGaucheEnabled] = useState(true);
  const [isDroitEnabled, setIsDroitEnabled] = useState(true);

  const handleFileChange = async (event, fileLabel, key, natureFile) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await updateFileOfValidationFile(validationFileId, fileLabel, file, natureFile);
        setSelectedFiles((prev) => ({
          ...prev,
          [key]: file.name,
        }));
        onFileUpdated(); // Callback to notify the parent component
      } catch (error) {
        setErrors(['Failed to update file. Please try again.']);
      }
    }
  };

  const handleModifyClick = (fileLabel, key, natureFile) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (event) => handleFileChange(event, fileLabel, key, natureFile);
    input.click();
  };

  const getFileFields = () => {
    if (!prestation) return [];
    const data = MockData[prestation];

    if (Array.isArray(data)) {
      return data.flatMap((item, idx) => {
        const fvKey = `FV-${idx}`;
        const pvKey = `PV-${idx}`;

        return [
          <ListItem key={fvKey}>
            <ListItemText
              primary={item.FV}
              secondary={
                selectedFiles[fvKey] ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6">{`Fichier sélectionné : ${selectedFiles[fvKey]}`}</Typography>
                    <DoneIcon color="success" />
                    <Button onClick={() => handleModifyClick(item.FV, fvKey, 'FV')}>Modifier</Button>
                  </Stack>
                ) : null
              }
            />
            {!selectedFiles[fvKey] && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={errors.includes(`Fichiers manquants pour ${item.FV}`) ? 'error' : 'primary'}
              >
                Importer
                <input
                  type="file"
                  hidden
                  onChange={(event) => handleFileChange(event, item.FV, fvKey, 'FV')}
                />
              </Button>
            )}
          </ListItem>,
          <ListItem key={pvKey}>
            <ListItemText
              primary={item.PV}
              secondary={
                selectedFiles[pvKey] ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6">{`Fichier sélectionné : ${selectedFiles[pvKey]}`}</Typography>
                    <DoneIcon color="success" />
                    <Button onClick={() => handleModifyClick(item.FV, pvKey, 'PV')}>Modifier</Button>
                  </Stack>
                ) : null
              }
            />
            {!selectedFiles[pvKey] && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={errors.includes(`Fichiers manquants pour ${item.PV}`) ? 'error' : 'primary'}
              >
                Importer
                <input
                  type="file"
                  hidden
                  onChange={(event) => handleFileChange(event, item.FV, pvKey, 'PV')}
                />
              </Button>
            )}
          </ListItem>,
        ];
      });
    }

    if (data) {
      const fvKey = 'FV';
      const pvKey = 'PV';

      return [data.FV, data.PV].map((fileLabel, index) => {
        const key = index === 0 ? fvKey : pvKey;
        const natureFile = index === 0 ? 'FV' : 'PV';

        return (
          <ListItem key={key}>
            <ListItemText
              primary={fileLabel}
              secondary={
                selectedFiles[key] ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6">{`Fichier sélectionné : ${selectedFiles[key]}`}</Typography>
                    <DoneIcon color="success" />
                    <Button onClick={() => handleModifyClick(fileLabel, key, natureFile)}>Modifier</Button>
                  </Stack>
                ) : null
              }
            />
            {!selectedFiles[key] && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={errors.includes(`Fichiers manquants pour ${fileLabel}`) ? 'error' : 'primary'}
              >
                Importer
                <input
                  type="file"
                  hidden
                  onChange={(event) => handleFileChange(event, fileLabel, key, natureFile)}
                />
              </Button>
            )}
          </ListItem>
        );
      });
    }

    return [];
  };

  const validateFields = () => {
    if (isGaucheEnabled && (parseFloat(pkEndGauche) <= parseFloat(pkStartGauche))) {
      setValidationError("La valeur de PK End Gauche doit être supérieure à PK Start Gauche.");
      return false;
    }
    if (isDroitEnabled && (parseFloat(pkEndDroit) <= parseFloat(pkStartDroit))) {
      setValidationError("La valeur de PK End Droit doit être supérieure à PK Start Droit.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleValidationSubmit = async () => {
    if (!validateFields()) return;

    try {
      const data = await updateValidationFile(
        validationFileId,
        pkStartDroit,
        pkEndDroit,
        pkStartGauche,
        pkEndGauche,
        couche
      );
      setFicheDeValidation(data);
      onClose(); // Close dialog on success
    } catch (error) {
      setValidationError("Une erreur est survenue lors de la mise à jour des données.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Mise à jour des fichiers et des données de validation</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={isGaucheEnabled} onChange={() => setIsGaucheEnabled(!isGaucheEnabled)} />}
              label="Activer PK Gauche"
            />
            <FormControlLabel
              control={<Switch checked={isDroitEnabled} onChange={() => setIsDroitEnabled(!isDroitEnabled)} />}
              label="Activer PK Droit"
            />
          </Grid>
          {isGaucheEnabled && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PK Start Gauche"
                  value={pkStartGauche}
                  onChange={(e) => setPkStartGauche(e.target.value)}
                  margin="normal"
                  error={!!validationError && !pkStartGauche}
                  helperText={!!validationError && !pkStartGauche ? "Veuillez entrer une valeur." : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PK End Gauche"
                  value={pkEndGauche}
                  onChange={(e) => setPkEndGauche(e.target.value)}
                  margin="normal"
                  error={!!validationError && !pkEndGauche}
                  helperText={!!validationError && !pkEndGauche ? "Veuillez entrer une valeur." : ""}
                />
              </Grid>
            </>
          )}
          {isDroitEnabled && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PK Start Droit"
                  value={pkStartDroit}
                  onChange={(e) => setPkStartDroit(e.target.value)}
                  margin="normal"
                  error={!!validationError && !pkStartDroit}
                  helperText={!!validationError && !pkStartDroit ? "Veuillez entrer une valeur." : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PK End Droit"
                  value={pkEndDroit}
                  onChange={(e) => setPkEndDroit(e.target.value)}
                  margin="normal"
                  error={!!validationError && !pkEndDroit}
                  helperText={!!validationError && !pkEndDroit ? "Veuillez entrer une valeur." : ""}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Couche"
              value={couche}
              onChange={(e) => setCouche(e.target.value)}
              margin="normal"
            />
          </Grid>
          {validationError && (
            <Grid item xs={12}>
              <Typography color="error">{validationError}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6">Fichiers à importer</Typography>
            <List>
              {getFileFields()}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleValidationSubmit} color="primary">Valider</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CombinedComponent;
