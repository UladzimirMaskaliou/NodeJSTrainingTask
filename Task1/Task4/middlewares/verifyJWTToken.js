import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).send({'code': 401, 'message': 'Failed to authenticate token.'});
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({'code': 401, 'message': 'No token provided'});
    }
}