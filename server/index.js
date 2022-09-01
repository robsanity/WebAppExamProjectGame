'use strict';

const Daos = require('./Daos.js');
const express = require('express');
const morgan = require('morgan'); // Middleware for logging messages
const cors = require('cors'); // Middleware to enable CORS support
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const PREFIX = '/api';


// init express
const app = new express();
const port = 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
// set up the middlewares
app.use(morgan("dev"));
app.use(express.json()); // for parsing json request body

// set up and enable cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await Daos.getUser(username, password);
    if (!user)
      return cb(null, false, { message: "Incorrect username or password" });

    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  Daos
    .getUserById(user.id)
    .then((user) => {
      cb(null, user); // this will be available in req.user
    })
    .catch((err) => {
      cb(err, null);
    });
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ erro: "not authenticated" });
};

app.use(
  session({
    secret:
      "a secret sentence not to share with anibody and anywhere, used to sign the session ID coockie",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

app.post(PREFIX + "/session", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json(req.user);
    });
  })(req, res, next);
});

app.get(PREFIX + "/session/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: "Unauthenticated user!" });
  }
});


// LOGOUT
app.delete(PREFIX + "/session/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});


app.get('/api/leaderboards/:category', async (req, res) => {
  const category = req.params.category;
 try {
  const leaderboard = await Daos.getHighscores(category);
  return res.status(200).json(leaderboard);
 }
 catch (error){
  return res.status(500).json(error);
 }
});


app.post('/api/round', async(req,res)=>{
  try{
        await Daos.sendRound(
        req.body.idRound, 
        req.body.idUser,
        req.body.Letter,
        req.body.Word,
        req.body.Category,
        req.body.Score
        )
        
        return res.status(200).end(true);
        }catch(err)
        {
       
        return res.status(500).end();
    }
  }
)

app.get('/api/Validate/:Category/:Word/:Letter', async(req,res) => {  
  try{
    const item = await Daos.Validate(req.params.Category,req.params.Word,req.params.Letter);
      return res.status(200).json(item);
      
    }
    catch(err){
      return res.status(500).end();
    }
})

app.get('/api/test' , async(req,res) => {
  try{
    let item = await Daos.getLastRoundId();
    return res.status(200).json(item);
  }
  catch(err){
    return res.status(500).end();
  }
})

app.get('/api/Score/:idUser/:Word/:Category/:Letter', async(req,res)=>{
  try{
    let Score = await Daos.Score(req.params.idUser,req.params.Word,req.params.Category,req.params.Letter);
      return res.status(200).json(Score);
    }
    catch(err){
      return res.status(500).end();
    }
})
