import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MarketCard } from "../../features/CP/home";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { getCurrentMarkets } from "../../features/DG/home/service";
import { useState } from "react";
import { getUserRole } from "../../services/userService";

export default function Home() {
  const theme = useTheme();
  const [markets, setMarkets] = useState([]);

  React.useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const data = await getCurrentMarkets();
        setMarkets(data);
        console.log(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des marchés", err);
      }
    };

    fetchMarkets();
  }, []);
  const navigate = useNavigate();
  const handleConsult = (marketId, marketName) => {
    localStorage.setItem("market", marketName);
    localStorage.setItem("marketId", marketId);
    navigate(`/${getUserRole()}/lot-terrassement`, {
      state: { marketId: marketId },
    });
  };

  const handleSettings = (marketId) => {
    navigate(`/${getUserRole()}/UpdateMarket`, { state: { marketId } });
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#333",
          textAlign: "center",
          marginBottom: 4,
          fontWeight: 700,
        }}
      >
        Les Marchés Actuelles
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
        {markets.map((market, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MarketCard
              title={market.marketName}
              number={market.marketNumber}
              company={market.companyName}
              onConsult={() =>
                handleConsult(market.marketId, market.marketName)
              }
              onSettings={() => handleSettings(market.marketId)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Carte pour ajouter un nouveau marché */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
      </Box>
    </Box>
  );
}
