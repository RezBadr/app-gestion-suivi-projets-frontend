import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../services/userService";
import { removeToken, removeUserInfo } from "../../services/tokenService";
import { getUserRole } from "../../services/userService";
import { getCurrentMarketsOfUser } from "../../services/userService";
import { Link } from 'react-router-dom'; // Import du composant Link


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [marketName, setMarketName] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          getUserRole() == "CL" ||
          getUserRole() == "RQ" ||
          getUserRole() == "QU"
        ) {
          const market = await getCurrentMarketsOfUser();
          console.log(market);

          if (market.length > 0) {
            setMarketName(market[0].marketName);
          }
        } else {
          setMarketName(localStorage.getItem("market"));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des marchés:", error);
      }
    };

    fetchData();
  }, [localStorage.getItem("market")]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSettingClick = () => {
    navigate(`${getUserRole()}/settings`);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogoutClick = async () => {
    handleMenuClose();
    try {
      await logout();
      removeToken();
      removeUserInfo();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleSettingClick();
        }}
      >
        Paramètres
      </MenuItem>
      <MenuItem onClick={handleLogoutClick}>Déconnexion</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          {/* <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge> */}
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {["DG", "TT", "CP"].includes(getUserRole()) ? (
            <Link
              to={`/${getUserRole()}/home`} // Génère l'URL si le rôle correspond
              style={{ textDecoration: "none", color: "inherit" }} // Styles pour enlever la déco par défaut
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                ADM PROJET
              </Typography>
            </Link>
          ) : (
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { xs: "none", sm: "block" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              ADM PROJET
            </Typography>
          )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Recherche…"
              inputProps={{ "aria-label": "Recherche" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {!(getUserRole() == "ADMIN") && (
              <Typography>{marketName}</Typography>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
