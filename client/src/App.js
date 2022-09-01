import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Homepage from "./Components/Homepage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import NavBar from "./Components/Navbar";
import { useState, useEffect } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LeaderBoard from "./Components/LeaderBoard";
import API from "./API";
import GameTable from "./Components/GameTable";
import LoginForm from "./Components/LoginForm";
import { propTypes } from "react-bootstrap/esm/Image";


function App() {
  
  const [highscores,setHighscores] = useState([]);
  const [highscores2,setHighscores2] = useState([]);
  const [highscores3,setHighscores3] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState();
  const [users,setUsers] = useState();
  const [category,setCategory] = useState("");
  const [difficult,setDifficult] = useState("");
  const [letter,setLetter] = useState("");
  const [timer,setTimer] = useState("");
  const [unit,setUnit] = useState(1);
  const [inserted,setInserted] = useState([]);
  const [lastRoundId,setLastRoundId] = useState(0);
  const [validity,setValidity] = useState("");
  const [score,setScore] = useState(0);
  const [status,setStatus] = useState([]);
  
  
  useEffect(() => {
    const checkAuth = async () => {
      /*if(loggedIn !== true){
        setUsers("anonymous");
      }else {*/
      API.getUserInfo()
      .then((id)=>{
        setUsers(id.id)
      })
      .then(()=>{
        setLoggedIn(true);
      })
      .catch(()=>{
        setUsers("anonymous");
        setLoggedIn(false);
      })
    }
    checkAuth();
  }, [loggedIn,users]);
  
  
  
  
 



  const postRound = (idUser,Letter,Word,Category,Difficult) =>{
    API.postRound(idUser,Letter,Word,Category,Difficult)
    .then((response)=>{
      setStatus(response);
    }).catch((error)=>{
      console.error(error);
    });
  }

  const Validate = (Category,Word,Letter) =>{
  API.getValidate(Category,Word,Letter)
  .then((response)=>{
    setValidity(response);
  }).catch((error)=>{
    console.error(error);
  });
}



  const getLastRoundId = () =>{
    API.getLastRound()
    .then((response)=>{ 
      setLastRoundId(response);
    }).catch((error)=>{
      console.error(error);
    });
  }
  useEffect(() => {
    getLastRoundId();
  },[lastRoundId]);
 

  const getScore = (idUser,Word,Category,Letter) =>{
    API.getScore(idUser,Word,Category,Letter)
    .then((response)=>{
        setScore(response + score);
      }).catch((error)=>{
        console.error(error);
      });
    }
  


  const getCityLeaders = () => {
    API.getHighscores("Countries")
    .then((list)=>{
      
      setHighscores(list);
    })
    .catch((err)=>{
      console.error(err);
    });
  };

  useEffect(() => {
    getCityLeaders();
    
  },[highscores]);

  const sendRound = (idUser,idRound,Letter,Word,Category,Score) => {
    API.postRound(idUser,idRound,Letter,Word,Category,Score)
    .then((resp)=>{
      setStatus(resp);
    })
    .catch((err)=>{
      console.error(err);
    });
  };


  const getAnimalsLeaders = () => {
    API.getHighscores("Animals")
    .then((list)=>{
      setHighscores2(list);
    })
    .catch((err)=>{
      console.error(err);
    });
  };

 
  
  useEffect(() => {
    getAnimalsLeaders();
  },[highscores2]);


  const getColorsLeaders = () => {
    API.getHighscores("Colors")
    .then((list)=>{
      setHighscores3(list);
    })
    .catch((err)=>{
      console.error(err);
    });
  };
  
  useEffect(() => {
    getColorsLeaders();
  
  },[highscores3]);

  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo();
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      
      setMessage({ msg: `Welcome, ${user.Name}!`, type: "success" });
    } catch (err) {
      setMessage({ msg: `Wrong username and/or password`, type: "danger"});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage("");
  };

  

  return (
    <Container className="main" fluid="xxl">
      <BrowserRouter>
      <NavBar
          
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          loggedIn={loggedIn}
        />
      <Routes>
          <Route
          path="/leaderboards"
          element={<LeaderBoard loggedIn ={loggedIn}handleLogin={handleLogin}
          handleLogout={handleLogout}
          
          Highscores={highscores} Highscores2={highscores2} Highscores3={highscores3}
          />}/>
          <Route 
          path="/LoginForm"
          element={<LoginForm 
          login={handleLogin} message={message} loggedIn={loggedIn} />}/>
          <Route
          path="/"
          element={<Homepage users = {users} loggedIn ={loggedIn} handleLogin={handleLogin}
          handleLogout={handleLogout}
          />}/>
          <Route
          path="/play"
          element={<GameTable 
            loggedIn ={loggedIn} 
            handleLogin={handleLogin} 
            Validate={Validate} 
            getScore={getScore} 
            validity={validity} 
            setValidity={setValidity} 
            lastRoundId={lastRoundId} 
            setLastRoundId={setLastRoundId} 
            getLastRoundId={getLastRoundId}
            handleLogout={handleLogout} 
            timer={timer} 
            setTimer={setTimer} 
            category={category} 
            setCategory={setCategory} 
            difficult={difficult} 
            setDifficult={setDifficult} 
            letter={letter} 
            setLetter={setLetter} 
            unit={unit} 
            setUnit={setUnit} 
            inserted={inserted} 
            setInserted={setInserted}
            postRound={postRound}
            score={score} 
            setScore={setScore} 
            users={users}
            setUsers={setUsers}
            sendRound={sendRound}
          />}/>
      </Routes>
          </BrowserRouter>
    </Container>
  );
}


export default App;
