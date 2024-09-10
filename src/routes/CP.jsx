import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import {
  CreateNewMarket,
  ProcedureDetails,
  ProceduresListPage,
  AgrementDetails,
  AgrementsListPage,
  Home,
} from "../pages/CP";
import FirstLoginForm from "../pages/FirstLoginForm.jsx";
import Settings from "../pages/Settings.jsx";
import LotTerrassement from "../pages/LotTerrassement.jsx";
import UpdateMarket from "../pages/CP/UpdateMarket.jsx";
// import FicheValidation from '../pages/FicheValidation.jsx'
import FicheDeValidationPage from "../pages/FicheDeValidationPage";
import FicheDeValidationList from "../pages/FicheDeValidation/FicheDeValidationList.jsx";
import FicheDeValidationDetails from "../pages/FicheDeValidation/FicheDeValidationDetails.jsx";

export const CP = [
  {
    layout: "CP",
    pages: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/CreateNewMarket",
        element: <CreateNewMarket />,
      },
      {
        path: "/UpdateMarket",
        element: <UpdateMarket />,
      },
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
        path: "/settings",
        element: <Settings />,
      },
      {
        icon: <AssignmentTurnedInIcon />,
        name: "LOT CHAUSSEE",
        path: "/lot-chaussee",
        element: <></>,
      },
      {
        icon: <DoneAllIcon />,
        name: "LOT OUVRAGE D’ART",
        path: "/lot-ouvrage-d-art",
        element: <></>,
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

export default CP;

