import express from 'express';
import User from './models/User';
import routesForUser from './routes/routesForUser';
import Product from './models/Product';
import routesForProduct from './routes/routesForProduct';
import authRoute from './routes/authRoute';
import verifyToken from './middlewares/verifyJWTToken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import cookieParser from 'cookie-parser';
import parsedCookies from './middlewares/parsedCookiesMiddleware';
import parsedQuery from './middlewares/parsedQueryMiddleware';

const users = [new User(1, 'userName1', 'qwerty', 'user1@gmail.com' ), new User(2, 'userName2', 'password', 'user2@gmail.com')];
const products = [new Product(1, ['good', 'not bad']), new Product(2, ['disgusting'])];

const app = express();
app.use(cookieParser(), express.json());
app.use(parsedCookies, parsedQuery);

app.use((req, res, next) => {    
    res.locals.users = users;
    res.locals.products = products;
    next();
});

app.use('/api', authRoute, verifyToken, routesForUser, routesForProduct);
app.use(passport.initialize());

app.get('/success', (req, res) => res.send("Welcome!!"));
app.get('/error', (req, res) => res.send("Error logging in"));

function localAuthentication(username, password, done) {          
    const user = users.find(user =>
        user.name === username && user.password === password);
    if (user) {
        done(null, user);
    } else {
        console.log('User not found')
        done(null, false, {message: 'User not found'});
    }
  }

passport.use(new LocalStrategy(localAuthentication.bind(this)));

app.post('/login',
    passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/error', session: false}));

// Passport facebook strategy
passport.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: "http://localhost:9080/api/auth/facebook/callback"
},
(accessToken, refreshToken, profile, done) => {
    const user = users.find(user =>
        user.id === profile.id);
    if (user) {
        done(null, user);
    } else {
        done(null, false, {message: 'User not found'});
    }
}
));
app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback',
passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}));

// Passport twitter strategy
passport.use(new TwitterStrategy({
    consumerKey: 'TWITTER_CONSUMER_KEY',
    consumerSecret: 'TWITTER_CONSUMER_SECRET',
    callbackURL: "http://localhost:9080/api/auth/twitter/callback"
},
(token, tokenSecret, profile, done) => {
    const user = users.find(user =>
        user.id === profile.id);
    if (user) {
        done(null, user);
    } else {
        done(null, false, {message: 'User not found'});
    }
}
));
app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback',
passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/login'}));

// Passport google strategy
passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: "http://localhost:9080/api/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
    const user = users.find(user =>
        user.id === profile.id);
    if (user) {
        done(null, user);
    } else {
        done(null, false, {message: 'User not found'});
    }
}
));
app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile']}));
app.get('/api/auth/google/callback',
passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login'}));    

export default app;