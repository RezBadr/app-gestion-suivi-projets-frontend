import * as React from "react";
import Box from "@mui/material/Box";
import { ProceduresList, Header } from "../../features/CL/proceduresList";
import Divider from "@mui/material/Divider";

const ProceduresListPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Header title={"Procédures d’exécution"} />
      <Divider variant="middle" />
      <ProceduresList />
    </Box>
  );
};

export default ProceduresListPage;
