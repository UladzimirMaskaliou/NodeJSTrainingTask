import express from 'express';
import User from './models/User';
import routesForUser from './routes/routesForUser';
import Product from './models/Product';
import routesForProduct from './routes/routesForProduct';
import cookieParser from 'cookie-parser';
import parsedCookies from './middlewares/parsedCookiesMiddleware';
import parsedQuery from './middlewares/parsedQueryMiddleware';


const users = [new User(1, 'userName1'), new User(2, 'userName2')];
const products = [new Product(1, ['good', 'not bad']), new Product(2, ['disgusting'])];

const app = express();
app.use(cookieParser(), parsedCookies, parsedQuery);

app.use((req, res, next) => {
    res.locals.users = users;
    res.locals.products = products;
    next();
});

app.use('/api', routesForUser, routesForProduct);

export default app;