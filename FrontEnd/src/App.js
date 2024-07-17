import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from './PrivateRoute'
import Home from "./components/pages/Home";
import More from "./components/pages/More";
import Actualite from "./components/pages/Actualite";
import MoreServices from "./components/pages/MoreServices";
import Test from "./components/pages/test";

import Departments from "./components/Departments/Departments";
import DepDetails from "./components/Departments/DepDetails";


import Biblio from "./components/Bibliotheque/Biblio";
import Location from "./components/Bibliotheque/Location";
import BookDetailsPage from './components/Bibliotheque/BookDetailsPage';

import EELogin from "./components/EspaceEtudiant/Login/EELogin";
import EELoginF from "./components/EspaceEtudiant/Login/LoginForgot";
import EE from "./components/EspaceEtudiant/MainPage/EE";

import EPLogin from "./components/EspacePersonnel/Login/EPLogin";
import EPLoginF from "./components/EspacePersonnel/Login/LoginForgot";

import Ori from './components/EspacePersonnel/MainPage/Orientation';
import Adm from './components/EspacePersonnel/MainPage/Admin';
import Prof from './components/EspacePersonnel/MainPage/Prof';
import ChefD from './components/EspacePersonnel/MainPage/ChefDepartement';
import ChefF from './components/EspacePersonnel/MainPage/ChefFiliere';

import AdmEmp from './components/EspacePersonnel/Dashboards/Admin/Employees'
import AdmEtu from './components/EspacePersonnel/Dashboards/Admin/Students'
import AdmSea from './components/EspacePersonnel/Dashboards/Admin/Seances'
import AdmMod from './components/EspacePersonnel/Dashboards/Admin/Modules'
import AdmLib from './components/EspacePersonnel/Dashboards/Admin/Librairie'
import AdmEv from './components/EspacePersonnel/Dashboards/Admin/Events'
import AdmAc from './components/EspacePersonnel/Dashboards/Admin/Actualites'
import AdmIns from './components/EspacePersonnel/Dashboards/Admin/Inscriptions'
import AdmDoc from './components/EspacePersonnel/Dashboards/Admin/Documents'

import OriClubs from './components/EspacePersonnel/Dashboards/Orientation/Clubs';
import OriAnnonces from './components/EspacePersonnel/Dashboards/Orientation/Annonces';
import OriQsts from './components/EspacePersonnel/Dashboards/Orientation/Questions';
import OriRv from './components/EspacePersonnel/Dashboards/Orientation/RendezVous';

import ProfAn from './components/EspacePersonnel/Dashboards/Prof/Annonces';
import ProfDev from './components/EspacePersonnel/Dashboards/Prof/Devoirs';
import ProfDevDet from './components/EspacePersonnel/Dashboards/Prof/DevoirsDetails';
import ProfEmp from './components/EspacePersonnel/Dashboards/Prof/Emplois';
import ProfLear from './components/EspacePersonnel/Dashboards/Prof/FsmLearning';
import ProfLearDet from './components/EspacePersonnel/Dashboards/Prof/FsmLearningDetails';
import ProfGar from './components/EspacePersonnel/Dashboards/Prof/Garde';
import ProfMod from './components/EspacePersonnel/Dashboards/Prof/Modules';
import ProfNotes from './components/EspacePersonnel/Dashboards/Prof/Notes';

import ChefDNotes from './components/EspacePersonnel/Dashboards/ChefDepartement/Notes'
import ChefDAn from './components/EspacePersonnel/Dashboards/ChefDepartement/Annonces'
import ChefDEmp from './components/EspacePersonnel/Dashboards/ChefDepartement/Emploi'
import ChefDGar from './components/EspacePersonnel/Dashboards/ChefDepartement/Garde'
import ChefDDev from './components/EspacePersonnel/Dashboards/ChefDepartement/Devoirs'
import ChefDDevD from './components/EspacePersonnel/Dashboards/ChefDepartement/DevoirDetails'
import ChefDLear from './components/EspacePersonnel/Dashboards/ChefDepartement/FSMlearning'
import ChefDLearDet from './components/EspacePersonnel/Dashboards/ChefDepartement/FSMlearningDetails'
import ChefDFil from './components/EspacePersonnel/Dashboards/ChefDepartement/Filieres'
import ChefDMod from './components/EspacePersonnel/Dashboards/ChefDepartement/Modules'
import ChefDDep from './components/EspacePersonnel/Dashboards/ChefDepartement/Departement'


import ChefFNotes from './components/EspacePersonnel/Dashboards/ChefFiliere/Notes'
import ChefFAn from './components/EspacePersonnel/Dashboards/ChefFiliere/Annonces'
import ChefFEmp from './components/EspacePersonnel/Dashboards/ChefFiliere/Emploi'
import ChefFGar from './components/EspacePersonnel/Dashboards/ChefFiliere/Garde'
import ChefFDev from './components/EspacePersonnel/Dashboards/ChefFiliere/Devoirs'
import ChefFDevD from './components/EspacePersonnel/Dashboards/ChefFiliere/DevoirDetails'
import ChefFLear from './components/EspacePersonnel/Dashboards/ChefFiliere/FSMlearning'
import ChefFLearDet from './components/EspacePersonnel/Dashboards/ChefFiliere/FSMlearningDetails'
import ChefFFil from './components/EspacePersonnel/Dashboards/ChefFiliere/Filieres'
import ChefFMod from './components/EspacePersonnel/Dashboards/ChefFiliere/Modules'
import ChefFDem from  './components/EspacePersonnel/Dashboards/ChefFiliere/Demandes'

import EEInf from "./components/EspaceEtudiant/Dashboard/Infos";
import EENot from "./components/EspaceEtudiant/Dashboard/Notes";
import EEEmp from "./components/EspaceEtudiant/Dashboard/Emploi";
import EEEx from "./components/EspaceEtudiant/Dashboard/Examens";
import EEDoc from "./components/EspaceEtudiant/Dashboard/Documents";
import EELear from "./components/EspaceEtudiant/Dashboard/FSMlearning";
import EELearDet from  "./components/EspaceEtudiant/Dashboard/FSMlearningDetails";
import EEDev from "./components/EspaceEtudiant/Dashboard/Devoirs";
import EEDevDet from "./components/EspaceEtudiant/Dashboard/DevoirDetails";
import EERins from "./components/EspaceEtudiant/Dashboard/Reinscription";


import Orientation from "./components/Orientation/Orientation";
import Clubs from "./components/Orientation/Clubs";
import Rendezvous from "./components/Orientation/Rendezvous";

import EspInsc from "./components/Inscriptions/EspaceInscription";
import Insc from "./components/Inscriptions/Inscription"


function App() {

  return (
    <Router>
        <Routes>
                  
                        <Route element={<PrivateRoutes />}>  
                            {/* Private Routes */} 
                        </Route>


          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />


        
          <Route path="/More" element={<More />} />
          <Route path="/Actualite" element={<Actualite />} />
         
          <Route path="/Services" element={<MoreServices />} />

          <Route path="/Departments" element={<Departments />} />
          <Route path="/Departments/:id" element={<DepDetails />} />

          <Route path="/Biblio" element={<Biblio />} />
          <Route path="/Biblio/book/:id" element={<BookDetailsPage />} />
          <Route path="/Biblio/book/:id/demander" element={<Location />} />

          
          <Route path="/Login/Etudiant" element={<EELogin />} />
          <Route path="/Login/Etudiant/forgot" element={<EELoginF />} />
          <Route path="/Login/Personnel" element={<EPLogin />} />
          <Route path="/Login/Personnel/forgot" element={<EPLoginF />} />




          <Route path="/EspaceEtudiant" element={<EE />} /> 
          <Route path="/EspaceEtudiant/Infos" element={<EEInf />} /> 
          <Route path="/EspaceEtudiant/Notes" element={<EENot />} /> 
          <Route path="/EspaceEtudiant/Emploi" element={<EEEmp />} /> 
          <Route path="/EspaceEtudiant/Examens" element={<EEEx />} /> 
          <Route path="/EspaceEtudiant/Documents" element={<EEDoc />} /> 
          <Route path="/EspaceEtudiant/FSMlearning" element={<EELear />} /> 
          <Route path="/FSMlearning/module/:id" element={<EELearDet />} /> 
        
          <Route path="/EspaceEtudiant/Devoirs" element={<EEDev />} /> 
          <Route path="/EspaceEtudiant/Devoirs/:id" element={<EEDevDet />} /> 
          <Route path="/EspaceEtudiant/Reinscription" element={<EERins />} /> 






          <Route path="/Admin/Dashboard" element={<Adm/>} />
          <Route path="/Admin/Dashboard/Employees" element={<AdmEmp/>} />
          <Route path="/Admin/Dashboard/Etudiants" element={<AdmEtu/>} />
          <Route path="/Admin/Dashboard/Seances" element={<AdmSea/>} />
          <Route path="/Admin/Dashboard/Modules" element={<AdmMod/>} />
          <Route path="/Admin/Dashboard/Librairie" element={<AdmLib/>} />
          <Route path="/Admin/Dashboard/Evenements" element={<AdmEv/>} />
          <Route path="/Admin/Dashboard/Actualites" element={<AdmAc/>} />
          <Route path="/Admin/Dashboard/Inscription" element={<AdmIns/>} />
          <Route path="/Admin/Dashboard/Documents" element={<AdmDoc/>} />

          
          <Route path="/Prof/Dashboard" element={<Prof />} />
          <Route path="/Chef-Departement/Dashboard" element={<ChefD />} />
          <Route path="/Chef-Filiere/Dashboard" element={<ChefF />} />



          <Route path="/Orientation/Dashboard" element={<Ori />} />
          <Route path="/Orientation/Dashboard/Questions" element={<OriQsts />} />
          <Route path="/Orientation/Dashboard/Clubs" element={<OriClubs />} />
          <Route path="/Orientation/Dashboard/Rendez-vous" element={<OriRv />} />
          <Route path="/Orientation/Dashboard/Annonces" element={<OriAnnonces />} />

          <Route path="/Prof/Dashboard/Annonces" element={<ProfAn />} />
          <Route path="/Prof/Dashboard/Devoirs" element={<ProfDev />} />
          <Route path="/Prof/Dashboard/Devoirs/:id" element={<ProfDevDet />} />

          <Route path="/Prof/Dashboard/Emplois" element={<ProfEmp />} />
          <Route path="/Prof/Dashboard/FSMlearning" element={<ProfLear />} />
          <Route path="/Prof/Dashboard/FSMlearning/module/:id" element={<ProfLearDet />} />

          <Route path="/Prof/Dashboard/Garde" element={<ProfGar />} />
          <Route path="/Prof/Dashboard/Modules" element={<ProfMod />} />
          <Route path="/Prof/Dashboard/Notes" element={<ProfNotes />} />

          <Route path="/Chef-Departement/Dashboard/Notes" element={<ChefDNotes />} />
          <Route path="/Chef-Departement/Dashboard/Annonces" element={<ChefDAn />} />
          <Route path="/Chef-Departement/Dashboard/Emplois" element={<ChefDEmp />} />
          <Route path="/Chef-Departement/Dashboard/Garde" element={<ChefDGar />} />
          <Route path="/Chef-Departement/Dashboard/Devoirs" element={<ChefDDev />} />
          <Route path="/Chef-Departement/Dashboard/FSMlearning" element={<ChefDLear />} />
          <Route path="/Chef-Departement/Dashboard/FSMlearning/module/:id" element={<ChefDLearDet />} />

          <Route path="/Chef-Departement/Dashboard/Filieres" element={<ChefDFil />} />
          <Route path="/Chef-Departement/Dashboard/Modules" element={<ChefDMod />} />
          <Route path="/Chef-Departement/Dashboard/Departement" element={<ChefDDep />} />

          <Route path="/Chef-Filiere/Dashboard/Notes" element={<ChefFNotes />} />
          <Route path="/Chef-Filiere/Dashboard/Annonces" element={<ChefFAn />} />
          <Route path="/Chef-Filiere/Dashboard/Emplois" element={<ChefFEmp />} />
          <Route path="/Chef-Filiere/Dashboard/Garde" element={<ChefFGar />} />
          <Route path="/Chef-Filiere/Dashboard/Devoirs" element={<ChefFDev />} />
          <Route path="/Chef-Filiere/Dashboard/Devoirs/:id" element={<ChefFDevD />} />
          <Route path="/Chef-Departement/Dashboard/Devoirs/:id" element={<ChefDDevD />} />
          
          <Route path="/Chef-Filiere/Dashboard/FSMlearning" element={<ChefFLear />} />
          <Route path="/Chef-Filiere/Dashboard/Filieres" element={<ChefFFil />} />
          <Route path="/Chef-Filiere/Dashboard/Modules" element={<ChefFMod />} />
          <Route path="/Chef-Filiere/Dashboard/Demandes" element={<ChefFDem />} />
          <Route path="/Chef-Filiere/Dashboard/FSMlearning/module/:id" element={<ChefFLearDet />} />
          


          <Route path="/Orientation" element={<Orientation />} />
          <Route path="/Orientation/RendezVous" element={<Rendezvous />} />
          <Route path="/clubs/registration/:id" element={<Clubs />} />
     
          <Route path="/EspaceInscription" element={<EspInsc/>}/>
          <Route path="/EspaceInscription/Inscription" element={<Insc/>}/>
          
        </Routes>
      
    </Router>
  );
}

export default App;