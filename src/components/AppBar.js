import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserBar from "./UserBar";
import authOperations from "../redux/auth-redux/auth-operations";

function AppBar() {
  const dpatch = useDispatch();
  const nav = useNavigate();
  const getName = useSelector(state => state.auth.loginedUser.user);
  const isLogged = useSelector(state => state.auth.loginedUser.token);
  const userId = useSelector(state => state.auth.loginedUser.userId);

  const onLogOutHandler = () => {
    dpatch(authOperations.logOut({ _id: userId, isOnline: false }));
    nav("/");
  };

  return (

    <Navbar bg="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navigation-container" >
            {isLogged && (
                <>
              <Nav.Link  href="/user">
                <span className="color-nav">List of users</span>
              </Nav.Link>
              <Nav.Link  href="/items">
                <span className="color-nav">List of items</span>
              </Nav.Link>
                  <Nav.Link  href="/collection">
                    <span className="color-nav">MyCollection</span>
                  </Nav.Link>
                  <Nav.Link  href="/add-item">
                    <span className="color-nav">Add item</span>
                  </Nav.Link>
                </>
            )}
            {!isLogged && (
              <>
                <Nav.Link href="/sign-in">
                  <span className="color-nav">Sign In</span>
                </Nav.Link>
                <Nav.Link href="/sign-up">
                  <span className="color-nav">Sign Up</span>
                </Nav.Link>
                <Nav.Link  href="/items">
                  <span className="color-nav">List of items</span>
                </Nav.Link>
              </>
            )}
            {isLogged && <UserBar onLogOut={onLogOutHandler} user={getName} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
