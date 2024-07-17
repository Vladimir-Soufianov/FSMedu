import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const AdminDrawer = () => {

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
          <ListItem button key="Employées" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Employees')}>
            <ListItemText primary="Personnel" />
          </ListItem>
          <ListItem button key="Etudiants" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Etudiants')}>
            <ListItemText primary="Etudiants" />
          </ListItem>
          <ListItem button key="Seances" sx={{ marginBottom: '10px' ,marginLeft:"15px"}} onClick={() => handleNavigation('/Admin/Dashboard/Seances')}>
            <ListItemText primary="Seances" />
          </ListItem>
          <ListItem button key="Modules" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Modules')}>
            <ListItemText primary="Modules" />
          </ListItem>
          
          <ListItem button key="Librairie" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Librairie')}>
            <ListItemText primary="Bibliothèque" />
          </ListItem>
         
          <ListItem button key="Evenments" sx={{ marginBottom: '10px' ,marginLeft:"15px"}} onClick={() => handleNavigation('/Admin/Dashboard/Evenements')}>
            <ListItemText primary="Evènements" />
          </ListItem>
          <ListItem button key="Actualités" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Actualites')}>
            <ListItemText primary="Annonces" />
          </ListItem>
          <ListItem button key="Inscriptions" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Inscription')}>
            <ListItemText primary="Inscriptions" />
          </ListItem>
          <ListItem button key="Documents" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Admin/Dashboard/Documents')}>
            <ListItemText primary="Documents" />
          </ListItem>
          <ListItem button key="Logout" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/login/Personnel')}>
            <ListItemText primary="Déconnexion" />
          </ListItem>
          
        </List>
      </Drawer>
   </>
  )
}

export default AdminDrawer