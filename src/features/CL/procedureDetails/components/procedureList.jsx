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
  fontFamily: "Arial, sans-serif", // Custom font
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "fit-content",
  marginRight: "3px",
});

// Function to format procedure name
const formatProcedureName = (name, versionNumber) => {
  const maxLength = 15;
  if (name.length > maxLength) {
    return `${name.substring(0, maxLength)}... ${versionNumber}`;
  }
  return `${name} ${versionNumber}`;
};

export default function ProceduresList({ procedureId }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [procedures, setProcedures] = React.useState([]);
  const [select, setSelected] = React.useState(0);

  React.useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const data = await getAllVersionProcedure(procedureId);
        data.sort((b, a) => a.entryDate - b.entryDate);
        setProcedures(data);
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
        "& .MuiListItemIcon-root": {
          minWidth: "fit-content",
          marginRight: "3px",
        },
        "& .MuiListItemText-root": { minWidth: "fit-content" },
        "& .MuiTypography-root": { textOverflow: "ellipsis" },
        "& .MuiTypography": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
      aria-label="contacts"
    >
      {procedures.map((procedure, index) => (
        <StyledListItem key={index} disablePadding>
          <StyledListItemButton
            selected={select === index}
            onClick={() => {
              setSelected(index);
              navigate("/CL/procedureDetails", { state: { procedure } });
            }}
          >
            <StyledListItemIcon>
              <InsertDriveFileIcon />
            </StyledListItemIcon>
            <StyledListItemText
              primary={formatProcedureName(procedure.procedureName, procedures.length - index)}
            />
          </StyledListItemButton>
        </StyledListItem>
      ))}
    </List>
  );
}
