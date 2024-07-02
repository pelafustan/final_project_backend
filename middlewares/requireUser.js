const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('invalid session');
    }
    next();
};

module.exports = { requireUser };
