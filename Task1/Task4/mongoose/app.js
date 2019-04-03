import express from 'express';
import passport from 'passport';
import routesForMongoCity from '../routes/mongoose/cities';
import routesForMongoUser from '../routes/mongoose/users';
import routesForMongoProduct from '../routes/mongoose/products';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser(), express.json());

app.use('/api', routesForMongoCity, routesForMongoUser, routesForMongoProduct);
app.use(passport.initialize());

export default app;