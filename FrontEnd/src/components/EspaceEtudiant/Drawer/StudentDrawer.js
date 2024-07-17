import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const StudentDrawer = () => {

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
          <ListItem button key="Infos" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Infos')}>
            <ListItemText primary="Informations" />
          </ListItem>
          <ListItem button key="Notes" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Notes')}>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button key="Emploi" sx={{ marginBottom: '10px' ,marginLeft:"15px"}} onClick={() => handleNavigation('/EspaceEtudiant/Emploi')}>
            <ListItemText primary="Emploi" />
          </ListItem>
          <ListItem button key="Examens" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Examens')}>
            <ListItemText primary="Examens" />
          </ListItem>
          <ListItem button key="Documents" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Documents')}>
            <ListItemText primary="Documents" />
          </ListItem>
          <ListItem button key="FSMlearning" sx={{ marginBottom: '10px' ,marginLeft:"15px"}} onClick={() => handleNavigation('/EspaceEtudiant/FSMlearning')}>
            <ListItemText primary="FSMlearning" />
          </ListItem>
          <ListItem button key="Devoirs" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Devoirs')}>
            <ListItemText primary="Devoirs" />
          </ListItem>
          <ListItem button key="Reinscription" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/EspaceEtudiant/Reinscription')}>
            <ListItemText primary="Reinscription" />
          </ListItem>
          <ListItem button key="Reinscription" sx={{ marginBottom: '10px',marginLeft:"15px" }} onClick={() => handleNavigation('/login/Etudiant')}>
            <ListItemText primary="Déconnexion" />
          </ListItem>
          
        </List>
      </Drawer>
   </>
  )
}

export default StudentDrawer





