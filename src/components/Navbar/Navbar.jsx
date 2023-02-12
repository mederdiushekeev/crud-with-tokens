import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";

function NavScrollExample() {
  const navigate = useNavigate();

  const { user, handleLogout, checkAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
    }
  }, []);

  return (
    <Navbar bg="info" expand="lg">
      <Container style={{ padding: "1rem" }} fluid>
        <Navbar.Brand href="#">Meder Makers</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Auth" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/register")}>
                Register
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/login")}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/add")}>
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products")}>
                ProductList
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#" disabled>
              {user ? user : "No auth user"}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
