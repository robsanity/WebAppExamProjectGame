import NavBar from "./Navbar";
import {Container,div} from "react-bootstrap";
import { useEffect,useState } from 'react';
import AddWords from "./AddWords";



function GameTable(props){
   const [minWords,setMinWords] = useState(0);

    
    
    function generateRandomLetter(props) {
        const alphabet = "abcdefghijklmnoprstuvwz"
      
        return alphabet[Math.floor(Math.random() * alphabet.length)]
      }
      function startCountdown(){
        props.setTimer(60);
      }
      useEffect(() => {
        props.timer > 0 && setTimeout(() => props.setTimer(props.timer - props.unit),1000);
       
        return () => {
          
          clearTimeout(props.timer);
        };
      }, [props.timer]);
      
      
      
      
    
      
      
      
      
return(
<>
    
    <div id="gamecard" class="card text-center">
  <div class="card-header">
  <h4>To start playing , first Choose the category</h4>
  </div>
    <div class="card-body">
    {props.category === "" ?
    <>
    <button id="btn4" type="button" class="btn btn-dark" onClick={()=>{props.setCategory("Countries")}}>City</button>
    <button id="btn5" type="button" class="btn btn-dark" onClick={()=>{props.setCategory("Animals")}}>Animals</button>
    <button id="btn6" type="button" class="btn btn-dark" onClick={()=>{props.setCategory("Colors")}}>Colors</button>
    </>
    :<><h4>You Selected {props.category} </h4></>}
    {(props.category === "Countries" || props.category === "Animals" || props.category === "Colors") && props.difficult ==="" ? 
        <>
        
        <h6>Now choose the difficult</h6>
        <button id="btn7" type="button" class="btn btn-dark" onClick={()=>{props.setDifficult(1);setMinWords(2)}}>Difficult 1</button>
        <button id="btn8" type="button" class="btn btn-dark" onClick={()=>{props.setDifficult(2);setMinWords(3)}}>Difficult 2</button>
        <button id="btn9" type="button" class="btn btn-dark" onClick={()=>{props.setDifficult(3);setMinWords(4)}}>Difficult 3</button>
        <button id="btn10" type="button" class="btn btn-dark" onClick={()=>{props.setDifficult(4);setMinWords(6)}}>Difficult 4</button>
        </>:<></>}
        {props.difficult === 1 || props.difficult === 2 || props.difficult === 3 || props.difficult === 4 ? 
        
        <>
        {props.difficult === 1 ? <h5>Write at least 2 words</h5>: props.difficult === 2 ? <h5>Write at least 3 words</h5> :props.difficult === 3 ? <h5>Write at least 4 words</h5> :props.difficult === 4 ? <h5>Write at least 6 words</h5>:<></>}
        {props.timer === "" ? <button id="start" type="button" class="btn btn-success" onClick={()=>{props.setLetter(generateRandomLetter());startCountdown();props.getLastRoundId();}}>Start!</button>:<></>}
          
        {props.letter !== "" ? <><h3>Write words with letter {props.letter}</h3>
        <h5>Timer <i class="bi bi-stopwatch"></i></h5> 
        <h5>{props.timer} seconds left</h5>
        <div id="progress" class="progress">
        <div id="demo" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="" style={{width:props.timer/0.6+"%"}} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </>
        :<p>Press start to get a random letter and start playing </p>}  
        </>:<></>
        }
        {<AddWords  postRound={props.postRound}
        getScore={props.getScore} 
        score={props.score} 
        users={props.users}
        loggedIn={props.loggedIn}
        setScore={props.setScore} 
        sendRound={props.sendRound}
        setUsers={props.setUsers}
        addWords={props.addWords} timer={props.timer} setTimer={props.setTimer} category={props.category} setCategory={props.setCategory} difficult={props.difficult} setDifficult={props.setDifficult} letter={props.letter} setLetter={props.setLetter} unit = {props.unit} setUnit = {props.setUnit}
        inserted = {props.inserted} setInserted = {props.setInserted} Validate = {props.Validate} validity = {props.validity} setValidity = {props.setValidity} minWords={minWords} setMinWords={setMinWords} lastRoundId = {props.lastRoundId} setLastRoundId = {props.setLastRoundId} getLastRoundId = {props.getLastRoundId}/>}
    </div>
    </div>
    
  </>
)
}

export default GameTable;