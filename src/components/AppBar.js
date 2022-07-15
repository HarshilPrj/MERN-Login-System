import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Bar1() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"

            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/home'>Home</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/login'>Login</Link>
          <Link to='/add_user'>Registration</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
