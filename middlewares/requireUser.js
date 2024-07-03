const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('sesión inválida');
    }
    next();
};

module.exports = { requireUser };
