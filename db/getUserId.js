const { pool } = require('./connection');

const getUserId = async (email) => {
    const query = 'SELECT userId FROM usuarios WHERE email = $1';
    const { rows: [{ userid: userId }] } = await pool.query(query, [email]);

    if (!userId) {
        return null;
    }

    return userId;
};

module.exports = { getUserId };
