import * as React from "react";
import Box from "@mui/material/Box";
import { AgrementsList, Header } from "../../features/CL/agrementsList";
import Divider from "@mui/material/Divider";

const AgrementsListPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Header title={"Procédures d’exécution"} />
      <Divider variant="middle" />
      <AgrementsList />
    </Box>
  );
};

export default AgrementsListPage;
