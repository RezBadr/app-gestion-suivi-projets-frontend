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
import { deleteProcedure, modifyProcedure } from "../service";

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

export default function ModifyProcedureForm({
  openModifyProcedureForm,
  handleCloseModifyProcedureForm,
  procedure,
  setProcedureVersion,
}) {
  const theme = useTheme();

  const [deleted, setDeleted] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [procedureName, setProcedureName] = React.useState("");
  const [selectedFileName, setSelectedFileName] = React.useState("");

  const inputRef = React.useRef(null);

  // Handler for file selection
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setSelectedFileName(newFile ? newFile.name : "");
  };

  // Handler for procedure name change
  const handleProcedureNameChange = (event) => {
    setProcedureName(event.target.value);
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
      const deletedProcedureId = await deleteProcedure(procedure.procedureId);
      setProcedureVersion((prev) =>
        prev.filter((p) => p.procedureId !== deletedProcedureId)
      );
      handleCloseModifyProcedureForm(); // Close dialog on success
    } catch (error) {
      console.error("Error deleting procedure:", error);
    }
  };

  // Reset form data
  const resetFormData = () => {
    setFile(null);
    setSelectedFileName("");
    setProcedureName(procedure.procedureName);
    setDeleted(false);
  };

  // Handler for confirm button click
  const handleConfirmClick = () => {
    if (deleted) {
      handleConfirmDelete();
    } else {
      modifyProcedure(procedure.procedureId, procedureName, file);
      handleCloseModifyProcedureForm();
    }
  };

  // Close dialog and reset data
  const handleClose = () => {
    resetFormData();
    handleCloseModifyProcedureForm();
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            color: `${theme.palette.primary.main}`,
          },
        }}
        open={openModifyProcedureForm}
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
                  value={procedureName}
                  onChange={handleProcedureNameChange}
                />
                {!file && (
                  <IconButton
                    onClick={handleModifyClick}
                    disabled={
                      !(
                        procedure.statusCl === null &&
                        procedure.statusCp === null
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
