import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListAltSharp from '@mui/icons-material/ListAltSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SendAndArchive from '@mui/icons-material/SendAndArchive';
import { useAuth } from '../../auth/context';
import { useNavigate }  from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const drawerWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateTo = (path) => {
    return () => {
      navigate(path);
    }
  }

  const drawer = (
    <div>
      <Toolbar /> 
      <List>
        {[
          ['Home', <HomeIcon />, navigateTo('/')],
          ['Products', <ListAltSharp />, navigateTo('/product')],
          ['Orders', <SendAndArchive />, navigateTo('/order')],
        ].map(([text, icon, navigate], index) => (
            <ListItem button key={text} onClick={navigate}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Box paddingTop={'40px'}>
          <ListItem button key={'Exit'} onClick={logout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Exit'} />
          </ListItem>
        </Box>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ marginRight: 2, ...(mobileOpen && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
