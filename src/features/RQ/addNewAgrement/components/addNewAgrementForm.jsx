import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import { postNewAgrement } from "../services";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddingForm({ open, handleClose, setAgrements }) {
  const [agrementName, setAgrementName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAgrementNameChange = (event) => {
    setAgrementName(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const resetForm = () => {
    setAgrementName("");
    setFile(null);
    setError(false);
  };

  const theme = useTheme();

  const handleAddClick = async () => {
    if (!agrementName || !file) {
      setError(true);
      return;
    }
    try {
      setIsLoading(true);
      const newAgrement = await postNewAgrement(agrementName, file);
      setAgrements((prev) => [...prev, newAgrement]);
      resetForm();
      setIsLoading(flase);
      handleClose();
    } catch (error) {
      console.error("Error adding agrement:", error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            color: `${theme.palette.primary.main}`,
          },
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleAddClick();
          },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <AddBoxRoundedIcon color={theme.palette.primary.main} />
            <Typography>Ajouter un Agrément</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={4}>
            <TextField
              id="agrement-name"
              label="Tapez le nom de la procédure"
              multiline
              maxRows={4}
              variant="standard"
              onChange={handleAgrementNameChange}
              value={agrementName}
              error={error && !agrementName}
              helperText={error && !agrementName ? "Ce champ est obligatoire" : ""}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ height: "auto", display: "flex", alignItems: "center" }}
            >
              {file ? "Modifier le fichier" : "Importer le fichier"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Stack>
          {file && (
            <Stack direction="row" alignItems="center" spacing={1} mt={2}>
              <DoneIcon color="success" />
              <Typography noWrap>
                Fichier sélectionné : {file.name}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant={isLoading ? "outlined" : "contained"}
            onClick={handleAddClick}
            disabled={isLoading}
          >
            {isLoading ? "En cours" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
