const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./models/db')
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./handlers');
const routes = require('./routes') 

const app = express();

app.use(cors());
app.use(bodyParser.json());
//load config
dotenv.config({path: './config/config.env' })

app.use('/uploads',express.static('uploads'))

const port = process.env.PORT || 8080

app.use('/api/auth', routes.auth);
app.use('/api/poll', routes.poll);
app.use('/api/admin', routes.admin)

//app.use(notFound);

app.use(errorHandler);

connectDB();

console.log(process.env.NODE_ENV);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }
app.listen(port, console.log(`server started on port ${port}`))