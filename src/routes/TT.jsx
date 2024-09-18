import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Home from "../pages/TT/Home.jsx";
import FirstLoginForm from "../pages/FirstLoginForm.jsx";
import Settings from "../pages/Settings.jsx";
import LotTerrassement from "../pages/LotTerrassement.jsx";
import FicheDeValidationPage from "../pages/FicheDeValidationPage";
import FicheDeValidationList from "../pages/FicheDeValidation/FicheDeValidationList.jsx";
import FicheDeValidationDetails from "../pages/FicheDeValidation/FicheDeValidationDetails.jsx";
import ServiceNotAvailablePage from "../pages/ServiceNotAvailablePage.jsx";

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
        element: <ServiceNotAvailablePage />,
      },
      {
        icon: <DoneAllIcon />,
        name: "LOT OUVRAGE D’ART",
        path: "/LOT OUVRAGE D’ART",
        element: <ServiceNotAvailablePage />,
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

export default TT;
