import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryIcon from '@mui/icons-material/History';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import {AgrementDetails, AgrementsListPage, ProcedureDetails ,ProceduresListPage} from '../pages/CL' 
import LotTerrassement from '../pages/LotTerrassement.jsx'
import Settings from '../pages/Settings.jsx'
import FicheDeValidationPage from "../pages/FicheDeValidationPage.jsx";
import FicheDeValidationList from "../pages/FicheDeValidation/FicheDeValidationList.jsx";
import FicheDeValidationDetails from '../pages/FicheDeValidation/FicheDeValidationDetails.jsx'


export const CL = [
  {
    layout: "CL",
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
        element: <AgrementsListPage/>,
      },
      {
        path: "/agrementDetails",
        element: <AgrementDetails />,
      },
      {
        path : "/settings",
        element : <Settings/>

      },
      {
        icon: <AssignmentTurnedInIcon />,
        name: "LOT CHAUSSEE",
        path: "/LOT CHAUSSEE",
        element: <></>,
      },
      {
        path: "/ficheDeValidation",
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

export default CL;
