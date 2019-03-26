import express from 'express';

const routesForProduct = express.Router();

routesForProduct.get('/products', (req, res) => {
    res.send(res.locals.products);
});

routesForProduct.get('/products/:id', (req, res) => {
    let product = res.locals.products.find(product => product.id == req.params.id);
    if(product === undefined) {
        res.sendStatus(404);
    } else {
        res.send(product);
    }    
});

routesForProduct.get('/products/:id/reviews', (req, res) => {
    let product = res.locals.products.find(product => product.id == req.params.id);
    if(product === undefined) {
        res.sendStatus(404);
    } else {
        res.send(product.reviews);
    }        
});

routesForProduct.post('/products', (req, res) => {
    res.locals.products.push(req.body);
    res.send(req.body);
});

export default routesForProduct;