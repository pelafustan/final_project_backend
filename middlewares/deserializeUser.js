const { verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.utils');

const deserializeUser = (req, _, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
        next();
    }

    const { payload, expiredAT } = verifyAccessToken(accessToken);

    if (!expiredAT) {
        const { expiredRT } = verifyRefreshToken(refreshToken);
        req.user = !expiredRT ? payload : null;
    };

    next();
};

module.exports = { deserializeUser };
