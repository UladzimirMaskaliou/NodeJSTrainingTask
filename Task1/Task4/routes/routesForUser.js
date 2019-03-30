import express from 'express';

const routesForUser = express.Router();

routesForUser.get('/users', (req, res) => {
    res.locals.user.findAll().then(users => res.json(users));
});

export default routesForUser;