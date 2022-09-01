import NavBar from "./Navbar";
import { Table,Row } from "react-bootstrap";
import { useEffect,useState } from 'react';
import '../App.js'
import API from "../API";


function LeaderBoardRow1(props){
    return(
    <>
    {<LeaderBoardData1 Highscores={props.Highscores}/>}
    </>);
}
function LeaderBoardRow2(props){
  return(
  <>
  {<LeaderBoardData2 Highscores2={props.Highscores2}/>}
  </>);
}
function LeaderBoardRow3(props){
  return(
  <>
  {<LeaderBoardData3 Highscores3={props.Highscores3}/>}
  </>);
}



function LeaderBoardData1(props){

  return(
    
    <>

    <tr>   
           <td>1</td>
           <td>{props.Highscores.Name}</td>
           <td>{props.Highscores.Category}</td>
           <td>{props.Highscores.Score}</td>
    </tr>
   
        </>);
    }

    function LeaderBoardData2(props){

      return(
        
        <>
    
        <tr>    
        <td>1</td>
               <td>{props.Highscores2.Name}</td>
               <td>{props.Highscores2.Category}</td>
               <td>{props.Highscores2.Score}</td>
        </tr>
       
            </>);
        }


        function LeaderBoardData3(props){

          return(
            
            <>
        
            <tr>   
            <td>1</td> 
                   <td>{props.Highscores3.Name}</td>
                   <td>{props.Highscores3.Category}</td>
                   <td>{props.Highscores3.Score}</td>
            </tr>
           
                </>);
            }
function LeaderBoard(props){

  const [x,setX]=useState();
  return(
    <>

    <header id="header" class="bg-gradient text-white">
        <div class="container px-4 text-center">
          <h1 class="fw-bolder">Best Players on the platform</h1>
          <p class="lead">Choose the category to see the best scores for each Category</p>
          
            </div>
</header>
<div id="gamecard" class="card text-center">
    
    <div class="card-body">
    <Table>
    <thead>
    <h1 class="fw-bolder">Categories</h1>
    
    <button id="btn4" type="button" class="btn btn-dark" onClick={()=>setX(1)}>Countries</button>
    <button id="btn5" type="button" class="btn btn-dark" onClick={()=>setX(2)}>Animals</button>
    <button id="btn6" type="button" class="btn btn-dark" onClick={()=>setX(3)}>Colors</button>
    <tr>
        <th>Place</th>
        <th>Name</th>
        <th>Category</th>
        <th>Score</th>
    </tr>
    </thead>
    <tbody>
    
      

      {x === 1 ? props.Highscores.map((highscores)=>{
        return(
          <LeaderBoardRow1 Highscores={highscores} />
        )
      })
      : x === 2 ? props.Highscores2.map((highscores2)=>{
        return(
          <LeaderBoardRow2 Highscores2={highscores2} />
        )
      }):
      x === 3 ? props.Highscores3.map((highscores3)=>{
        return(
          <LeaderBoardRow3 Highscores3={highscores3} />
        )
      }): <></>
    
    
    }
      
    
    </tbody>
    </Table>
    </div>
    </div>
    </>
  )
}
        
export default LeaderBoard;