const { verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.utils');

const deserializeUser = (req, _, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
        next();
    }

    const { payload, expired } = verifyAccessToken(accessToken);

    if (payload) {
        req.user = payload
        next();
    }

    const { payload: refresh } = expired && refreshToken
        ? verifyRefreshToken(refreshToken)
        : { payload: null };

    if (!refresh) {
        next();
    }

    next();
};

module.exports = { deserializeUser };
