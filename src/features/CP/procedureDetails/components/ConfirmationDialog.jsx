import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { changeEtat } from "../service/procedureDetailsService";

export default function ConfirmationDialog({
  procedureId,
  title,
  context,
  openConfirmationDialog,
  handleCloseConfirmationDialog,
  setProcedure
}) {
  const theme = useTheme();

  const handleConfirmClick = async () => {
    const data = await changeEtat(procedureId, true, null);
    setProcedure((prev) => ({
      ...prev,
      statusCp: data.statusCp, 
      dateCp: data.dateCp, 
      noteCp: data.noteCp, 
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiPaper-root": {
            color: `${theme.palette.primary.main}`,
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Stack direction="row" spacing={2}>
            <VerifiedIcon color={theme.palette.primary.main} />
            <Typography>{title}</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{context}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseConfirmationDialog}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleConfirmClick();
              handleCloseConfirmationDialog();
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
