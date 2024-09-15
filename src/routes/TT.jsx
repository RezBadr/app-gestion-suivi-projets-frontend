import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import {
  Home,
} from "../pages/CP";
import FirstLoginForm from "../pages/FirstLoginForm.jsx";
import Settings from "../pages/Settings.jsx";
import LotTerrassement from "../pages/LotTerrassement.jsx";
import FicheDeValidationPage from "../pages/FicheDeValidationPage";
import FicheDeValidationList from "../pages/FicheDeValidation/FicheDeValidationList.jsx";
import FicheDeValidationDetails from "../pages/FicheDeValidation/FicheDeValidationDetails.jsx";

export const TT = [
  {
    layout: "TT",
    pages: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableChartIcon />,
        name: "LOT TERRASSEMENT",
        path: "/lot-terrassement",
        element: <LotTerrassement />,
      },

      {
        path: "/settings",
        element: <Settings />,
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
        path: "/LOT OUVRAGE D’ART",
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
      {
        icon: <DoneAllIcon />,
        name: "LOT OUVRAGE D’ART",
        path: "/lot-ouvrage-d-art",
        element: <></>,
      },
    ],
  },
];

export default TT;
