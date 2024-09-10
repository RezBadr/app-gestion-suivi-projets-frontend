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
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";

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
  cpStatus,
  clStatus,
}) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            color: `${theme.palette.primary.main}`,
          },
        }}
        open={openModifyProcedureForm}
        onClose={handleCloseModifyProcedureForm}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseModifyProcedureForm();
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
          <Stack direction="row" spacing={4} alignItems="flex-end">
            <TextField
              id="standard-multiline-flexible"
              label="Tapez le nom de la procédure"
              multiline
              maxRows={4}
              variant="standard"
            />
            <IconButton disabled={cpStatus == null && clStatus == null}>
              <CloudUploadIcon color={theme.palette.primary.main} />
            </IconButton>
            <IconButton disabled={cpStatus == null && clStatus == null}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseModifyProcedureForm}
          >
            Annuler
          </Button>
          <Button variant="contained" onClick={handleCloseModifyProcedureForm}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
