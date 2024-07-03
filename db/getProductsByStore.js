const { pool } = require("./connection");

const getProductsByStore = async (id) => {
    try {
        const query = 'SELECT listingId AS publicacion, productId AS producto FROM publicaciones WHERE sellerId = $1';
        const { rows } = await pool.query(query, [id]);
        return rows;
    } catch (err) {
        console.log(err);
        throw { code: err.code || 500, message: err.message || 'algo salió mal' };
    }
};

module.exports = { getProductsByStore };
