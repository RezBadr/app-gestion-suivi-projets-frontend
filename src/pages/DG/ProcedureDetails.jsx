import * as React from "react";
import Box from "@mui/material/Box";
import {
  ProcedureHeader,
  ProcedureStatus,
  ProcedureList,
} from "../../features/DG/procedureDetails";

import { useLocation } from "react-router-dom";


export default function ProcedureDetailsForCl() {
  const { state } = useLocation();
  const [procedure,setProcedure] = React.useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };
  const handleClickValidButton = () => {
    setOpenConfirmationDialog(true);
  };
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
  };
  const handleClickRejectButton = () => {
    setOpenNoteDialog(true);
  };

  React.useEffect(() => {
    setProcedure(state?.procedure);
  },[state])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderBottom: "1px solid #ddd",
        }}
      >
        <ProcedureHeader
          procedureId={procedure?.procedureId}
          title={procedure?.procedureName}
          statusCp={procedure?.statusCp}
          handleClickModifyButton={null}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            flex: 3,
            // padding: '10px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProcedureStatus
            entryDate={procedure?.entryDate}
            statusCp={procedure?.statusCp}
            statusCl={procedure?.statusCl}
            dateCl={procedure?.dateCl}
            dateCp={procedure?.dateCp}
            noteCl={procedure?.noteCl}
            noteCp={procedure?.noteCp}
          />{" "}
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "53vh",
            // padding: '10px',
            overflowY:
              "auto" /* Ajoute une barre de défilement verticale si nécessaire */,
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "6px",
            },
          }}
        >
          <ProcedureList procedureId={procedure?.procedureId} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          // padding: '10px',
          marginTop: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
      </Box>
    </Box>
  );
}
