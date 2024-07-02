const { pool } = require("./connection");

const createProduct = async (nombre, descripcion, categoria) => {
    if (!nombre || !descripcion || !categoria) {
        throw { code: 400, message: 'bad request' };
    }

    const query = 'INSERT INTO productos (nombre, descripcion, categoria) VALUES ($1, $2, $3) RETURNING productId as id';
    const { rows: id } = pool.query(query, [nombre, descripcion, categoria]);
    return id;
};

module.exports = { createProduct };
