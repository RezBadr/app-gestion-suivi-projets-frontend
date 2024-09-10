import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { getUserRole } from "../../../services/userService";

export default function Footer({
  handleClickValidButton,
  handleClickRejectButton,
}) {
  const theme = useTheme();

  const userRole = getUserRole();

  return (
    (userRole === "CP" || userRole === "CL" || userRole === "TT") && (
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              "&:hover": {
                borderColor: theme.palette.error.dark,
              },
            }}
            onClick={handleClickRejectButton}
          >
            Rejeter
          </Button>
          <Button
            variant="contained"
            endIcon={<DoneIcon />}
            sx={{
              color: "white",
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.dark,
              },
            }}
            onClick={handleClickValidButton}
          >
            Valider
          </Button>
        </Stack>
      </Box>
    )
  );
}
