const express               = require('express'),
      expressSession        = require('express-session'),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

const app        = express(),
      PORT       = 3000,
      MAPPEDPORT = 8080;
