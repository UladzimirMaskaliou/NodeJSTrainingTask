import express from 'express';
import jwt from 'jsonwebtoken';

const authRoute = express.Router();

authRoute.post('/auth', (req, res) => {
     let user = res.locals.users.find(user =>
        user.name === req.body.username && user.password === req.body.password);

    if (user === undefined) {
        res.status(404).send({'code': 404, 'message': 'Not found'});        
    } else {
        let payload = {'id': user.id, 'name': user.name};
        let token = jwt.sign(payload, 'secret', {expiresIn: 90});
        res.send({
            'code': 200,
            'message': 'OK',
            'data': {
                'user': {
                    'email': user.email,
                    'username': user.name
                }
            },
            'token': token
        }); 
    }
});

export default authRoute;