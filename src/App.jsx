import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CP from "./routes/CP";
import CL from "./routes/CL";
import RQ from "./routes/RQ";
import TT from "./routes/TT";
import QU from "./routes/QU";
import DG from "./routes/DG"

import Dashboard from "./layouts/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import SignInSide from "./pages/Login";
import LandingPage from "./pages/landing-page/LandingPage";
import FirstLoginForm from "./pages/FirstLoginForm";
import { getUserInfo } from "./services/tokenService";
import { useEffect, useState } from "react";
import { isUserInfoMissing } from "./services/updateUserInfo";
import admin from "./routes/admin";
import Loading from './layouts/Loading';
import { ToastContainer} from 'react-toastify';
import Home from "./pages/CP/Home";
function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infoMissing, setInfoMissing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = getUserInfo();

      if (data) {
        setUserInfo({
          username: data.username,
          authority: data.authority,
        });

        const roleBasedRoutes = getRoutesForRole(data.authority);
        setRoutes(roleBasedRoutes);
        console.log("User Info:", data);
        console.log("Role Based Routes:", roleBasedRoutes);

        const missingInfo = await isUserInfoMissing();
        setInfoMissing(missingInfo);
      } else {
        console.log("No user info found in cookies");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const getRoutesForRole = (role) => {
    switch (role) {
      case "ADMIN":
        return admin;
      case "DIRECTEURGENERAL":
        return DG;
      case "CHEFDEPROJET":
        return CP;
      case "CHEFDELOT":
        return CL;
      case "CHEFDEQUALITE":
        return RQ;
      case "TECHNICIENDETRAVAUX":
        return TT;
      case "QUALITICIEN":
        return QU;
      default:
        return [];
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (infoMissing) {
    return (
      <ThemeProvider theme={theme}>
        <FirstLoginForm />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/CP/home" element={ <Home />} />
          {userInfo ? (
            routes.length > 0 ? (
              <Route path="/" element={<Dashboard routes={routes} />}>
                {routes[0]?.pages.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={`${routes[0]?.layout}${path}`}
                    element={element}
                  />
                ))}
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
      <ToastContainer /> 
    </ThemeProvider>
  );
}

export default App;