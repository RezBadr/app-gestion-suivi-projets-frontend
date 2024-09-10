import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TerrainIcon from "@mui/icons-material/Terrain";
import LayersIcon from "@mui/icons-material/Layers";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TerrainRoundedIcon from "@mui/icons-material/TerrainRounded";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserRole } from "../services/userService";

const FicheDeValidation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [marketId,setMarketId] = React.useState(location.state?.marketId ? location.state?.marketId : localStorage.getItem('marketId')); 

  const items = [
    {
      label: "DegagementDesEmprises",
      name: "Dégagement des emprises",
      icon: (
        <LayersClearIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "Decapage",
      name: "Décapage",
      icon: (
        <LandscapeIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "RemblaiCourantEtSubstitutionDePurge",
      name: "Remblai courant et substitution de purge",
      icon: (
        <TerrainIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "CoucheDeForme",
      name: "Couche de forme",
      icon: (
        <LayersIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "Deblai",
      name: "Déblai",
      icon: (
        <TerrainRoundedIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "RemblaiPST",
      name: "Remblai PST",
      icon: (
        <AltRouteIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "Purge",
      name: "Purge",
      icon: (
        <ConstructionIcon
          sx={{ fontSize: "70px", color: theme.palette.primary.main }}
        />
      ),
    },
    
  ];

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "90%",
        textAlign: "center",
        marginTop: "40px",
        gap: "5px",
        marginLeft: "40px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "40px", fontWeight: "bold" }}
      >
        préstations
      </Typography>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "50px",
          width: "100%",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                border: `1px solid ${theme.palette.primary.dark}`,
                color: theme.palette.primary.dark,
              },
              width: "200px",
              textAlign: "center",
            }}
            onClick={() => {
              console.log("herher",marketId)
              navigate(`${getUserRole()}/FicheDeValidationList`, {
                state: { name: item.name, label: item.label , marketId : marketId },
              });
            }}
          >
            {item.icon}
            <Typography variant="h6">{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FicheDeValidation;
