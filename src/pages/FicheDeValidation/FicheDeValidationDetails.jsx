import * as React from "react";
import Box from "@mui/material/Box";
import {
  Header,
  Main,
  Footer,
  ConfirmationDialog,
  NoteDialog,
  FileDialog,
  ModifyFrom,
} from "../../components/FicheDeValidation/Details";
import { useLocation } from "react-router-dom";

export default function ProcedureDetailsForCl() {
  const { state } = useLocation();
  const [ficheDeValidation, setFicheDeValidation] = React.useState(
    state?.ficheDeValidation || {}
  );
  const handleCloseaddForm = () => {
    setAddFormOpen(false);
  };
  const handleClickModify = () => {
    setAddFormOpen(true);
  };
  const [addFormOpen, setAddFormOpen] = React.useState(false);

  const prestation = state?.prestation;

  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);
  const [openFileDialog, setOpenFileDialog] = React.useState(false);
  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };
  const handleClickValidButton = () => {
    console.log("je marche bien");
    setOpenConfirmationDialog(true);
  };
  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };
  const handleClickInfo = () => {
    setOpenFileDialog(true);
  };
  const [openNoteDialog, setOpenNoteDialog] = React.useState(false);
  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
  };
  const handleClickRejectButton = () => {
    setOpenNoteDialog(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderBottom: "1px solid #ddd",
          flex: "0 0 5%",
        }}
      >
        <Header
          prestation={prestation}
          statusCp={ficheDeValidation?.cpStatus}
          handleClickInfo={handleClickInfo}
          handleClickModify={handleClickModify}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          gap: "10px",
          flex: "0 0 70%",
        }}
      >
        <Box
          sx={{
            flex: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Main
            entryDate={ficheDeValidation.entryDate}
            dateCl={ficheDeValidation.clDate}
            dateCp={ficheDeValidation.cpDate}
            statusCp={ficheDeValidation.cpStatus}
            statusCl={ficheDeValidation.clStatus}
            noteCl={ficheDeValidation.clNote}
            noteCp={ficheDeValidation.cpNote}
            dateTt={ficheDeValidation.ttDate}
            statusTt={ficheDeValidation.ttStatus}
            noteTt={ficheDeValidation.ttNote}
            pkStartLeft={ficheDeValidation.pkStartLeft}
            pkEndLeft={ficheDeValidation.pkEndLeft}
            pkStartRight={ficheDeValidation.pkStartRight}
            pkEndRight={ficheDeValidation.pkEndRight}
            Layer={ficheDeValidation.couche}
            TypeOfControl={ficheDeValidation.typeOfControl}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid #ddd",
          flex: "0 0 10%",
        }}
      >
        <Footer
          handleClickValidButton={handleClickValidButton}
          handleClickRejectButton={handleClickRejectButton}
        />
      </Box>
      <NoteDialog
        openNoteDialog={openNoteDialog}
        handleCloseNoteDialog={handleCloseNoteDialog}
        validationFileId={ficheDeValidation?.validationFileId}
        setFicheDeValidation={setFicheDeValidation}
      />
      <ConfirmationDialog
        validationFileId={ficheDeValidation?.validationFileId}
        title={"Valider les fiches de validations"}
        context={"Êtes-vous sûr de valider les fiches de validations ?"}
        openConfirmationDialog={openConfirmationDialog}
        handleCloseConfirmationDialog={handleCloseConfirmationDialog}
        setFicheDeValidation={setFicheDeValidation}
      />
      <FileDialog
        validationFileId={ficheDeValidation?.validationFileId}
        prestation={ficheDeValidation?.prestationName}
        openFileDialog={openFileDialog}
        handleCloseFileDialog={handleCloseFileDialog}
      />
      <ModifyFrom
        open={addFormOpen}
        onClose={handleCloseaddForm}
        prestation={ficheDeValidation?.prestationName}
        validationFileId={ficheDeValidation?.validationFileId}
        ficheDeValidation={ficheDeValidation}
        setFicheDeValidation={setFicheDeValidation}
      />
    </Box>
  );
}
