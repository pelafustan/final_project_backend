const { pool } = require("./connection");

const getProduct = async (productId) => {
    const productQuery = 'SELECT * FROM productos WHERE productId = $1';
    const listingsQuery = 'SELECT listingId AS id, precio, stock, sellerId AS tienda FROM publicaciones WHERE productId = $1';
    const { rows: producto } = await pool.query(productQuery, [productId]);
    const { rows: publicaciones } = await pool.query(listingsQuery, [productId]);

    if (!producto[0].isactive) return {};

    return {
        categoria: producto[0].categoryid,
        producto: producto[0].nombre,
        publicaciones: publicaciones,
    }
};

module.exports = { getProduct };
