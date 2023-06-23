const passport = require("passport");
const findOrCreate =require('mongoose-findorcreate')
const api_auth = require("../models/api_auth");
const OAuth2Strategy = require("passport-google-oauth20");
const keys = require("../config/keys");

// تطبيق الوظيفة كـ plugin

passport.use(
  new OAuth2Strategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.google.callbackURL,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      api_auth.findOne({googleID:profile.id}).then((auth)=>{
        if(auth){
          console.log("نجحت عملية تسيجيل الدخول")
           cb(null,auth)
        }else{  
          new api_auth({
            username:profile.displayName,
            googleID: profile.id
          }).save().then((auth)=>{
            console.log("نجحت عملية تسيجل الدخول 0")
             cb(null,auth)
          })
        }
      })
    }
  )
);
