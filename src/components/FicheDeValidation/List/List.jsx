import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../../services/userService";
export default function List({ fiches, prestation }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const columns = [
    {
      field: "pkLeft",
      headerName: "pk Gauche",
      flex: 0.2,
      filterable: false,
      renderCell: (params) => {
        const { pkStartLeft, pkEndLeft } = params.row;
        return pkStartLeft != null && pkEndLeft != null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIosIcon style={{ marginRight: 8 }} />
            du {pkStartLeft} au {pkEndLeft}
          </div>
        ) : null;
      },
    },
    {
      field: "pkRight",
      headerName: "pk Droite",
      flex: 0.2,
      filterable: false,
      renderCell: (params) => {
        const { pkStartRight, pkEndRight } = params.row;
        return pkStartRight != null && pkEndRight != null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            du {pkStartRight} au {pkEndRight}
            <ArrowForwardIosIcon style={{ marginLeft: 8 }} />
          </div>
        ) : null;
      },
    },
    {
      field: "entryDate",
      headerName: "Date",
      flex: 0.2,
      filterable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "couche",
      headerName: "N couche",
      flex: 0.2,
      filterable: false,
    },
    {
      field: "typeOfControl",
      headerName: "Type de Controle",
      flex: 0.2,
      filterable: false,
    },
  ];
  
  if (getUserRole === "DG") {
    columns.push(
      {
        field: "statusCp",
        headerName: "Chef de projet",
        flex: 0.2,
        filterable: false,
        renderCell: (params) => {
          const status = params.row.cpStatus;
          let childProps = {};
  
          switch (status) {
            case true:
              childProps = {
                label: "Validé",
                color: "success",
                icon: <CheckCircleOutlineOutlinedIcon />,
              };
              break;
            case null:
              childProps = {
                label: "En attente",
                color: "warning",
                icon: <PendingOutlinedIcon />,
              };
              break;
            case false:
              childProps = {
                label: "Rejeté",
                color: "error",
                icon: <ReportProblemOutlinedIcon />,
              };
              break;
          }
  
          return <Chip {...childProps} variant="outlined" />;
        },
      },
      {
        field: "statusCl",
        headerName: "Chef de lot",
        flex: 0.2,
        filterable: false,
        renderCell: (params) => {
          const status = params.row.clStatus;
          let childProps = {};
  
          switch (status) {
            case true:
              childProps = {
                label: "Validé",
                color: "success",
                icon: <CheckCircleOutlineOutlinedIcon />,
              };
              break;
            case null:
              childProps = {
                label: "En attente",
                color: "warning",
                icon: <PendingOutlinedIcon />,
              };
              break;
            case false:
              childProps = {
                label: "Rejeté",
                color: "error",
                icon: <ReportProblemOutlinedIcon />,
              };
              break;
          }
  
          return <Chip {...childProps} variant="outlined" />;
        },
      },
      {
        field: "statusTt",
        headerName: "Technicien",
        flex: 0.2,
        filterable: false,
        renderCell: (params) => {
          const status = params.row.ttStatus;
          let childProps = {};
  
          switch (status) {
            case true:
              childProps = {
                label: "Validé",
                color: "success",
                icon: <CheckCircleOutlineOutlinedIcon />,
              };
              break;
            case null:
              childProps = {
                label: "En attente",
                color: "warning",
                icon: <PendingOutlinedIcon />,
              };
              break;
            case false:
              childProps = {
                label: "Rejeté",
                color: "error",
                icon: <ReportProblemOutlinedIcon />,
              };
              break;
          }
  
          return <Chip {...childProps} variant="outlined" />;
        },
      }
    );
  } else {
    columns.push({
      field: "statusCp",
      headerName: "Status",
      flex: 0.2,
      filterable: false,
      renderCell: (params) => {
        const status = params.row.cpStatus;
        let childProps = {};
  
        switch (status) {
          case true:
            childProps = {
              label: "Validé",
              color: "success",
              icon: <CheckCircleOutlineOutlinedIcon />,
            };
            break;
          case null:
            childProps = {
              label: "En attente",
              color: "warning",
              icon: <PendingOutlinedIcon />,
            };
            break;
          case false:
            childProps = {
              label: "Rejeté",
              color: "error",
              icon: <ReportProblemOutlinedIcon />,
            };
            break;
        }
  
        return <Chip {...childProps} variant="outlined" />;
      },
    });
  }
  




 



  return (
    <Box sx={{ border: "none", height: 317, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={fiches}
        columns={columns}
        pageSize={20}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        disableColumnResize={true}
        getRowId={(row) => row.validationFileId}
        hideFooter
        onRowClick={(rowData) => {
          navigate(`/${getUserRole()}/FicheDeValidationDetails`, {
            state: { ficheDeValidation: rowData.row, prestation: prestation },
          });
        }}
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
