import express from 'express';
import jwt from 'jsonwebtoken';

const authRoute = express.Router();

authRoute.post('/auth', (req, res) => {
    res.locals.user.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(user => {
    if (!user) {
        res.status(404).send({'code': 404, 'message': 'Not found'});        
    } else {
        let payload = {'id': user.id, 'username': user.username};
        let token = jwt.sign(payload, 'secret', {expiresIn: 90});
        res.send({
            'code': 200,
            'message': 'OK',
            'data': {
                'user': {
                    'email': user.email,
                    'username': user.username
                }
            },
            'token': token
        }); 
    }
    });
});

export default authRoute;