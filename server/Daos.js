"use strict";
const db = require("./database.js");
const crypto = require("crypto");
const highscores = require("../client/src/highscores");
const { resolve } = require("path");

async function getHighscores(category){
    let leaderboardList = [];
    return new Promise((resolve,reject)=>{
        let sql = "SELECT name,Category, SUM(Score) AS Score FROM PastRounds JOIN Users ON PastRounds.idUser = Users.id WHERE Category = ? GROUP BY idUser,idRound ORDER BY SUM(Score) DESC LIMIT 1"; 
        db.all(sql,[category],(err,rows)=>{ 
            if(err){
                reject(err);
            }
            else{
               
                leaderboardList = rows.map(
                    (row)=>
                    new highscores(
                        row.Name,
                        row.Category,
                        row.Score
                    )
                );
                resolve(leaderboardList);
            }
        })
      })
}
function getUser(email, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(false);
        } else {
          const user = { id: row.id, username: row.username, Name: row.Name };
  
          crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
            if (err) reject(err);
            if (
              !crypto.timingSafeEqual(
                Buffer.from(row.hash, "hex"),
                hashedPassword
              )
            )
              resolve(false);
            else resolve(user);
          });
        }
      });
    });
  }
  
 function getUserById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve({ error: "User not found!" });
        } else {
          const user = { id: row.id, username: row.username, Name: row.Name };
          resolve(user);
        }
      });
    });
  }

  async function sendRound(idRound,idUser,Letter,Word,Category,Score){
    return new Promise((resolve,reject) => {
      const sql = "INSERT INTO PastRounds (idRound,idUser,Letter,Word,Category,Score) VALUES(?,?,?,?,?,?)";
      db.run(sql,[idRound,idUser,Letter,Word,Category,Score], function (err){
        if(err){
          reject(err);
         
        }else{
  
          resolve(true);
        }
      })
    })
  }
async function Validate(Category,Word,Letter){
  return new Promise((resolve,reject) => {
    const sql = "SELECT Word FROM Words WHERE Category = ? AND Word = ? AND Letter = ?";
    db.all(sql,[Category,Word,Letter],(err,row) => {
      
      if(err) {
        reject(err);
      } else if(row.length === 0){
        resolve(false);
      }
        else {
        resolve(true);
      }
  });
})
}

async function getLastRoundId(){
  return new Promise((resolve,reject) => {
    const sql = "SELECT MAX(idRound) AS idRound FROM PastRounds";
    db.all(sql,[],(err,row) => {
      if(err){
        reject(err);
      }else{
       
        resolve(row[0].idRound+1);
      }
    })
})
}


async function Score(idUser,Word,Category,Letter){
  let Points = 0;
  let round1 = 0;
  let round2 = 0;
  return new Promise((resolve,reject) => {
    const sql = "SELECT DISTINCT idRound FROM PastRounds WHERE Category = ? AND Letter = ? ORDER BY idRound DESC LIMIT 2"
    const sql2 = "SELECT Word FROM PastRounds WHERE (idRound = ? OR idRound = ?) AND idUser != ? AND Word = ? AND Category = ? AND Letter = ?";
    db.all(sql,[Category, Letter],(err, row)=>{
      if (err){
        reject(err)
        return;
      }
      if(row.length === 0){
        round1 = 0;
        round2 = 0;
      }else if(row.length === 1){
      round1 = row[0];
      round2 = 0;
      }
      else {
        round1 = row[0];
        round2 = row[1];
      };
      db.all(sql2,[round1,round2,idUser,Word,Category,Letter],(err,rows) => {
      if(err){
        reject(err);
      }else if(rows.length === 0){
        Points = 10;
        resolve(Points);
      }else {
        Points = 5;
        
      }resolve(Points);
    })

  })})
}
 

module.exports = {getHighscores,getUser,getUserById,sendRound,Validate,Score,getLastRoundId}