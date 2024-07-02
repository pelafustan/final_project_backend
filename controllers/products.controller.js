const { getProduct } = require('../db/getProduct');
const { getProductos } = require('../db/getProducts');
const { createProduct } = require('../db/createProduct');
const { updateProduct } = require('../db/updateProduct');
const { deactivateProduct } = require('../db/deactivateProduct');
const { reactivateProduct } = require('../db/reactivateProduct');

const getProductsHandler = async (req, res) => {
    try {
        const { limits, order_by, page } = req.query;
        console.log(req.query);
        const productos = await getProductos(limits, order_by, page);
        res.status(200).send(productos);
    } catch (error) {
        console.log(error);
        res.status(400).send({});
    }
};

const getProductHandler = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const producto = await getProduct(productId);
        res.status(200).send(producto);
    } catch (err) {
        console.log(err);
        res.status(err.code ? err.code : 500).send(err.message ? err.message : 'Unexpected error');
    }
};

const createProductHandler = async (req, res) => {
    try {
        const { nombre, descripcion, categoria } = req.body;
        const id = await createProduct(nombre, descripcion, categoria);
        res.status(200).send({ message: `usuario ${id} creado exitosamente` });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ message: err.message || 'algo salió mal' })
    }
};

const updateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria } = req.body;
        await updateProduct(id, nombre, descripcion, categoria);
        res.status(200).send({ message: `producto ${id} fue actualizado con éxito` });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ message: err.message || 'algo salió mal' });
    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deactivateProduct(id);
        res.status(200).send({ message: `producto ${id} ha sido desactivado` });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ message: err.message || 'algo salió mal' });
    }
};

const reactivateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await reactivateProduct(id);
        res.status(200).send({ message: `producto ${id} ha sido activado` });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({ message: err.message || 'algo salió mal' });
    }
}

const getProductsByStoreHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const productos = await getProductsByStore(id);
        res.status(200).send(productos);
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).send({message: err.message || 'algo salió mal' })
    }
};

module.exports = {
    getProductsHandler,
    getProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    reactivateProductHandler,
    getProductsByStoreHandler,
};
