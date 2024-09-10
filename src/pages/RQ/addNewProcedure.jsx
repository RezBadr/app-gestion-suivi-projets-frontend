import * as React from "react";
import Box from "@mui/material/Box";
import {
  LastVersionsproceduresList,
  AddNewProcedureForm,
  ProcedureHeader,
} from "../../features/RQ/addNewProcedure";
import Divider from "@mui/material/Divider";

export default function AddNewProcedure() {
  const [addProcedureFormOpen, setAddProcedureFormOpen] = React.useState(false);
  const [procedures, setProcedures] = React.useState([]); 
  const handleCloseaddProcedureForm = () => {
    setAddProcedureFormOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ProcedureHeader
        title={"Procédures d’exécution"}
        setAddProcedureFormOpen={setAddProcedureFormOpen}
      />
      <Divider variant="middle" />
      <LastVersionsproceduresList procedures={procedures} setProcedures={setProcedures} />
      <AddNewProcedureForm
        open={addProcedureFormOpen}
        handleClose={handleCloseaddProcedureForm}
        setProcedures={setProcedures} 
      />
    </Box>
  );
}
