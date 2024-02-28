import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return(
        <Navbar bg="primary" expand="sm" fixed="top" > 
            <Container className='nav'>
                <Navbar.Brand as={Link} to="/movies">
                    MyMovies
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="-basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                               {/* <Nav.Link as={Link} to="/">
                                    Home
                        </Nav.Link>*/}
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/movies">
                                    Movies
                                </Nav.Link>

                                <Nav.Link  onClick={onLoggedOut}  as= {Link} to="/logout">
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}