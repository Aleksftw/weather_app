'use strict';

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('./config');


app.use(bodyParser.json());
app.use(cors());
//Initialize routes
app.set("view engine", "ejs");
app.set("views", )
app.use(express.static("../public"));
app.use("/api", apiRouter);
app.use(errorMiddleware);




app.listen(config.port, () => console.log(`The server is listening on port ${config.port}`));