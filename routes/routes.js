const { requireUser } = require('../middlewares/requireUser');
const { registerHandler,
    getUserDataHandler,
    getTransactionsByUserHandler,
    processTransactionHandler,
} = require('../controllers/user.controller');
const {
    getProductsHandler,
    getProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    reactivateProductHandler,
    getProductsByStoreHandler,
} = require('../controllers/products.controller');
const {
    createSessionHandler,
    getSessionHandler,
    deleteSessionHandler,
} = require('../controllers/session.controller');

const routes = (app) => {
    // login
    app.post('/sesion', createSessionHandler);

    // get current session
    app.get('/sesion', requireUser, getSessionHandler);

    // logout
    app.delete('/sesion', requireUser, deleteSessionHandler);

    // user registration
    app.post('/registro', registerHandler);

    // list products
    app.get('/productos', getProductsHandler);

    // product details
    app.get('/productos/:id', getProductHandler);

    // create product
    app.post('/productos', createProductHandler);

    // update product
    app.put('/productos/:id', requireUser, updateProductHandler);

    // deactivate product
    app.delete('/productos/:id', requireUser, deleteProductHandler);

    // reactivate product
    app.patch('/productos/:id', requireUser, reactivateProductHandler);

    // get user data
    app.get('/usuario', requireUser, getUserDataHandler);

    // products by store
    app.get('/productos/tienda/:id', getProductsByStoreHandler);

    // transactions by user
    app.get('usuario/transacciones', requireUser, getTransactionsByUserHandler);

    // submitting transaction 
    app.post('/comprar', requireUser, processTransactionHandler);
};

module.exports = { routes };
