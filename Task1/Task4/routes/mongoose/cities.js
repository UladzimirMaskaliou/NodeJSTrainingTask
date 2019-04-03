import express from "express";
import City from "../../models/mongoose/city";

const routesForMongoCity = express.Router();

routesForMongoCity.get('/random', (req, res) => {
  City.count().exec(function (err, count) {
    let random = Math.floor(Math.random() * count);
    City.findOne().skip(random).exec((err, result) => {
      res.json(result);
    });
  });
});

routesForMongoCity.route('/cities')
  .get((req, res) => {
    City.find((err, products) => {
      res.json(products);
    });
  })
  .post((req, res) => {
    let city = new City(req.body);    
    city.save((err, city) => {
      if (err) throw new Error(err);
      res.json(city);
    });
  });

  routesForMongoCity.route('/cities/:id')
  .put((req, res) => {
    City.findOneAndUpdate(
      {'name': req.params.id},
      req.body, 
      {upsert: true, new: true, runValidators: true}, 
      function (err, doc) {        
         res.json(doc); 
      });
  })
  .delete((req, res) => {
    City.deleteOne({'name': req.params.id}, (err, status) => {
      res.json(status);
    });
  });

export default routesForMongoCity;