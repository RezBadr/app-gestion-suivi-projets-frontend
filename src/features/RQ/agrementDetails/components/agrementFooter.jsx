import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { postNewAgrementVersion, checkIsLastVersion } from "../service";

export default function AgrementFooter({
  statusCl,
  statusCp,
  agrementId,
  setAgrementVersion,
}) {
  const [file, setFile] = React.useState(null);
  const [isLastVersion, setIsLastVersion] = React.useState(false);

  const handleCheckIsLastVersion = async (id) => {
    const IsLastVersion = await checkIsLastVersion(id);
    setIsLastVersion(IsLastVersion);
    console.log(IsLastVersion);
  };

  React.useEffect(() => {
    handleCheckIsLastVersion(agrementId);
  }, [agrementId]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleModifyClick = () => {
    fileRef.current.click();
  };

  const handleConfirmClick = async () => {
    try {
      const newVersion = await postNewAgrementVersion(agrementId, file);
      setAgrementVersion((prev) => [...prev, newVersion]);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFile(null);
  };

  const fileRef = React.useRef(null);
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "16px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {file && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <DoneIcon color="success" />
            <Typography noWrap>
              Fichier sélectionné : {file.name}
            </Typography>
            <Button
              variant="text"
              onClick={handleModifyClick}
              sx={{ ml: 1 }}
            >
              Modifier
            </Button>
          </Stack>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileRef}
          style={{ display: "none" }}
        />
        {file === null ? (
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            sx={{
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              "&:hover": {
                borderColor: theme.palette.error.main,
              },
            }}
            disabled={
              !isLastVersion ||
              (statusCp == null && statusCl == null) ||
              (statusCl == true && statusCp == null) ||
              statusCp == true
            }
            onClick={handleModifyClick}
          >
            Ajouter une nouvelle version
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<DoneRoundedIcon />}
            sx={{
              color: theme.palette.success.main,
              borderColor: theme.palette.success.main,
              "&:hover": {
                borderColor: theme.palette.success.main,
              },
            }}
            onClick={handleConfirmClick}
          >
            Confirmer
          </Button>
        )}
      </Stack>
    </Box>
  );
}
