import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { useTheme } from "@mui/material/styles";
import { fetchLastVersionsProcedure } from "../services";
import { useNavigate } from "react-router-dom";
import {formatDateFromTimestamp} from '../../../../utils/dateUtils'
import { downloadFile } from "../services";
export default function LastVersionsproceduresList({procedures, setProcedures}) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLastVersionsProcedure();
        setProcedures(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();

  const columns = [
    {
      field: "procedureName",
      headerName: "Nom de Procédure",
      flex: 0.2,
      sortable: false,
      filterable: false,
    },
    {
      field: "entryDate",
      headerName: "Date",
      flex: 0.2,
      filterable: false,
      renderCell: (params)=>{
        return <>{formatDateFromTimestamp(params.row.entryDate)}</>
      }
    },
    {
      field: "statusCp",
      headerName: "Status",
      type: "text",
      renderCell: (params) => {
        const status = params.row.statusCp;
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
          default:
        }

        return <Chip {...childProps} variant="outlined" />;
      },
      flex: 0.2,
      filterable: false,
    },
    {
      field: "Download",
      headerName: "Télécharger",
      renderCell: (params) => (
        <div>
          <IconButton color="info" onClick={(event)=>{event.stopPropagation(); downloadFile(params.row.procedureId)}}>
            <DownloadRoundedIcon />
          </IconButton>
        </div>
      ),
      flex: 0.1,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <>
      <Box
        sx={{ border: "none", height: 369, width: "100%", marginTop: "20px" }}
      >
        <DataGrid
          rows={procedures}
          columns={columns}
          pageSize={20}
          pageSizeOptions={[20]}
          disableRowSelectionOnClick
          disableColumnResize={true}
          getRowId={(row) => row.procedureId}
          hideFooter
          onRowClick={(rowData)=>{navigate('/RQ/procedureDetails',{state :{procedure:rowData.row }})}}
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
    </>
  );
}
