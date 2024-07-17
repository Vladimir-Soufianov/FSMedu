import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';


const drawerWidth=240;
const ChefDepDrrawer = () => {

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
        <List>
        <ListItem button key="Departement" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Departement')}> 
            <ListItemText primary="Departement" />
          </ListItem>
          <ListItem button key="Modules" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Modules')}> 
            <ListItemText primary="Modules" />
          </ListItem>
        <ListItem button key="Notes" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Notes')}>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button key="Annonces" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Annonces')}> 
            <ListItemText primary="Annonces" />
          </ListItem>
          <ListItem button key="Emploi du temps" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Emplois')}> 
            <ListItemText primary="Emploi du temps" />
          </ListItem>
          <ListItem button key="Garde des examens" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Garde')}> 
            <ListItemText primary="Garde des examens" />
          </ListItem>
          <ListItem button key="Devoirs" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/Devoirs')}> 
            <ListItemText primary="Devoirs" />
          </ListItem>
          <ListItem button key="FSMlearning" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/Chef-Departement/Dashboard/FSMlearning')}> 
            <ListItemText primary="FSMlearning" />
          </ListItem>
          <ListItem button key="Logout" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/login/Personnel')}>
            <ListItemText primary="Déconnexion" />
          </ListItem>
      
         
       
          

          
          </List>
      </Drawer>
    
    </>
  )
}

export default ChefDepDrrawer