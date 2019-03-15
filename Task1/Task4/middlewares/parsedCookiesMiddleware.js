export default function parsedCookies(req, res, next) {
    req.parsedCookies = req.cookies;
    next();
}