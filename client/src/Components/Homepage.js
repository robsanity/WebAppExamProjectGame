import { Navbar, Container, Button,Alert} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import GameTable from "./GameTable";


function Homepage(props){
  const navigate = useNavigate();
return(
    <>
   
      <header id="header" class="bg-gradient text-white">
        <div class="container px-4 text-center">
          <h1 class="fw-bolder">Welcome to Categories Game!</h1>
          <p class="lead"> Try to be the best player in the platform!</p>
          <div id="gruppobottoni" class="btn-group-vertical">
            <a id="btn1" class="btn btn-dark" onClick={()=>{navigate("/play")}}>Play as Unlogged User</a>
            <a id="btn2" class="btn btn-dark" onClick={()=>{props.loggedIn === false ? alert("You must be logged in"):navigate("/play")}}>Play as Logged User</a>
            </div>
           
            <div id="card" class="card">
            <div class="card-body">
            <h7 class="card-title mb-2 text-muted">Rules of the game</h7>
            <p class="card-text text-dark"> You have 60 second to write the maximum number of words with the chosen letter and belonging to the category Animals, City or Colours.</p>
            <p class="card-text text-dark">Choose between 3 levels of difficult:</p>
            <p class="card-text text-dark">1: Minumum number of words to write 2</p>
            <p class="card-text text-dark">2: Minumum number of words to write 3</p>
            <p class="card-text text-dark">3: Minumum number of words to write 4</p>
            <p class="card-text text-dark">4: Minumum number of words to write 6</p>
            <p class="card-text text-dark">Log in to climb the leaderboards</p>
</div>
</div>
</div>
</header>

</>
);
}
export default Homepage