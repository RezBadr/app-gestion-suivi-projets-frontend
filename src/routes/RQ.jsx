import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { ProceduresListPage, ProcedureDetails, AgrementsListPage, AgrementDetails } from "../pages/RQ";
import FicheDeValidationPage from "../pages/FicheDeValidationPage.jsx";
import FicheDeValidationList from "../pages/FicheDeValidation/FicheDeValidationList.jsx";
import FicheDeValidationDetails from '../pages/FicheDeValidation/FicheDeValidationDetails.jsx'
import {} from "../pages/RQ";

import LotTerrassement from "../pages/LotTerrassement.jsx";
import Settings from "../pages/Settings.jsx";

export const RQ = [
  {
    layout: "RQ",
    pages: [
      {
        icon: <TableChartIcon />,
        name: "LOT TERRASSEMENT",
        path: "/lot-terrassement",
        element: <LotTerrassement />,
      },
      {
        path: "/ProceduresListPage",
        element: <ProceduresListPage />,
      },
      {
        path: "/procedureDetails",
        element: <ProcedureDetails />,
      },
      {
        path: "/AgrementsListPage",
        element: <AgrementsListPage />,
      },
      {
        path: "/agrementDetails",
        element: <AgrementDetails />,
      },
      {
        icon: <AssignmentTurnedInIcon />,
        name: "LOT CHAUSSEE",
        path: "/LOT CHAUSSEE",
        element: <></>,
      },
      {
        icon: <DoneAllIcon />,
        name: "LOT OUVRAGE D’ART",
        path: "/lot-ouvrage-d-art",
        element: <></>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/FicheDeValidationPage",
        element: <FicheDeValidationPage />,
      },
      {
        path: "/FicheDeValidationDetails",
        element: <FicheDeValidationDetails />,
      },
      {
        path: "/FicheDeValidationList",
        element: <FicheDeValidationList />,
      },
    ],
  },
];

export default RQ;
