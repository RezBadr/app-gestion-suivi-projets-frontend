import * as React from "react";
import Box from "@mui/material/Box";
import {
  ProcedureHeader,
  ProcedureFooter,
  ProcedureStatus,
  ProcedureList,
  ModifyProcedureForm,
} from "../../features/RQ/procedureDetails";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";


export default function ProcedureDetails() {
  const { state } = useLocation();
  const [procedure, setProcedure] = React.useState(null); 
  const [procedureVersion , setProcedureVersion] = React.useState([])
  const [openModifyProcedureForm, setOpenModifyProcedureForm] =
    React.useState(false);
  const handleCloseModifyProcedureForm = () => {
    setOpenModifyProcedureForm(false);
  };
  const handleClickModifyButton = () => {
    setOpenModifyProcedureForm(true);
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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // padding: '10px',
        }}
      >
        <ProcedureHeader
          procedureId={procedure?.procedureId}
          title={procedure?.procedureName}
          statusCp={procedure?.statusCp}
          handleClickModifyButton={handleClickModifyButton}
        />
      </Box>
      <Divider variant="middle" />

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
          />
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
          <ProcedureList procedureVersion={procedureVersion} setProcedureVersion={setProcedureVersion} procedureId={procedure?.procedureId} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <ProcedureFooter
          statusCp={procedure?.statusCp}
          statusCl={procedure?.statusCl}
          procedureId={procedure?.procedureId}
          setProcedureVersion={setProcedureVersion}
        />
      </Box>
      <ModifyProcedureForm
        openModifyProcedureForm={openModifyProcedureForm}
        handleCloseModifyProcedureForm={handleCloseModifyProcedureForm}
        procedure={state?.procedure}
        setProcedureVersion={setProcedureVersion}
 
      />
    </Box>
  );
}
