const { pool } = require("./connection");

const deactivateProduct = async (id) => {
    const query = 'UPDATE productos SET isActive = FALSE WHERE productId = $1';
    await pool.query(query, [id]);
};

module.exports = { deactivateProduct };
