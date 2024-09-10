// import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import { styled } from "@mui/material/styles";
// import { getAllVersionProcedure } from "../service";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";

// const StyledListItem = styled(ListItem)(({ theme }) => ({
//   padding: 0,
//   margin: 0,
//   display: "flex",
// }));
// const StyledListItemText = styled(ListItemText)(({ theme }) => ({
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   width: "100%", // Ensure the width is managed
//   flex: 1,
// }));
// export default function ProceduresList({
//   procedureId,
//   procedureVersion,
//   setProcedureVersion,
// }) {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const [select, setSelected] = React.useState(0);
//   React.useEffect(() => {
//     const fetchProcedures = async () => {
//       try {
//         const data = await getAllVersionProcedure(procedureId);
//         data.sort((b, a) => a.entryDate - b.entryDate);
//         setProcedureVersion(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching procedures:", error);
//       }
//     };

//     fetchProcedures();
//   }, [procedureId]);
//   return (
//     <List
//       sx={{
//         bgcolor: "background.paper",
//         "& .MuiListItemIcon-root": {
//           minWidth: "fit-content ",
//           marginRight: "3px",
//         },
//         "& .MuiListItemText-root": { minWidth: "fitContent" },
//         "& .MuiTypography-root": { textOverflow: "ellipsis" },
//         "& .MuiTypography": {
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         },
//       }}
//       aria-label="contacts"
//     >
//       {procedureVersion.map((procedure, index) => {
//         return (
//           <StyledListItem
//             key={index} 
//             sx={{
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             <ListItemButton
//               sx={{
//                 backgroundColor:
//                   select === index
//                     ? theme.palette.primary.main
//                     : theme.palette.background.default,
//               }}
//               onClick={() => {
//                 setSelected(index); // Utilisation de l'index correct
//                 navigate("/RQ/procedureDetails", { state: { procedure } });
//               }}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />{" "}
//               </ListItemIcon>
//               <StyledListItemText
//                 primary={`${procedure.procedureName} ${
//                   procedureVersion.length - index
//                 }`}
//               />
//             </ListItemButton>
//           </StyledListItem>
//         );
//       })}
//     </List>
//   );
// }

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/material/styles";
import { getAllVersionProcedure } from "../service";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// Styled components
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  margin: 0,
  display: "flex",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  flex: 1,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "fit-content",
  marginRight: "3px",
});

const formatProcedureName = (name, versionNumber) => {
  const maxLength = 15;
  if (name.length > maxLength) {
    return `${name.substring(0, maxLength)}... ${versionNumber}`;
  }
  return `${name} ${versionNumber}`;
};

export default function ProceduresList({
  procedureId,
  procedureVersion,
  setProcedureVersion,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [select, setSelected] = React.useState(0);

  React.useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const data = await getAllVersionProcedure(procedureId);
        data.sort((b, a) => a.entryDate - b.entryDate);
        setProcedureVersion(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      }
    };

    fetchProcedures();
  }, [procedureId]);

  return (
    <List
      sx={{
        bgcolor: "background.paper",
        "& .MuiTypography-root": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
      aria-label="contacts"
    >
      {procedureVersion.map((procedure, index) => (
        <StyledListItem key={index}>
          <StyledListItemButton
            selected={select === index}
            onClick={() => {
              setSelected(index);
              navigate("/RQ/procedureDetails", { state: { procedure } });
            }}
          >
            <StyledListItemIcon>
              <InsertDriveFileIcon />
            </StyledListItemIcon>
            <StyledListItemText
              primary={formatProcedureName(procedure.procedureName, procedureVersion.length - index)}
            />
          </StyledListItemButton>
        </StyledListItem>
      ))}
    </List>
  );
}
