const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const logger = require("morgan");
const passport = require("passport")
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const port = 3000;
const app = express();
require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: tokenSecret
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.redirect("/auth/home");
});
app.use("/auth", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
mongoose
  .connect(
    "mongodb+srv://maynkraftalhosni:reem123123@cluster0.ivva45d.mongodb.net/Database_Account?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("تم الاتصال بنجاح");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
