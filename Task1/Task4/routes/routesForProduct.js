import express from 'express';

const routesForProduct = express.Router();

routesForProduct.get('/products', (req, res) => {
    res.locals.product.findAll().then(products => res.json(products));
});

routesForProduct.get('/products/:id', (req, res) => {
    res.locals.product.findByPk(req.params.id).then(product => res.json(product));   
});

routesForProduct.get('/products/:id/reviews', (req, res) => {
    res.locals.review.findAll({where: {productId: req.params.id}}).then(reviews => res.json(reviews));        
});

routesForProduct.post('/products', (req, res) => {
    res.locals.product.create(req.body);
    res.send(req.body);
});

export default routesForProduct;