require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware  = require("./middlewares/error.middleware.js");
const cookieParser = require('cookie-parser');
const router = require("./routes/user.routes.js");
const app = express();

// middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1/user", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>")
});
app.all('*',(req,res)=>{
  res.status(404).send("oops! page not found ");
});

// handeling error
app.use(errorMiddleware);

module.exports = app;
