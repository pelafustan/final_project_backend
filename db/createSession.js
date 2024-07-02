const { getUserId } = require('./getUserId');
const { pool } = require('./connection');

const createSession = async (email) => {
    try {
        const userId = await getUserId(email);
        const query = 'INSERT INTO sesiones (userId) VALUES ($1) RETURNING sessionId';
        const { rows: [sessionId] } = await pool.query(query, [userId]);
        return {
            sessionId,
            valid: true,
        };
    } catch (err) {
        console.log(err);
        return { valid: false };
    }

};

module.exports = { createSession };
