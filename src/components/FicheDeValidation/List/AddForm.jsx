import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  createValidation,
  // getLastPk,
} from "../../../services/FicheDeValidation/Service";
import { MockData } from "../../../data/MockData";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const KmFieldsComponent = ({
  kmStart,
  setKmStart,
  kmEnd,
  setKmEnd,
  isEnabled,
  setIsEnabled,
  errors,
  label,
}) => (
  <Grid item xs={12} sm={6}>
    <FormControlLabel
      control={
        <Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />
      }
      label={label}
    />
    {isEnabled && (
      <Box>
        <TextField
          fullWidth
          label={`${label} Début`}
          type="number"
          value={kmStart}
          onChange={(e) => setKmStart(e.target.value)}
          error={errors}
          helperText={errors ? "Valeur incorrecte" : ""}
          margin="normal"
        />
        <TextField
          fullWidth
          label={`${label} Fin`}
          type="number"
          value={kmEnd}
          onChange={(e) => setKmEnd(e.target.value)}
          error={errors}
          helperText={errors ? "Valeur incorrecte" : ""}
          margin="normal"
        />
      </Box>
    )}
  </Grid>
);

const FileUploadList = ({ prestation, MockData, errors, handleFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChangeInternal = (event, fileLabel, fileType, key) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        [key]: file.name, // Stocker le nom du fichier sélectionné
      }));
    }
    handleFileChange(event, fileLabel, fileType);
  };

  const handleModifyClick = (fileLabel, key) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFiles((prevFiles) => ({
          ...prevFiles,
          [key]: file.name, // Mettre à jour le fichier sélectionné
        }));
        handleFileChange(
          event,
          fileLabel,
          key.includes("FV") ? "filesWithClassement" : "PvFilesWithClassement"
        );
      }
    };
    input.click();
  };

  const getFileFields = () => {
    if (!prestation) return [];
    const data = MockData[prestation];

    if (Array.isArray(data)) {
      return data.flatMap((item, idx) => {
        const fvKey = `FV-${idx}`; // Clé unique pour FV
        const pvKey = `PV-${idx}`; // Clé unique pour PV

        return [
          <ListItem key={fvKey}>
            <ListItemText
              primary={item.FV}
              secondary={
                selectedFiles[fvKey] ? (
                  <>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="h6">
                        {`Fichier sélectionné : ${selectedFiles[fvKey]}`}
                      </Typography>
                      <DoneIcon color="success" />
                      <Button onClick={() => handleModifyClick(item.FV, fvKey)}>
                        Modifier
                      </Button>
                    </Stack>
                  </>
                ) : null
              }
            />

            {!selectedFiles[fvKey] && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={
                  errors.includes(`Fichiers manquants pour ${item.FV}`)
                    ? "error"
                    : "primary"
                }
              >
                Importer
                <input
                  type="file"
                  name={`FV-${idx}`}
                  hidden
                  onChange={(event) =>
                    handleFileChangeInternal(
                      event,
                      `${item.FV}`,
                      "filesWithClassement",
                      fvKey
                    )
                  }
                />
              </Button>
            )}
          </ListItem>,
          <ListItem key={pvKey}>
            <ListItemText
              primary={item.PV}
              secondary={
                selectedFiles[pvKey] ? (
                  <>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="h6">
                        {`Fichier sélectionné : ${selectedFiles[pvKey]}`}
                      </Typography>
                      <DoneIcon color="success" />
                      <Button onClick={() => handleModifyClick(item.PV, pvKey)}>
                        Modifier
                      </Button>
                    </Stack>
                  </>
                ) : null
              }
            />
            {!selectedFiles[pvKey] && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={
                  errors.includes(`Fichiers manquants pour ${item.PV}`)
                    ? "error"
                    : "primary"
                }
              >
                Importer
                <input
                  type="file"
                  name={`PV-${idx}`}
                  hidden
                  onChange={(event) =>
                    handleFileChangeInternal(
                      event,
                      `${item.PV}`,
                      "PvFilesWithClassement",
                      pvKey
                    )
                  }
                />
              </Button>
            )}
          </ListItem>,
        ];
      });
    }

    if (data) {
      const fvKey = "FV"; // Clé unique pour FV
      const pvKey = "PV"; // Clé unique pour PV

      const files = [data.FV, data.PV];
      return files.map((fileLabel, index) => {
        const key = index === 0 ? fvKey : pvKey;

        return (
          <ListItem key={key}>
            <ListItemText
              primary={fileLabel}
              secondary={
                selectedFiles[key]
                  ? `Fichier sélectionné : ${selectedFiles[key]}`
                  : null
              }
            />
            {selectedFiles[key] ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <DoneIcon color="success" />
                <Button onClick={() => handleModifyClick(fileLabel, key)}>
                  Modifier
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                color={
                  errors.includes(`Fichiers manquants pour ${fileLabel}`)
                    ? "error"
                    : "primary"
                }
              >
                Importer
                <input
                  type="file"
                  name={key}
                  hidden
                  onChange={(event) =>
                    handleFileChangeInternal(
                      event,
                      `${fileLabel}`,
                      index === 0
                        ? "filesWithClassement"
                        : "PvFilesWithClassement",
                      key
                    )
                  }
                />
              </Button>
            )}
          </ListItem>
        );
      });
    }

    return [];
  };

  return <List>{getFileFields()}</List>;
};

const FileUploadDialog = ({
  open,
  onClose,
  prestation,
  setFiches,
  setPkLast,
}) => {
  const [kmStartGauche, setKmStartGauche] = useState("");
  const [kmEndGauche, setKmEndGauche] = useState("");
  const [kmStartDroit, setKmStartDroit] = useState("");
  const [kmEndDroit, setKmEndDroit] = useState("");
  const [nCouches, setNCouches] = useState("");
  const [filesWithClassement, setFilesWithClassement] = useState(new Map());
  const [PvFilesWithClassement, setPvFilesWithClassement] = useState(new Map());
  const [isKmGaucheEnabled, setIsKmGaucheEnabled] = useState(true);
  const [isKmDroitEnabled, setIsKmDroitEnabled] = useState(false);
  const [errors, setErrors] = useState({
    nCouches: false,
    kmGauche: false,
    kmDroit: false,
    fileErrors: [],
    pkObligatoryError: false,
  });

  const handleFileChange = (event, name, fileType) => {
    const file = event.target.files[0];
    if (fileType === "filesWithClassement") {
      setFilesWithClassement((prev) => new Map(prev).set(name, file));
    } else if (fileType === "PvFilesWithClassement") {
      setPvFilesWithClassement((prev) => new Map(prev).set(name, file));
    }
  };

  const validateFields = () => {
    const newErrors = {
      nCouches: nCouches && (isNaN(nCouches) || nCouches <= 0),
      kmGauche:
        isKmGaucheEnabled &&
        (isNaN(kmStartGauche) ||
          isNaN(kmEndGauche) ||
          Number(kmStartGauche) >= Number(kmEndGauche)),
      kmDroit:
        isKmDroitEnabled &&
        (isNaN(kmStartDroit) ||
          isNaN(kmEndDroit) ||
          Number(kmStartDroit) >= Number(kmEndDroit)),
      fileErrors: [],
      pkObligatoryError: !isKmGaucheEnabled && !isKmDroitEnabled,
    };

    // // Vérifier si tous les fichiers nécessaires sont présents
    // const filesMissing = [];
    // if (!filesWithClassement.size) {
    //   filesMissing.push("Fichiers manquants pour la validation de classement");
    // }
    // if (!PvFilesWithClassement.size) {
    //   filesMissing.push("Fichiers manquants pour la validation des PV");
    // }

    // newErrors.fileErrors = filesMissing;

    setErrors(newErrors);

    // Retourner false si n'importe quel champ est invalide
    return !Object.values(newErrors).some((error) =>
      Array.isArray(error) ? error.length > 0 : error
    );
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        const payload = {
          prestationName: prestation,
          typeOfControl: true,
          couche: parseInt(nCouches),
          pkStartLeft: isKmGaucheEnabled ? Number(kmStartGauche) : null,
          pkEndLeft: isKmGaucheEnabled ? Number(kmEndGauche) : null,
          pkStartRight: isKmDroitEnabled ? Number(kmStartDroit) : null,
          pkEndRight: isKmDroitEnabled ? Number(kmEndDroit) : null,
        };

        // Vérifiez si les fichiers sont bien présents avant l'envoi
        if (!filesWithClassement.size || !PvFilesWithClassement.size) {
          setErrors((prev) => ({
            ...prev,
            fileErrors: ["Tous les fichiers doivent être sélectionnés"],
          }));
          return; // Arrêter si les fichiers sont manquants
        }

        const fiche = await createValidation(
          payload,
          filesWithClassement,
          PvFilesWithClassement
        );

        setFiches((prev) => [...prev, fiche]);
        // const data = await getLastPk(prestation);
        // setPkLast(data.length >= 2 ? data : [0, 0]);

        onClose(); // Fermer le dialogue seulement si tout est réussi
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Importation de données</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mb={2}>
          <KmFieldsComponent
            kmStart={kmStartGauche}
            setKmStart={setKmStartGauche}
            kmEnd={kmEndGauche}
            setKmEnd={setKmEndGauche}
            isEnabled={isKmGaucheEnabled}
            setIsEnabled={setIsKmGaucheEnabled}
            errors={errors.kmGauche}
            label="PK Gauche"
          />
          <KmFieldsComponent
            kmStart={kmStartDroit}
            setKmStart={setKmStartDroit}
            kmEnd={kmEndDroit}
            setKmEnd={setKmEndDroit}
            isEnabled={isKmDroitEnabled}
            setIsEnabled={setIsKmDroitEnabled}
            errors={errors.kmDroit}
            label="PK Droit"
          />
          {errors.pkObligatoryError && (
            <Typography color="error">
              Vous devez renseigner au moins un PK.
            </Typography>
          )}
        </Grid>
        <TextField
          fullWidth
          label="Nombre de couches"
          type="number"
          value={nCouches}
          onChange={(e) => setNCouches(e.target.value)}
          error={errors.nCouches}
          helperText={errors.nCouches ? "Valeur incorrecte" : ""}
          margin="normal"
        />
        <FileUploadList
          prestation={prestation}
          MockData={MockData}
          errors={errors.fileErrors}
          handleFileChange={handleFileChange}
          filesWithClassement={filesWithClassement}
          PvFilesWithClassement={PvFilesWithClassement}
        />
        {errors.fileErrors && (
          <Typography color="error">
            {errors.fileErrors}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Button onClick={onClose} variant="outlined" color="error">
            Annuler
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Grid,
//   FormControlLabel,
//   Switch,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import {
//   createValidation,
//   getLastPk,
// } from "../../../services/FicheDeValidation/Service";
// import { MockData } from "../../../data/MockData";

// const FileUploadDialog = ({
//   open,
//   onClose,
//   prestation,
//   setFiches,
//   setPkLast,
// }) => {
//   const [kmStartGauche, setKmStartGauche] = useState("");
//   const [kmEndGauche, setKmEndGauche] = useState("");
//   const [kmStartDroit, setKmStartDroit] = useState("");
//   const [kmEndDroit, setKmEndDroit] = useState("");
//   const [nCouches, setNCouches] = useState("");
//   const [filesWithClassement, setFilesWithClassement] = useState(new Map());
//   const [PvFilesWithClassement, setPvFilesWithClassement] = useState(new Map());
//   const [errors, setErrors] = useState({
//     nCouches: false,
//     kmGauche: false,
//     kmDroit: false,
//     fileErrors: [],
//     general: false, // Erreur générale pour le manque de PK droit/gauche
//     pkObligatoryError: false, // Nouveau champ pour signaler l'erreur
//   });

//   const [isKmGaucheEnabled, setIsKmGaucheEnabled] = useState(true);
//   const [isKmDroitEnabled, setIsKmDroitEnabled] = useState(false);

//   const handleFileChange = (event, name, fileType) => {
//     const file = event.target.files[0];
//     if (fileType === "filesWithClassement") {
//       setFilesWithClassement((prev) => new Map(prev).set(name, file));
//     } else if (fileType === "PvFilesWithClassement") {
//       setPvFilesWithClassement((prev) => new Map(prev).set(name, file));
//     }
//   };
//   const validateFields = () => {
//     const newErrors = {
//       nCouches: nCouches && (isNaN(nCouches) || nCouches <= 0),
//       kmGauche:
//         isKmGaucheEnabled &&
//         (isNaN(kmStartGauche) ||
//           isNaN(kmEndGauche) ||
//           Number(kmStartGauche) >= Number(kmEndGauche)),
//       kmDroit:
//         isKmDroitEnabled &&
//         (isNaN(kmStartDroit) ||
//           isNaN(kmEndDroit) ||
//           Number(kmStartDroit) >= Number(kmEndDroit)),
//       fileErrors: [],
//       general: false,
//       pkObligatoryError: false,
//     };

//     const isPKGaucheFilled =
//       isKmGaucheEnabled &&
//       !isNaN(kmStartGauche) &&
//       !isNaN(kmEndGauche) &&
//       Number(kmStartGauche) < Number(kmEndGauche);

//     const isPKDroitFilled =
//       isKmDroitEnabled &&
//       !isNaN(kmStartDroit) &&
//       !isNaN(kmEndDroit) &&
//       Number(kmStartDroit) < Number(kmEndDroit);

//     if (isKmGaucheEnabled && !isPKGaucheFilled) {
//       newErrors.pkObligatoryError = true;
//     } else if (isKmDroitEnabled && !isPKDroitFilled) {
//       newErrors.pkObligatoryError = true;
//     } else if (!isKmGaucheEnabled && !isKmDroitEnabled) {
//       newErrors.pkObligatoryError = true; // Si les deux sont désactivés
//     } else {
//       newErrors.pkObligatoryError = false;
//     }

//     // Check for missing files
//     if (prestation) {
//       const data = MockData[prestation];
//       if (Array.isArray(data)) {
//         data.forEach((item, idx) => {
//           if (
//             !filesWithClassement.has(item.FV) ||
//             !PvFilesWithClassement.has(item.PV)
//           ) {
//             newErrors.fileErrors.push(
//               `Fichiers manquants pour ${item.FV} ou ${item.PV}`
//             );
//           }
//         });
//       } else if (data) {
//         if (
//           !filesWithClassement.has(data.FV) ||
//           !PvFilesWithClassement.has(data.PV)
//         ) {
//           newErrors.fileErrors.push(
//             `Fichiers manquants pour ${data.FV} ou ${data.PV}`
//           );
//         }
//       }
//     }

//     // Mettre à jour l'erreur générale en fonction des erreurs spécifiques
//     newErrors.general =
//       newErrors.kmGauche ||
//       newErrors.kmDroit ||
//       newErrors.fileErrors.length > 0 ||
//       newErrors.pkObligatoryError;

//     setErrors(newErrors);
//     return !newErrors.general;
//   };

//   const handleSave = async () => {
//     if (validateFields()) {
//       try {
//         const payload = {
//           prestationName: prestation,
//           typeOfControl: true,
//           couche: parseInt(nCouches),
//           pkStartLeft: isKmGaucheEnabled ? Number(kmStartGauche) : null,
//           pkEndLeft: isKmGaucheEnabled ? Number(kmEndGauche) : null,
//         };

//         // Ajouter les PK droits seulement s'ils ont été activés
//         if (isKmDroitEnabled) {
//           payload.pkStartRight = Number(kmStartDroit);
//           payload.pkEndRight = Number(kmEndDroit);
//         }

//         console.log(
//           "Object sent:",
//           payload,
//           filesWithClassement,
//           PvFilesWithClassement
//         );

//         const fiche = await createValidation(
//           payload,
//           filesWithClassement,
//           PvFilesWithClassement
//         );
//         setFiches((prev) => [...prev, fiche]);
//         const data = await getLastPk(prestation);
//         setPkLast(data.length >= 2 ? data : [0, 0]);
//         onClose();
//       } catch (error) {
//         console.error("Erreur lors de la sauvegarde:", error);
//       }
//     }
//   };

//   const getFileFields = () => {
//     if (!prestation) return [];
//     const data = MockData[prestation];

//     if (Array.isArray(data)) {
//       return data.flatMap((item, idx) => [
//         <ListItem key={`FV-${idx}`}>
//           <ListItemText primary={item.FV} />
//           <Button
//             variant="contained"
//             component="label"
//             startIcon={<CloudUploadIcon />}
//             color={
//               errors.fileErrors.includes(
//                 `Fichiers manquants pour ${item.FV} ou ${item.PV}`
//               )
//                 ? "error"
//                 : "primary"
//             }
//           >
//             Importer
//             <input
//               type="file"
//               name={`FV-${idx}`}
//               hidden
//               onChange={(event) =>
//                 handleFileChange(event, `${item.FV}`, "filesWithClassement")
//               }
//             />
//           </Button>
//         </ListItem>,
//         <ListItem key={`PV-${idx}`}>
//           <ListItemText primary={item.PV} />
//           <Button
//             variant="contained"
//             component="label"
//             startIcon={<CloudUploadIcon />}
//             color={
//               errors.fileErrors.includes(
//                 `Fichiers manquants pour ${item.FV} ou ${item.PV}`
//               )
//                 ? "error"
//                 : "primary"
//             }
//           >
//             Importer
//             <input
//               type="file"
//               name={`PV-${idx}`}
//               hidden
//               onChange={(event) =>
//                 handleFileChange(event, `${item.PV}`, "PvFilesWithClassement")
//               }
//             />
//           </Button>
//         </ListItem>,
//       ]);
//     }

//     if (data) {
//       const files = [data.FV, data.PV];
//       return files.map((fileLabel, index) => (
//         <ListItem key={index}>
//           <ListItemText primary={fileLabel} />
//           <Button
//             variant="contained"
//             component="label"
//             startIcon={<CloudUploadIcon />}
//             color={
//               errors.fileErrors.includes(`Fichiers manquants pour ${fileLabel}`)
//                 ? "error"
//                 : "primary"
//             }
//           >
//             Importer
//             <input
//               type="file"
//               name={index === 0 ? "FV" : "PV"}
//               hidden
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   `${fileLabel}`,
//                   index === 0 ? "filesWithClassement" : "PvFilesWithClassement"
//                 )
//               }
//             />
//           </Button>
//         </ListItem>
//       ));
//     }

//     return [];
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Importation de données</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={12} sm={6}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={isKmGaucheEnabled}
//                   onChange={() => setIsKmGaucheEnabled((prev) => !prev)}
//                 />
//               }
//               label="PK Gauche"
//             />
//             {isKmGaucheEnabled && (
//               <Box>
//                 <TextField
//                   fullWidth
//                   label="PK Gauche Début"
//                   type="number"
//                   value={kmStartGauche}
//                   onChange={(e) => setKmStartGauche(e.target.value)}
//                   error={errors.kmGauche}
//                   helperText={errors.kmGauche ? "Valeur incorrecte" : ""}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="PK Gauche Fin"
//                   type="number"
//                   value={kmEndGauche}
//                   onChange={(e) => setKmEndGauche(e.target.value)}
//                   error={errors.kmGauche}
//                   helperText={errors.kmGauche ? "Valeur incorrecte" : ""}
//                   margin="normal"
//                 />
//               </Box>
//             )}
//             <Grid item xs={12}>
//               {/* Message d'erreur en rouge si aucun PK n'est renseigné */}
//               {errors.pkObligatoryError && (
//                 <Typography color="error" variant="body2">
//                   Au moins un côté (droit ou gauche) est obligatoire.
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={isKmDroitEnabled}
//                   onChange={() => setIsKmDroitEnabled((prev) => !prev)}
//                 />
//               }
//               label="PK Droit"
//             />
//             {isKmDroitEnabled && (
//               <Box>
//                 <TextField
//                   fullWidth
//                   label="PK Droit Début"
//                   type="number"
//                   value={kmStartDroit}
//                   onChange={(e) => setKmStartDroit(e.target.value)}
//                   error={errors.kmDroit}
//                   helperText={errors.kmDroit ? "Valeur incorrecte" : ""}
//                   margin="normal"
//                 />
//                 <TextField
//                   fullWidth
//                   label="PK Droit Fin"
//                   type="number"
//                   value={kmEndDroit}
//                   onChange={(e) => setKmEndDroit(e.target.value)}
//                   error={errors.kmDroit}
//                   helperText={errors.kmDroit ? "Valeur incorrecte" : ""}
//                   margin="normal"
//                 />
//               </Box>
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Nombre de couches"
//               type="number"
//               value={nCouches}
//               onChange={(e) => setNCouches(e.target.value)}
//               error={errors.nCouches && nCouches !== ""}
//               helperText={
//                 errors.nCouches && nCouches !== ""
//                   ? "Veuillez entrer un nombre valide."
//                   : ""
//               }
//               margin="normal"
//             />
//           </Grid>
//         </Grid>

//         <Typography variant="h6">Fichiers à importer</Typography>
//         <List>{getFileFields()}</List>

//         {errors.fileErrors.length > 0 && (
//           <Box color="error.main">
//             <Typography variant="body2">
//               Fichiers manquants :
//               <ul>
//                 {errors.fileErrors.map((err, index) => (
//                   <li key={index}>{err}</li>
//                 ))}
//               </ul>
//             </Typography>
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Annuler</Button>
//         <Button onClick={handleSave} color="primary" variant="contained">
//           Enregistrer
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FileUploadDialog;
