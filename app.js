const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
require("./db/db");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
const Create_User = require("./src/routes/UsersRouter");
app.use(Create_User);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
