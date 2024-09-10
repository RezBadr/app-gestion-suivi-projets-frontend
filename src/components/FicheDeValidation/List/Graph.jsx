import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MockData } from "../../../data/MockData";
import { getUserRole } from "../../../services/userService";
import {
  uploadGraphe,
  fetchGraphe,
} from "../../../services/FicheDeValidation/Service";
import CheckIcon from '@mui/icons-material/Check'; // Assurez-vous d'importer l'icône



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PrestationDialog = ({
  open,
  onClose,
  prestation,
  prestationName,
  marketId,
}) => {
  const [graphData, setGraphData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [newData, setNewData] = useState({});
  const [showSubmit, setShowSubmit] = useState({});
  const [previousData, setPreviousData] = useState([]);

  const handleAddNewData = (index) => {
    setPreviousData((prev) => [...prev, ...(newData[index] || [])]);
    handleAddData(index);
  };
  // Filtrer les éléments qui contiennent la clé 'G'
  const graphItems = (MockData[prestation] || []).filter((item) => item.G);

  // Déplacer la déclaration de la fonction ici
  const fetchGraphDataForItem = async (itemG, index) => {
    if (!itemG) return;

    try {
      setLoading((prev) => ({ ...prev, [index]: true }));
      const data = await fetchGraphe(marketId, prestation, itemG);

      // Transformez les données pour Chart.js
      const transformData = (data) => {
        if (!data) return { labels: [], values: [] };
        const labels = data.map((item) => item.x);
        const values = data.map((item) => item.y);
        return { labels, values };
      };

      const { labels, values } = transformData(data);

      setGraphData((prev) => ({
        ...prev,
        [index]: { labels, values },
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        [index]: "Erreur lors de la récupération des données.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    graphItems.forEach((item, index) => {
      if (!graphData[index] && !loading[index] && !error[index] && isMounted) {
        fetchGraphDataForItem(item.G, index);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [marketId, prestation, graphItems, graphData, loading, error]);

  const handleNewDataChange = (index, dataIndex, key, value) => {
    setNewData((prev) => ({
      ...prev,
      [index]: (prev[index] || []).map((item, i) =>
        i === dataIndex ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleAddData = (index) => {
    setNewData((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), { id: Date.now(), X: "", Y: "" }],
    }));
    setShowSubmit((prev) => ({ ...prev, [index]: true }));
  };

  const handleRemoveData = (index, dataIndex) => {
    setNewData((prev) => ({
      ...prev,
      [index]: (prev[index] || []).filter((_, i) => i !== dataIndex),
    }));
  };

  const handleSubmit = async (index, itemG) => {
    const dataForIndex = newData[index] || [];

    const formattedData = dataForIndex
    .filter(({ X, Y }) => X && Y) 
    .map(({ X, Y }) => ({ x: parseFloat(X), y: parseFloat(Y) }));

    if (formattedData.length > 0) {
      try {
        await uploadGraphe(prestation, itemG, formattedData);
        console.log("Graph data uploaded successfully");
        setNewData((prev) => ({ ...prev, [index]: [] }));
        setShowSubmit((prev) => ({ ...prev, [index]: false }));
      } catch (error) {
        console.error(
          "Error uploading graph data:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error(
        "Veuillez remplir les champs X et Y pour soumettre les données."
      );
    }
  };

  const userRole = getUserRole();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle
        sx={{
          textAlign: "center",
          position: "relative",
          backgroundColor: "#f5f5f5",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {prestationName}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#555",
            "&:hover": {
              color: "#ff5722",
              transform: "scale(1.1)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {(userRole === "CP" || userRole === "DG") && (
            <>
              {graphItems.length > 0 ? (
                <Box>
                  {graphItems.map((item, index) => (
                    <Box
                      key={index} // Ajout de la clé
                      sx={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "400px",
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: 2,
                        overflow: "hidden",
                        mb: 4,
                      }}
                    >
                      {loading[index] ? (
                        <Typography
                          variant="body1"
                          sx={{ textAlign: "center" }}
                        >
                          Chargement...
                        </Typography>
                      ) : error[index] ? (
                        <Typography
                          variant="body1"
                          sx={{ color: "#f00", textAlign: "center" }}
                        >
                          {error[index]}
                        </Typography>
                      ) : (
                        <Line
                          data={{
                            labels: graphData?.[index]?.labels || [],
                            datasets: [
                              {
                                label: item.FV || "Données",
                                data: graphData?.[index]?.values || [],
                                borderColor: "rgba(75, 192, 192, 1)",
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                borderWidth: 2,
                                fill: true,
                              },
                            ],
                          }}
                          options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            scales: {
                              y: {
                                beginAtZero: true, // Ajout d'une option pour la mise à l'échelle de l'axe Y
                              },
                            },
                          }}
                          height={400}
                          width={600}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#757575",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Aucune donnée de graphique disponible pour cette prestation.
                </Typography>
              )}
            </>
          )}

          {(userRole === "RQ" || userRole === "QU") && (
            <Box sx={{ padding: 2 }}>
              {graphItems.map((item, index) => (
                <Box key={item.G} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      p: 2,
                      position: "relative",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {item.FV}
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleAddData(index)}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          p: 0.5,
                          "&:hover": {
                            backgroundColor: "transparent", // Remove background on hover
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Typography>

                    {newData[index] &&
                      newData[index].map((data, dataIndex) => (
                        <Box
                          key={data.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            p: 1,
                          }}
                        >
                          <TextField
                            label="Pk"
                            value={data.X || ""}
                            onChange={(e) =>
                              handleNewDataChange(
                                index,
                                dataIndex,
                                "X",
                                e.target.value
                              )
                            }
                            size="small"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                              },
                            }}
                          />
                          <TextField
                            label="Valeur"
                            value={data.Y || ""}
                            onChange={(e) =>
                              handleNewDataChange(
                                index,
                                dataIndex,
                                "Y",
                                e.target.value
                              )
                            }
                            size="small"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                              },
                            }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveData(index, dataIndex)}
                            sx={{
                              p: 0.5,
                              "& .MuiSvgIcon-root": { fontSize: 20 },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}

                    {newData[index] && newData[index].length > 0 && (
                      <IconButton
                        color="primary"
                        onClick={() => handleSubmit(index, item.G)}
                        sx={{
                          mt: 2,
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "transparent", // Remove background on hover
                          },
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 24 }} />{" "}
                        {/* Using a check icon */}
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrestationDialog;
