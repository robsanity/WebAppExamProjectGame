import { Alert, Form, Button } from "react-bootstrap";
import { useState } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };
      props.login(credentials);
    };
  
    return (
        <div id="gamecard" class="card text-center">
        <div class="card-header">
       
      <div className="container-login border-radius">
        <Form onSubmit={handleSubmit} id="login-form">
          <Form.Label id="login-label"></Form.Label>
          {props.message && (
            <Alert className="border-radius" variant={props.message.type}>{props.message.msg}</Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              required={true}
              className="form-control border-radius"
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required={true}
              className="border-radius"
            />
          </Form.Group>
          {props.loggedIn === true ? <button id="btn18" type="button" class="btn btn-dark" onClick={()=>{navigate('/');props.checkAuth(); }}>Click Here to go to the Homepage and start playing</button> :
          <Button
          id="Login"
            variant="primary"
            type="submit"
            className="login-logout-btn border-radius "
          >
            LOGIN
          </Button>}
        </Form>
      </div>
      
     
      </div>
      </div>
    );
  }
  
  export default LoginForm;
  