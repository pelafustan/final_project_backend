const { getUser } = require('../db/getUser');
const { createSession } = require('../db/createSession');
const { signAccessToken, signRefreshToken, verifyAccessToken } = require('../utils/jwt.utils');

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

const deleteSessionHandler = (_, res) => {
    res.cookie('accessToken', '', {
        maxAge: 0,
        httpOnly: true,
    });

    res.cookie('refreshToken', '', {
        maxAge: 0,
        httpOnly: true,
    });

    res.send({ success: true });
};

module.exports = { createSessionHandler, getSessionHandler, deleteSessionHandler };
