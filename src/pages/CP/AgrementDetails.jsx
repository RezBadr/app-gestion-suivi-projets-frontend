import * as React from "react";
import Box from "@mui/material/Box";
import {
  AgrementHeader,
  AgrementFooter,
  AgrementStatus,
  AgrementList,
  NoteDialog,
  ConfirmationDialog,
} from "../../features/CP/agrementDetails";

import { useLocation } from "react-router-dom";


export default function AgrementDetailsForCl() {
  const { state } = useLocation();
  const [agrement,setAgrement] = React.useState(null);
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
    setAgrement(state?.agrement);
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
        <AgrementHeader
          agrementId={agrement?.agrementId}
          title={agrement?.agrementName}
          statusCp={agrement?.statusCp}
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
          <AgrementStatus
            entryDate={agrement?.entryDate}
            statusCp={agrement?.statusCp}
            statusCl={agrement?.statusCl}
            dateCl={agrement?.dateCl}
            dateCp={agrement?.dateCp}
            noteCl={agrement?.noteCl}
            noteCp={agrement?.noteCp}
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
          <AgrementList agrementId={agrement?.agrementId} />
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
        <AgrementFooter
          handleClickValidButton={handleClickValidButton}
          handleClickRejectButton={handleClickRejectButton}
          agrementId={agrement?.agrementId}
        />
      </Box>
      <NoteDialog
        openNoteDialog={openNoteDialog}
        handleCloseNoteDialog={handleCloseNoteDialog}
        agrementId={agrement?.agrementId}
        setAgrement={setAgrement}
      />
      <ConfirmationDialog
        agrementId={agrement?.agrementId} 
        title={"Valider la procédure"}
        context={"Êtes-vous sûr de valider la procédure ?"}
        openConfirmationDialog={openConfirmationDialog}
        handleCloseConfirmationDialog={handleCloseConfirmationDialog}
        setAgrement = {setAgrement}
      />
    </Box>
  );
}
