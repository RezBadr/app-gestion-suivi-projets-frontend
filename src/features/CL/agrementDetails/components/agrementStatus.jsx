import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { formatDateFromTimestamp } from "../../../../utils/dateUtils";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function AgrementStatus({
  entryDate,
  dateCl,
  dateCp,
  statusCp,
  statusCl,
  noteCl,
  noteCp,
}) {
  const dateEntry = formatDateFromTimestamp(entryDate);
  const Cpdate = formatDateFromTimestamp(dateCp);
  // const Cldate = formatDateFromTimestamp(dateCl);
  const renderNote = (note) => {
    if (note == null) return ""; // Si la note est null ou vide, on retourne une chaîne vide
    if (note.length > 40) {
      return (
        <Box
          sx={{
            maxHeight: "4rem", // Limite de hauteur pour activer le scroll
            overflowY: "auto",
            padding: "0.5rem",
            wordBreak: "break-word", // Pour permettre le retour à la ligne
          }}
        >
          {note}
        </Box>
      );
    }
    return note;
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "1px solid",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: "0 0 20%",
          // border: "1px solid",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography>Établit le : {dateEntry}</Typography>
      </Box>
      {statusCp === null && statusCl === null ? (
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            justifyContent: "center",
            alignItems: "center",
            flex: "0 0 80%",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h4">En cours de Traitement ....</Typography>
        </Box>
      ) : (
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            height: "fit-content",
            flex: "0 0 80%",
            // border: "1px solid",
            height: "100%",
            width: "100%",
            paddingTop : "20px",
          }}
        >
          {" "}
          {/* Added padding to the left for spacing */}
          <Box
            sx={{
              // paddingLeft: "1rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              flex : "1",
            }}
          >
            {/* Flex container with vertical direction */}

            <Box
              sx={{
                flex: "0 1 20%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "0.5rem",
                // border: "1px solid",
              }}
            >
              {/* Box 1: 20% height */}
              <Typography variant="h4">Chef de lot</Typography>
            </Box>

            <Divider>
              <Chip label="Etat" size="small" />
            </Divider>

            <Box
              sx={{
                flex: "0 1 20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "3%",
                padding: "2%",
                marginBottom: "0.5rem",
                // border: "1px solid",
              }}
            >
              {/* Box 2: 20% height */}
              {statusCl === false ? (
                <CloseIcon sx={{ color: `${theme.Other.error.main}` }} />
              ) : statusCl === true ? (
                <DoneIcon sx={{ color: `${theme.Other.error.success}` }} />
              ) : (
                <>-</>
              )}
              <Typography>{formatDateFromTimestamp(dateCl)}</Typography>
            </Box>

            <Divider>
              <Chip label="Note" size="small" />
            </Divider>

            <Box
              sx={{
                display: "flex",
                flex: "0 1 60%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                // border: "1px solid",
              }}
            >
              {/* Box 3: 60% height */}
              <p>{renderNote(noteCl)}</p>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Box sx={{ height: "100%", flex: "1" }}>
            {" "}
            {/* Added padding to the left for spacing */}
            <Box
              sx={{
                // paddingLeft: "1rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >

              {/* Flex container with vertical direction */}

              <Box
                sx={{
                  flex: "0 1 20%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  // border: "1px solid",
                }}
              >
                {/* Box 1: 20% height */}
                <Typography variant="h4">Chef de projet</Typography>
              </Box>

              <Divider>
                <Chip label="Etat" size="small" />
              </Divider>

              <Box
                sx={{
                  flex: "0 1 20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3%",
                  padding: "2%",
                  marginBottom: "0.5rem",
                  // border: "1px solid",
                }}
              >
                {/* Box 2: 20% height */}
                {statusCp === false ? (
                  <CloseIcon sx={{ color: `${theme.palette.error.main}` }} />
                ) : statusCp === true ? (
                  <DoneIcon sx={{ color: `${theme.palette.error.success}` }} />
                ) : (
                  <></>
                )}
                <Typography>{Cpdate}</Typography>
              </Box>

              <Divider>
                <Chip label="Note" size="small" />
              </Divider>

              <Box
                sx={{
                  display: "flex",
                  flex: "0 1 60%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  // border: "1px solid",
                }}
              >
                {/* Box 3: 60% height */}
                <p>{renderNote(noteCp)}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
