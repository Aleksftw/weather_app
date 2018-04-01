'use strict';
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const webAppRoutes = require('./routes/webapp-routes');
const apiRoutes = require("./routes/api");
const errorMiddleware = require('./middleware/error-middleware');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.set("views");


// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/webapp', webAppRoutes);
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorMiddleware);


// create home route
app.get('/', (req, res) => {
    res.render('login', { user: req.user });
});

app.listen(8080, () => {
    console.log('app now listening for requests on port 8080');
});
