import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Typography, Divider, Chip } from "@mui/material";
import { formatDateFromTimestamp } from "../../../utils/dateUtils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LayersIcon from "@mui/icons-material/Layers";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";

const StatusSection = ({ title, status, date, note }) => {
  const theme = useTheme();
  const renderNote = (note) => {
    if (!note|| note=="null") return "-"; // Si la note est null ou vide, on retourne une chaîne vide
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
  return (
    <Box
      sx={{
        paddingLeft: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Box
        sx={{
          flex: "0 1 20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <Typography variant="h4">{title}</Typography>
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
        }}
      >
        {status === null ? (
          <>-</>
        ) : status === false ? (
          <CloseIcon sx={{ color: theme.palette.error.main }} />
        ) : (
          <DoneIcon sx={{ color: theme.palette.success.main }} />
        )}
        <Typography>{date}</Typography>
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
        }}
      >
        <p>{renderNote(note)}</p>
      </Box>
    </Box>
  );
};

const InfoSection = ({
  pkStartLeft,
  pkEndLeft,
  pkStartRight,
  pkEndRight,
  Layer,
  TypeOfControl,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      {pkStartLeft != null && pkEndLeft != null && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ChevronLeftIcon />
          <Typography>{`coté gauche : du PK ${pkStartLeft} au PK ${pkEndLeft}`}</Typography>
        </Box>
      )}

      {pkStartRight != null && pkEndRight != null && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Typography>{`coté droit : du PK ${pkStartRight} au PK ${pkEndRight}`}</Typography>
          <KeyboardArrowRightIcon />
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <LayersIcon />
        <Typography>{`N Couche:  ${Layer ? Layer : "--"} `}</Typography>
      </Box>

      {/* {TypeOfControl && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ControlCameraIcon />
          <Typography>{`Type de Control: ${TypeOfControl}`}</Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default function Main({
  entryDate,
  dateCl,
  dateCp,
  statusCp,
  statusCl,
  noteCp,
  noteCl,
  dateTt,
  statusTt,
  noteTt,
  pkStartLeft,
  pkEndLeft,
  pkStartRight,
  pkEndRight,
  Layer,
  TypeOfControl,
}) {
  const dateEntry = formatDateFromTimestamp(entryDate);
  const ClDate = formatDateFromTimestamp(dateCl);
  const CpDate = formatDateFromTimestamp(dateCp);
  const TtDate = formatDateFromTimestamp(dateTt);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <InfoSection
        pkStartLeft={pkStartLeft}
        pkEndLeft={pkEndLeft}
        pkStartRight={pkStartRight}
        pkEndRight={pkEndRight}
        Layer={Layer}
        TypeOfControl={TypeOfControl}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
          flex : '0 0 20%',

        }}
      >
        <Typography>Établit le : {dateEntry}</Typography>
      </Box>

      {statusCp === null && statusCl === null && statusTt === null ? (
        <Box
          sx={{
            display: "flex",
            // width: "fit-content",
            // height: "fit-content",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            flex : '0 0 65%',

 
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
            width: "fit-content",
            height: "fit-content",
            height: "100%",
            width: "100%",
            flex : '0 0 65%',
          }}
        >
          <StatusSection
            title="Chef de lot"
            status={statusCl}
            date={ClDate}
            note={noteCl}
          />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <StatusSection
            title="Chef de projet"
            status={statusCp}
            date={CpDate}
            note={noteCp}
          />
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <StatusSection
            title="Technicien"
            status={statusTt}
            date={TtDate}
            note={noteTt}
          />
        </Box>
      )}
    </Box>
  );
}
