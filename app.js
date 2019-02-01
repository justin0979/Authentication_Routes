const express               = require('express'),
      expressSession        = require('express-session'),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User                  = require('./models/user');

const indexRoutes           = require('./routes/index'),
      authRoutes            = require('./routes/auth'),
      restRoutes            = require('./routes/rest');

const app        = express(),
      PORT       = 3000,
      MAPPEDPORT = 8080;

mongoose.connect('mongodb://mongo:27017/router-auth', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
  secret: "Hello again, shhhh",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(authRoutes);
app.use(restRoutes);
app.listen(PORT, console.log(`


  SERVER listening on port ${PORT}, mapped locally to port ${MAPPEDPORT}.


`));
