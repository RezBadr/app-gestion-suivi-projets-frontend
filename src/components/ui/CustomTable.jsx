import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';  
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';   
import { ProcRows } from '../../data/MockData';


export default function CustomTable() {
  const columns = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'export',
      headerName: 'Export',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleExport(params.row.fileId)}>Export</Button>
      ),
    },
    {
      field: 'remarque',
      headerName: 'Remarque',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleOpenRq(params.row)}>Voir</Button>
      ),
    },
    {
      field: 'versions',
      headerName: 'Versions',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleOpenVersions(params.row)}>Versions</Button>
      ),
    },
  ];

  function handleExport(fileId) {
    // Implement your export logic here, e.g., fetching the file, creating a download link
    console.log('Exporting file:', fileId);
  }

  const [openRq, setOpenRq] = React.useState(false);
  const [openVersions, setOpenVersions] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleOpenRq = (row) => {
    setOpenRq(true);
    setSelectedRow(row);
  };

  const handleOpenVersions = (row) => {
    setOpenVersions(true);
    setSelectedRow(row);
  };

  const handleCloseRq = () => {
    setOpenRq(false);
  };

  const handleCloseVersions = () => {
    setOpenVersions(false);
  };

  const versionColumns = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'export',
      headerName: 'Export',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleExport(params.row.fileId)}>Exporter</Button>
      ),
    },
    {
      field: 'remarque',
      headerName: 'Remarque',
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleOpenRq(params.row)}>Voir</Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={ProcRows} columns={columns} slots={{ toolbar: GridToolbar }} />
      <Dialog open={openRq} onClose={handleCloseRq} fullWidth>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent>
          {/* Display remarques about the selected row here */}
          {selectedRow && (
            <div>
              <p>Nom: {selectedRow.name}</p>
              <p>Remarque: {selectedRow.remarque}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRq}>Fermer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openVersions} onClose={handleCloseVersions} maxWidth="md" fullWidth>
        <DialogTitle>Versions</DialogTitle>
        <DialogContent>
          {/* Display another DataGrid with the same structure minus the "Versions" column */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={ProcRows} columns={versionColumns} slots={{ toolbar: GridToolbar }} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVersions}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
