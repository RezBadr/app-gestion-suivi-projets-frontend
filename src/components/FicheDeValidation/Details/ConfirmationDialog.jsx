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
import { changeEtat } from "../../../services/FicheDeValidation/Service"

export default function ConfirmationDialog({
  validationFileId,
  title,
  context,
  openConfirmationDialog,
  handleCloseConfirmationDialog,
  setFicheDeValidation
}) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirmClick = async () => {
    setIsLoading(true)
    const data = await changeEtat(validationFileId, true, null);
    setFicheDeValidation(data);
    setIsLoading(false)
    handleCloseConfirmationDialog();
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
            disabled={isLoading}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
