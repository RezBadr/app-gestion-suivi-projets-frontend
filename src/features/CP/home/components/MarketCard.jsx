import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MarketCard = ({
  title,
  number,
  company,
  onConsult,
  onSettings,
}) => {
  return (
    <Card
      sx={{
        position: "relative", // Allow absolute positioning of child elements
        height: "100%",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#333", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#666", marginBottom: "0.5rem" }}
        >
          Numéro : {number}
        </Typography>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Entreprise : {company}
        </Typography>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={onConsult} // Utilisation correcte d'une fonction anonyme
            sx={{
              backgroundColor: "#137C8B",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#105f71",
              },
            }}
          >
            Consulter
          </Button>

          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={onSettings}
            sx={{
              borderColor: "#137C8B",
              color: "#137C8B",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "#105f71",
                color: "#105f71",
              },
            }}
          >
            Paramètres
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
