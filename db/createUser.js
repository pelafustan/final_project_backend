const { pool } = require("./connection");
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
    const {
        email,
        nombreUsuario,
        nombreTienda,
        password,
        isSeller,
    } = user;

    if (!email && !nombreUsuario && !nombreTienda && !password && (isSeller !== true || isSeller !== false)) {
        throw { code: 400, message: 'Invalid request' };
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    try {
        const query = 'INSERT INTO usuarios (email, nombreUsuario, nombreTienda, passwordHash, isSeller) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [email, nombreUsuario, nombreTienda, passwordHash, isSeller]);
    } catch (error) {
        console.log(error);
        throw { code: 500, message: 'something went wrong' };
    }

};

module.exports = { createUser };
