import { MouseEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { Link } from 'react-router-dom';

const pages = [{ title: 'Bycicles List', href: '/' }];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <PedalBikeIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                BS
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.href}>
                  <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Link to="/">
              <PedalBikeIcon sx={{ mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                }}
              >
                BS
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.href} key={page.href}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
