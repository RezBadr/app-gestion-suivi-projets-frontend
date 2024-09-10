import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ routes }) => {
  const theme = useTheme();


  return (
    <Box
      id="sidebar"
      sx={{
        width: "100%",
        height: "100vh",
        maxWidth: 250,
        pt: 6,
        pl: 2,
        bgcolor: theme.palette.primary.main,
      }}
    >
      {routes.map(({ layout, pages }, key) => (
        <List key={key} sx={{ mt: 6, p: 0 }}>
     
          {pages.map(
            ({ icon, name, path }) =>
              icon &&
              name && (
                <NavLink
                  to={`/${layout}${path}`}
                  style={{ textDecoration: "none" }}
                  key={name}
                >
                  {({ isActive }) => (
                    <ListItem
                      sx={{
                        mt: 2,
                        p: 1,
                        color: "aliceblue",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 1,
                        transition: "background-color 0.3s, transform 0.2s",
                        bgcolor: isActive
                          ? "rgba(255, 255, 255, 0.3)"
                          : "transparent",
                        color: isActive
                          ? theme.palette.primary.main
                          : "aliceblue",
                        fontWeight: isActive ? "bold" : "normal",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.3)",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit", mr: 1 }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItem>
                  )}
                </NavLink>
              )
          )}
        </List>
      ))}
    </Box>
  );
};

export default Sidebar;

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const Sidebar = ({ routes}) => {

//   return (
//     <>
//       <div id='sidebar'>
//         <div>
//           {routes.map(({ layout, pages }, key) => (
//           <ul key={key} className='linksList'>
//           {pages.map(({ icon, name, path }) => (
//             icon && name && (
//                 <NavLink to={`/${layout}${path}`}  style={{ textDecoration: 'none' }}>
//                   {({ isActive }) => (
//                   <li key={name}  className={isActive ? "isActive" : ""}>
//                         {icon}
//                         <span>{name}</span>
//                   </li>
//                   )}
//                 </NavLink>
//             )
//           ))}
//           </ul>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar;
