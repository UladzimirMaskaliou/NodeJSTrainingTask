import express from "express";
import User from "../../models/mongoose/user";

const routesForMongoUser = express.Router();

routesForMongoUser.get('/users', (req, res) => {
  User.find((err, users) => {
    res.json(users);
  });
});

routesForMongoUser.delete('/users/:id', (req, res) => {
  User.deleteOne({'username': req.params.id}, (err, status) => {
    res.json(status);
  });
});

export default routesForMongoUser;