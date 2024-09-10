import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { getPks, getPksByMarket } from "../../../services/FicheDeValidation/Service";
import { getUserRole } from '../../../services/userService';

// Composant pour afficher l'étiquette de valeur du slider
function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const theme = useTheme();

  const normalizedValue = value != null ? Math.round(value) : 0;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={
        <span
          style={{
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.background.default,
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
            padding: '4px 8px'
          }}
        >
          {normalizedValue} pk
        </span>
      }
      arrow
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -10],
            },
          },
        ],
      }}
    >
      {children}
    </Tooltip>
  );
}

// Fonction pour éviter les conflits de marques et d'intervalles
const generateMarksAndIntervals = (data) => {
  const marks = [];
  const intervals = [];

  // Marques fixes de 0 à 10
  const fixedMarks = Array.from({ length: 11 }, (_, i) => ({
    value: i,
    label: i.toString(),
  }));

  data.forEach(({ pkStartLeft, pkEndLeft, pkStartRight, pkEndRight }) => {
    if (pkStartLeft != null && pkEndLeft != null) {
      intervals.push([pkStartLeft, pkEndLeft]); // Left intervals
      marks.push({ value: Math.floor(pkStartLeft), label: Math.floor(pkStartLeft).toString() });
      marks.push({ value: Math.ceil(pkEndLeft), label: Math.ceil(pkEndLeft).toString() });
    }

    if (pkStartRight != null && pkEndRight != null) {
      intervals.push([pkStartRight, pkEndRight]); // Right intervals
      marks.push({ value: Math.floor(pkStartRight), label: Math.floor(pkStartRight).toString() });
      marks.push({ value: Math.ceil(pkEndRight), label: Math.ceil(pkEndRight).toString() });
    }
  });

  // Fusionner les marques fixes et dynamiques
  let allMarks = [...fixedMarks, ...marks];

  // Supprimer les doublons
  allMarks = allMarks.filter((mark, index, self) =>
    index === self.findIndex((m) => m.value === mark.value)
  );

  // Trier les marques pour qu'elles soient dans l'ordre
  allMarks.sort((a, b) => a.value - b.value);

  // Gérer les intervalles qui se chevauchent
  const mergedIntervals = intervals.reduce((acc, [start, end]) => {
    if (acc.length === 0) {
      acc.push([start, end]);
    } else {
      const lastInterval = acc[acc.length - 1];
      if (start <= lastInterval[1]) {
        // Fusionner les intervalles s'ils se chevauchent
        lastInterval[1] = Math.max(lastInterval[1], end);
      } else {
        acc.push([start, end]);
      }
    }
    return acc;
  }, []);

  return { marks: allMarks, intervals: mergedIntervals };
};

// Composant pour le slider de la ruler avec intervalles
function RulerSlider({ intervals, marks }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Ruler Slider"
        value={0} // Static slider since we only care about intervals and marks
        min={0}
        max={10}
        step={1} // Utilisation d'un pas de 1 pour des valeurs entières
        marks={marks}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
        sx={{
          width: "100%",
          "& .MuiSlider-thumb": {
            display: "none",
          },
          "& .MuiSlider-mark": {
            backgroundColor: theme.palette.secondary.main,
            height: isSmallScreen ? "4px" : "6px",
            width: "1px",
          },
          "& .MuiSlider-markLabel": {
            color: theme.palette.text.primary,
            fontSize: theme.typography.caption.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
          },
          "& .MuiSlider-track": {
            height: "3px",
            backgroundColor: "transparent", // No global track color, only intervals will be colored
          },
          "& .MuiSlider-rail": {
            height: "3px",
            backgroundColor: theme.palette.primary.light,
            borderRadius: theme.shape.borderRadius,
          },
        }}
        components={{
          Track: (props) => (
            <>
              {intervals.map(([start, end], index) => (
                <Box
                  key={index}
                  sx={{
                    position: "absolute",
                    height: "3px",
                    backgroundColor: theme.palette.primary.main,
                    left: `${(start / 10) * 100}%`,
                    width: `${((end - start) / 10) * 100}%`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
              ))}
            </>
          ),
        }}
        disabled
      />
    </Box>
  );
}

export default function DualRulerSlider({ prestation, setPkLast, pkLast, marketId }) {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = getUserRole();
        let data;
        if (!(userRole === 'CP' || userRole === 'TT' || userRole === 'DG')) {
          data = await getPks(prestation);
        } else {
          data = await getPksByMarket(marketId, prestation);
        }
        setPkLast(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        setPkLast([]);
      }
    };
    fetchData();
  }, [prestation, marketId, setPkLast]);

  const { marks: leftMarks, intervals: leftIntervals } = generateMarksAndIntervals(
    pkLast.map(({ pkStartLeft, pkEndLeft }) => ({ pkStartLeft, pkEndLeft }))
  );
  const { marks: rightMarks, intervals: rightIntervals } = generateMarksAndIntervals(
    pkLast.map(({ pkStartRight, pkEndRight }) => ({ pkStartRight, pkEndRight }))
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", paddingBottom: "15px", width: "100%", gap: '10px' }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", marginBottom: '10px' }}>
        <Typography sx={{ flex: "0 0 12%", whiteSpace: "nowrap", textAlign: "center" }}>
          PK G:
        </Typography>
        <Box sx={{ flex: "0 0 80%", height: "30px" }}>
          <RulerSlider intervals={leftIntervals} marks={leftMarks} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography sx={{ flex: "0 0 12%", whiteSpace: "nowrap", textAlign: "center" }}>
          PK D :
        </Typography>
        <Box sx={{ flex: "0 0 80%", height: "30px", width: "100%" }}>
          <RulerSlider intervals={rightIntervals} marks={rightMarks} />
        </Box>
      </Box>
    </Box>
  );
}
