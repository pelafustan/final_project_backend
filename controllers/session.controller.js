const { getUser } = require('../db/getUser');
const { createSession } = require('../db/createSession');
const { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../utils/jwt.utils');
const { invalidateSession } = require('../db/invalidateSession');

const createSessionHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        // retrieve user data
        const user = await getUser(email, password);

        const session = await createSession(email);

        // access token generation
        const accessToken = signAccessToken(user);

        // refresh token generation
        const refreshToken = signRefreshToken(session);

        // http-only cookies
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 3600 * 24 * 15,
            httpOnly: true,
        });

        res.status(200).send(verifyAccessToken(accessToken).payload);
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'invalid email or password' });
    }
};

const getSessionHandler = (req, res) => {
    res.send(req.user);
};

const deleteSessionHandler = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        const { payload } = verifyRefreshToken(refreshToken);

        res.cookie('accessToken', '', {
            maxAge: 0,
            httpOnly: true,
        });

        res.cookie('refreshToken', '', {
            maxAge: 0,
            httpOnly: true,
        });

        await invalidateSession(payload.sessionId);

        res.send({ success: true });

    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ message: err.message || 'algo salió mal' });
    }
};

module.exports = { createSessionHandler, getSessionHandler, deleteSessionHandler };
