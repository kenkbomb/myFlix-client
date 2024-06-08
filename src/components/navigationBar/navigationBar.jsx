import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut,update }) => {
    return(
        <Navbar bg='danger' expand="sm" fixed="top" variant="light" > 
            <Container className='nav'>
                {user?(<Navbar.Brand as={Link} to="/movies" className="navBrand">
                     MyMovies
                </Navbar.Brand>):<Navbar.Brand as={Link} to="/login">
                    MyMovies
                </Navbar.Brand>}
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
                                <Nav.Link as={Link} to="/movies" onClick={update}>
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