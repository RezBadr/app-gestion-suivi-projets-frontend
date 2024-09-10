import * as React from "react";
import Box from "@mui/material/Box";
import {
  AgrementHeader,
  AgrementFooter,
  AgrementStatus,
  AgrementList,
  ModifyAgrementForm,
} from "../../features/RQ/agrementDetails";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";


export default function AgrementDetails() {
  const { state } = useLocation();
  const [agrement, setAgrement] = React.useState(null); 
  const [agrementVersion , setAgrementVersion] = React.useState([])
  const [openModifyAgrementForm, setOpenModifyAgrementForm] =
    React.useState(false);
  const handleCloseModifyAgrementForm = () => {
    setOpenModifyAgrementForm(false);
  };
  const handleClickModifyButton = () => {
    setOpenModifyAgrementForm(true);
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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // padding: '10px',
        }}
      >
        <AgrementHeader
          agrementId={agrement?.agrementId}
          title={agrement?.agrementName}
          statusCp={agrement?.statusCp}
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
          <AgrementStatus
            entryDate={agrement?.entryDate}
            statusCp={agrement?.statusCp}
            statusCl={agrement?.statusCl}
            dateCl={agrement?.dateCl}
            dateCp={agrement?.dateCp}
            noteCl={agrement?.noteCl}
            noteCp={agrement?.noteCp}
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
          <AgrementList agrementVersion={agrementVersion} setAgrementVersion={setAgrementVersion} agrementId={agrement?.agrementId} />
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
        <AgrementFooter
          statusCp={agrement?.statusCp}
          statusCl={agrement?.statusCl}
          agrementId={agrement?.agrementId}
          setAgrementVersion={setAgrementVersion}
        />
      </Box>
      <ModifyAgrementForm
        openModifyAgrementForm={openModifyAgrementForm}
        handleCloseModifyAgrementForm={handleCloseModifyAgrementForm}
        agrement={state?.agrement}
        setAgrementVersion={setAgrementVersion}
 
      />
    </Box>
  );
}
