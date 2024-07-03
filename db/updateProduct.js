const { pool } = require("./connection");

const updateProduct = async (id, nombre, descripcion, categoria) => {
    if (!nombre || !descripcion || !categoria) {
        throw { code: 400, message: 'bad request' };
    }

    const values = [];

    if (nombre) {
        values.push('nombre');
        values.push(nombre);
        placeholders.push(`$${values.length - 1} = $${values.length}`);
    }

    if (descripcion) {
        values.push('descripcion');
        values.push(descripcion);
        placeholders.push(`$${values.length - 1} = $${values.length}`);
    }

    if (categoria) {
        values.push('categoria');
        values.push(categoria);
        placeholders.push(`$${values.length - 1} = $${values.length}`);
    }

    const query = `UPDATE productos SET ${placeholders.join(',')} WHERE productId = ${placeholders.length + 1}`

    const { rows: updated } = await pool(query, [...values, id]);

    console.log(updated);
    return updated;
};

module.exports = { updateProduct };
