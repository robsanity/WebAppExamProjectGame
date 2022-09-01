import highscores from "./highscores";
const APIURL = "http://localhost:3001";

const getHighscores = async (category) => {
    const response = await fetch(APIURL + "/api/leaderboards/"+category , {
      method: "GET",
    });
        const resp = await response.json();
        if(response.ok){
           return resp.map(
            (Highscores)=>
            new highscores(
                Highscores.Name,
                Highscores.Category,
                Highscores.Score
           )
           );
        }
        else{
            
            throw resp;
        }
}

const getValidate = async(Category,Word,Letter) =>{ 
  const response = await fetch(APIURL + "/api/Validate/"+Category+"/"+Word+"/"+Letter , {
    method: "GET",
  });
    const resp = await response.json();
    if(response.ok){
      return resp;
    }
    else {
      throw resp;
    }
  };

const getLastRound = async() =>{
  const url = APIURL + "/api/test";
  const response = await fetch(url, {
    method: "GET"
  });
  const item = await response.text();
 
  if (response.ok) {
    return item;
  } else {
    throw item; 
  }
}; 

/*** AUTHENTICATION APIs ***/

const logIn = async (credentials) => {
    const response = await fetch(APIURL + "/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetails = await response.text();
      throw errDetails;
    }
  };
  
  const getUserInfo = async () => {
    try{
    const response = await fetch(APIURL + "/api/session/current", {
      credentials: "include",
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user; // an object with the error coming from the server
    }
    }catch (err){
      
    }
  };
  
  // DELETE /api/sessions/current API Call
  
  const logOut = async () => {
    const response = await fetch(APIURL + "/api/session/current", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) return null;
  };


  async function postRound(idRound,idUser,Letter,Word,Category,Score){
    const url = APIURL + "/api/round";
    try {
      const response = await fetch(url,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idRound:idRound,idUser: idUser,Letter: Letter,Word:Word,Category: Category,Score: Score}),
      });
      if(response.ok){
        
        return true;
      }
      else{
        const text = await response.text();
        throw text;
      }
    }catch(err){
      throw err;
    }
  }


  async function getScore(idUser,Word,Category,Letter) {
    const url = APIURL +"/api/Score"+"/"+idUser+"/"+Word+"/"+Category+"/"+Letter;
    try{
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok){
        const item = await response.json();
        return item;
      }else {
      const text = await response.text();
      throw text;
      }
    } catch (err){
        throw err;
    }
  }

const API = {getHighscores,logIn,getUserInfo,logOut,getScore,getValidate,postRound,getLastRound};
export default API;