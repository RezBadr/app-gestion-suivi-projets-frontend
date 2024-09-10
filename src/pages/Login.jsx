import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import admLogo from "../assets/images/logo_adm_projet.png";
import { login } from "../services/auth"; // Importer la fonction login
import { saveUserInfo, saveToken } from "../services/tokenService";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        ADM PROJET
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordOrEmailError, setPasswordOrEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Réinitialisation des erreurs
    setEmailError("");
    setPasswordError("");

    // Validation des champs
    if (!email) {
      setEmailError("L'email est requis");
      return;
    }
    if (!password) {
      setPasswordError("Le mot de passe est requis");
      return;
    }

    try {
      // Envoi de la requête au backend
      const response = await login({
        username: email,
        password: password,
      });
      const roles = response.user.roles;

      // Extracting the authority value
      const authority = roles.match(/authority=(\w+)/)[1];
      const userInfo = {
        username: response.user.username,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        authority: authority,
      };
      saveToken(response.jwt);
      saveUserInfo(userInfo);
      switch (userInfo.authority) {
        case "ADMIN":
          navigate("/Admin/home");
          break;
        case "DIRECTEURGENERAL":
          navigate("/DG/home");
          break;
        case "CHEFDEPROJET":
          navigate("/CP/home");
          break;
        case "CHEFDEQUALITE":
          navigate("/RQ/lot-terrassement");
          break;
        case "CHEFDELOT":
          navigate("/CL/lot-terrassement");
          break;
        case "TECHNICIENDETRAVAUX":
          navigate("/TT/home");
          break;
        case "QUALITICIEN":
          navigate("/QU/lot-terrassement");
          break;
        default:
          navigate("/login");
          break;
      }
      window.location.reload();
    } catch (error) {
      setPasswordOrEmailError(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${require("../assets/images/admImage.webp")})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{
            backgroundColor: "rgba(205, 205, 205, 0.3)",
          }}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <img src={admLogo} alt="adm logo" />
            </div>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "#1ea6b2",
                fontSize: "xx-large",
                fontFamily: "Georgia",
              }}
            >
              Se connecter
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {passwordOrEmailError && (
                <Alert severity="error">
                  Adresse e-mail ou mot de passe incorrect
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(emailError)}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset-password" variant="body2">
                    Mot de passe oublié?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
