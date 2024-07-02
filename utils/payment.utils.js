const processPayment = (carrito) => {
    console.log(carrito);
    return new Promise((res, _) => {
        setTimeout(() => res(true), 2000);
    });
};
