import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo_adm_projet.png';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import './AppAppBar.css'
function AppAppBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
      const handleScroll = () => {
          console.log("ScrollY:", window.scrollY); // Testez si handleScroll est appelé
          setIsSticky(window.scrollY > 100);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

    const handleClick = () => {
        navigate('/login');
    }

    const navItems = [
        { link: "Home", path: "/home" },
        { link: "About", path: "/about" },
        { link: "Services", path: "/services" },
        { link: "Contact", path: "/contact" },
    ];

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className="container-fluid">
                <div className="logo-navbar">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className="links-navbar">
                    <ul className='navbar large-devices'>
                        {navItems.map(({ link, path }) => (
                            <Link
                                key={path}
                                to={path}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                            >
                                {link}
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="login-btn">
                    <Button variant="contained" size="large" onClick={handleClick} endIcon={<LoginRoundedIcon />}>
                        Login
                    </Button>
                </div>
                <div className='menu-btn'>
                    <IconButton size="large" onClick={toggleMenu}>
                        {isMenuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                    </IconButton>
                </div>
            </div>
            <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
                {navItems.map(({ link, path }) => (
                    <Link
                        key={path}
                        to={path}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default AppAppBar;
