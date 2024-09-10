import * as React from "react";
import Box from "@mui/material/Box";
import {
  LastVersionsagrementsList,
  AddNewAgrementForm,
  AgrementHeader,
} from "../../features/RQ/addNewAgrement";
import Divider from "@mui/material/Divider";

export default function AddNewAgrement() {
  const [addAgrementFormOpen, setAddAgrementFormOpen] = React.useState(false);
  const [agrements, setAgrements] = React.useState([]); 
  const handleCloseaddAgrementForm = () => {
    setAddAgrementFormOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <AgrementHeader
        title={"Agrement"}
        setAddAgrementFormOpen={setAddAgrementFormOpen}
      />
      <Divider variant="middle" />
      <LastVersionsagrementsList agrements={agrements} setAgrements={setAgrements} />
      <AddNewAgrementForm
        open={addAgrementFormOpen}
        handleClose={handleCloseaddAgrementForm}
        setAgrements={setAgrements} 
      />
    </Box>
  );
}
