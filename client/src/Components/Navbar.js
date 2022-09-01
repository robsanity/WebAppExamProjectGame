import { Navbar, Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function NavBar(props) {
  const navigate = useNavigate();
  return (
    <Navbar className="navbar-dark bg-dark" id="navbar" sticky="top">
      <Container id="container-navbar">
        <Navbar.Brand href="#"><Button onClick={()=>{navigate("/")}} className="login-logout-btn border-radius btn-dark">Homepage <i class="bi bi-house-fill"></i></Button>
        </Navbar.Brand>
        <Button id="ranks" onClick={()=>{navigate("/leaderboards")}}
              className="login-logout-btn border-radius btn-dark"><i class="bi bi-award"></i>
              Check Player Standings for all the category
            </Button>
        {props.loggedIn === true ? <Button className="login-logout-btn border-radius btn-dark" onClick={() => {props.handleLogout();navigate("/");props.checkAuth();}}>Logout<i class="bi bi-box-arrow-right"></i></Button>:
        <Button onClick={()=>{navigate("/LoginForm")}}
          className="login-logout-btn border-radius btn-dark">
              Login
              <i class="bi bi-key"></i>
            </Button>
}
      </Container>
    </Navbar>
  );
}

export default NavBar;