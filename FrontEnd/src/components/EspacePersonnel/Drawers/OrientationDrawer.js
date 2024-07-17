import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth=240;
const OrientationDrawer = () => {
  const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
      };

  return (
   <>
   <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginTop: '20px',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            paddingTop:"20px",
            marginTop:"66px",
            boxSizing: 'border-box',
            bgcolor: '#424242', 
            color: 'white', 
          },
        }}
      >
        <List >
          <ListItem button key="Clubs" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Orientation/Dashboard/Clubs')}>
            <ListItemText primary="Clubs" />
          </ListItem> 
          <ListItem button key="Questions" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Orientation/Dashboard/Questions')}>
            <ListItemText primary="Questions" />
          </ListItem>
          <ListItem button key="Rendez-vous" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Orientation/Dashboard/Rendez-vous')}>
            <ListItemText primary="Rendez-vous" />
          </ListItem> 
          <ListItem button key="Annonces" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Orientation/Dashboard/Annonces')}>
            <ListItemText primary="Annonces" />
          </ListItem>
          <ListItem button key="Deconnexion" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Login/Personnel')}>
            <ListItemText primary="Deconnexion" />
          </ListItem>
        </List>
      </Drawer>
   </>
  )
}

export default OrientationDrawer