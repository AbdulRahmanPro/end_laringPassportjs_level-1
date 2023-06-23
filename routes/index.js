const express = require("express");
const router = express.Router();
const passport = require("passport");
const Setup_passport = require("../config/google");

//Automatic conversion


// Home Page
router.get("/home", (req, res) => {
  res.render("index");
});
// Google Authentication

// هناك مشكلة في استراتيجية تطون خاص بالغوغل يظخر خطأ 500 
router.get("/google", passport.authenticate('google', {
  scope: ["profile"]
}));

// Google Authentication Callback
router.get("/google/callback", passport.authenticate('google'), (req, res) => {
  res.send("HI BRO ")
});

// Login Form Submission
router.post("/login", (req, res) => {
  // Handle login form submission
});

// Profile Routes

module.exports = router;
