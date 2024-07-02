const { pool } = require("./connection");

const reactivateProduct = async (id) => {
    const query = 'UPDATE productos SET isActive = TRUE WHERE productId = $1';
    await pool.query(query, [id]);
};

module.exports = { reactivateProduct };
