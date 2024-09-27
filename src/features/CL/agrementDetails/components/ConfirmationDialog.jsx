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
import { changeEtat } from "../service/agrementDetailsService";

export default function ConfirmationDialog({
  agrementId,
  title,
  context,
  openConfirmationDialog,
  handleCloseConfirmationDialog,
  setAgrement
}) {
  const theme = useTheme();

  const handleConfirmClick = async () => {
    const data = await changeEtat(agrementId, true, "");
    setAgrement((prev) => ({
      ...prev,
      statusCl: data.statusCl, 
      dateCl: data.dateCl, 
      noteCl: data.noteCl, 
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
