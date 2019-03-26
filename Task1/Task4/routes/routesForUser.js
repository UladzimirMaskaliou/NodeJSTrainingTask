import express from 'express';

const routesForUser = express.Router();

routesForUser.get('/users', (req, res) => {
    res.send(res.locals.users);
});

export default routesForUser;