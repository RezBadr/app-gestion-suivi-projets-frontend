import * as React from "react";
import Box from "@mui/material/Box";
import { Header, List, AddFrom ,Ruler,Graph} from "../../components/FicheDeValidation/List";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import {
  getValidationFileWithPrestation,
  getValidationFileWithMarketAndPrestation,
} from "../../services/FicheDeValidation/Service";
import { common } from "@mui/material/colors";
import { getUserRole } from "../../services/userService";

export default function FicheDeValidationList() {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const location = useLocation();
  const [prestation,setPrestation] = React.useState(location.state);
  const [fiches, setFiches] = React.useState([]);
  const [pkLast, setPkLast] = React.useState([0, 0]); 
  const [openGraph ,setOpenGraph] = React.useState(false);
  const handleClickGraph = () =>{
    setOpenGraph(true);
  }
  const handleCloseGraph = () =>{
    setOpenGraph(false)
    

  }


  React.useEffect(() => {
    const fetchFiches = async () => {
      try {
        if (
          getUserRole() === "CL" ||
          getUserRole() === "QU" ||
          getUserRole() === "RQ"
        ) {
           const data = await getValidationFileWithPrestation(prestation?.label);
          setFiches(data);
        } else {
          const data = await getValidationFileWithMarketAndPrestation(
            localStorage.getItem('marketId'),
            prestation?.label
          );
          console.log("ana rani hna",location?.marketId);
          setFiches(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiches();
  }, []);
  const handleCloseaddForm = () => {
    setAddFormOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Header title={prestation?.name} setAddFormOpen={setAddFormOpen}  handleClickGraph={handleClickGraph}/>
      <Ruler prestation={prestation?.label} pkLast={pkLast} setPkLast={setPkLast} marketId={localStorage.getItem('marketId')}/>
      <Divider variant="middle" />
      <List fiches={fiches} prestation={prestation?.name}  />
      <AddFrom
        open={addFormOpen}
        onClose={handleCloseaddForm}
        prestation={prestation.label}
        setFiches={setFiches}
        setPkLast={setPkLast}
      />
      <Graph open={openGraph} marketId={localStorage.getItem('marketId')} onClose={handleCloseGraph} prestation={prestation?.label} prestationName={prestation?.name}/>
    </Box>
  );
}
