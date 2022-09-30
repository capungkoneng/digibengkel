const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const credentials = require("./middleware/credential");
const corsOptions = require("./config/corsOption");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const api = require("./routes/index");
const dotenv = require("dotenv");
// env
dotenv.config();

// logger middlerware
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross origin middleware
app.use(cors(corsOptions));

//built in middlerware to handle urlencoded data
//in other words, form data:
// content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//built in middlerware for json
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.get("/", (req, res) => {
  res.json({
    massage: `Welcome Digi Cuy`,
  });
});

app.use("/api/v1", api);

app.use(errorHandler);

// app.listen(process.env.PORT, () =>
  // console.log(`Server Berjalan di: ${ip.address()}:${process.env.PORT}`)
//   console.log(`Server Berjalan http://localhost:${process.env.PORT}`)
// );

app.listen(3000)