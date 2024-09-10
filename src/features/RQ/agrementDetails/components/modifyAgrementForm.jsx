import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { deleteAgrement, modifyAgrement } from "../service";

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

export default function ModifyAgrementForm({
  openModifyAgrementForm,
  handleCloseModifyAgrementForm,
  agrement,
  setAgrementVersion,
}) {
  const theme = useTheme();

  const [deleted, setDeleted] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [agrementName, setAgrementName] = React.useState("");
  const [selectedFileName, setSelectedFileName] = React.useState("");

  const inputRef = React.useRef(null);

  // Handler for file selection
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setSelectedFileName(newFile ? newFile.name : "");
  };

  // Handler for agrement name change
  const handleAgrementNameChange = (event) => {
    setAgrementName(event.target.value);
  };

  // Handler for delete button click
  const handleDeleteClick = () => {
    setDeleted(true);
  };

  // Handler to open file input
  const handleModifyClick = () => {
    inputRef.current.click();
  };

  // Handler to confirm file deletion
  const handleConfirmDelete = async () => {
    try {
      const deletedAgrementId = await deleteAgrement(agrement.agrementId);
      setAgrementVersion((prev) =>
        prev.filter((p) => p.agrementId !== deletedAgrementId)
      );
      handleCloseModifyAgrementForm(); // Close dialog on success
    } catch (error) {
      console.error("Error deleting agrement:", error);
    }
  };

  // Reset form data
  const resetFormData = () => {
    setFile(null);
    setSelectedFileName("");
    setAgrementName(agrement.agrementName);
    setDeleted(false);
  };

  // Handler for confirm button click
  const handleConfirmClick = () => {
    if (deleted) {
      handleConfirmDelete();
    } else {
      modifyAgrement(agrement.agrementId, agrementName, file);
      handleCloseModifyAgrementForm();
    }
  };

  // Close dialog and reset data
  const handleClose = () => {
    resetFormData();
    handleCloseModifyAgrementForm();
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            color: `${theme.palette.primary.main}`,
          },
        }}
        open={openModifyAgrementForm}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleConfirmClick();
          },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <ModeEditIcon color={theme.palette.primary.main} />
            <Typography>Modifier la procédure</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>

            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={4} alignItems="flex-end">
                <TextField
                  id="standard-multiline-flexible"
                  label="Tapez le nom de la procédure"
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={agrementName}
                  onChange={handleAgrementNameChange}
                />
                {!file && (
                  <IconButton
                    onClick={handleModifyClick}
                    disabled={
                      !(
                        agrement.statusCl === null &&
                        agrement.statusCp === null
                      )
                    }
                  >
                    <CloudUploadIcon color="info" />
                  </IconButton>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={inputRef}
                />
              </Stack>
              {file && (
                <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                  <Typography>fichier séléctionné : {selectedFileName}</Typography>
                  <DoneIcon color="success" />
                  <Button  onClick={handleModifyClick}>
                    Modifier
                  </Button>
                </Stack>
              )}
            </Stack>
          
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleConfirmClick}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
