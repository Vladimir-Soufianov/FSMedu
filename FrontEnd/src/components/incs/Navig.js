
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./navig.module.css";
import {MDBBtn} from 'mdb-react-ui-kit';
import logo from "../assets/fsmlogo.png"

function Navig() {
  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
     <Navbar.Brand href="/">
    <img
      src={logo} // Replace this with the path to your logo image
      alt="FSMedu Logo" // Provide an appropriate alt text for accessibility
      height="40"
      className="d-inline-block align-top"
    />
  </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={styles.navig} href="/">
              Accueil
            </Nav.Link>
            <Nav.Link className={styles.navig} href="/Departments">
              Départements
            </Nav.Link>
            <Nav.Link className={styles.navig} href="/Services">
              Services
            </Nav.Link>
            <Nav.Link className={styles.navig} href="/Biblio">
            Bibliothèque
            </Nav.Link>
            <Nav.Link className={styles.navig} href="/Orientation">
              Orientation
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Rechercher"
              className="me-2"
              aria-label="Search"
            />
            <MDBBtn outline>Chercher</MDBBtn>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navig;


