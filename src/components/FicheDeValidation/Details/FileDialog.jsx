import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { downloadFiles } from '../../../services/FicheDeValidation/Service'; // Assurez-vous que ce chemin est correct
import { MockData } from '../../../data/MockData';

const FileDialog = ({ openFileDialog, handleCloseFileDialog, prestation, validationFileId }) => {
  const files = MockData[prestation] || [];
  const [isLoading, setIsLoading] = React.useState(false);

  // // Fonction pour récupérer tous les fichiers associés à un fichier PV donné
  // const getAssociatedFiles = (fileName) => {
  //   const associatedFiles = [];
  //   files.forEach(item => {
  //     // Cherche le fichier PV et récupère les fichiers associés
  //     if (Object.values(item).includes(fileName)) {
  //       associatedFiles.push(fileName);
  //       Object.values(item).forEach(name => {
  //         if (name !== fileName) {
  //           associatedFiles.push(name);
  //         }
  //       });
  //     }
  //   });
  //   return associatedFiles;
  // };

  const handleDownload = async (fvFileName) => {
    setIsLoading(true);
    try {
      await downloadFiles(validationFileId, fvFileName);
      setIsLoading(false);
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  };

  return (
    <Dialog open={openFileDialog} onClose={handleCloseFileDialog} maxWidth="md" fullWidth>
      <DialogTitle>Documents pour {prestation}</DialogTitle>
      <DialogContent>
        <List>
          {files.length > 0 ? (
            files.map((item, index) => {
              const pvFileName = item.PV;
              const fvFileName = item.FV;
              return (
                <React.Fragment key={index}>
                  <ListItem button>
                    <ListItemIcon>
                      <FilePresentIcon />
                    </ListItemIcon>
                    <ListItemText primary={`FV: ${fvFileName}, PV: ${pvFileName}`} />
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation de l'événement au ListItem
                        handleDownload(fvFileName);
                      }}
                      disabled={isLoading}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </ListItem>
                </React.Fragment>
              );
            })
          ) : (
            <Typography variant="body2">Aucun fichier disponible.</Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default FileDialog;
