import express from "express";
import Product from "../../models/mongoose/product";

const routesForMongoProduct = express.Router();

routesForMongoProduct.route('/products')
  .get((req, res) => {
    Product.find((err, products) => {
      res.json(products);
    });
  })
  .post((req, res) => {
    let product = new Product(req.body);
    product.save((err, product) => {
      res.json(product);
    });
  });

  routesForMongoProduct.route('/products/:id')
  .get((req, res) => {
    Product.findOne({'id': req.params.id}, (err, product) => {
      res.json(product);
    })
  })
  .delete((req, res) => {
    Product.deleteOne({'id': req.params.id}, (err, status) => {
      res.json(status);
    });
  });

export default routesForMongoProduct;