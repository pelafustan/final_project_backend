const { pool } = require('./connection');

module.exports.invalidateSession = async (sessionId) => {
    try {
        const query = 'UPDATE sesiones SET isValid = FALSE WHERE sessionId = $1';
        await pool.query(query, [sessionId]);
    } catch (error) {
        throw { code: 500, message: error };
    }
};
