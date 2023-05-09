import { Router } from "express";

const cartsRouter = Router();

let appId = 3;

let carts = [
  {
    id: 1,
    products: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
    ],
  },
  {
    id: 2,
    products: [
      { id: 3, quantity: 3 },
      { id: 4, quantity: 4 },
    ],
  },
];

cartsRouter.post("/", (req, res) => {
  let newCart = {
    id: appId,
    products: [],
  };
  appId++;
  carts.push(newCart);
  res.status(201).send(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
  let cartIndex = carts.findIndex((cart) => cart.id === Number(req.params.cid));
  if (cartIndex === -1) {
    res.send("No existe un carrito con ese id");
  } else {
    res.send(carts[cartIndex]);
  }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  let cartIndex = carts.findIndex((cart) => cart.id === Number(req.params.cid));
  if (cartIndex === -1) {
    res.send("No existe un carrito con ese id");
  } else {
    let cartFound = carts[cartIndex];
    let allProducts = cartFound.products;
    let productIndex = allProducts.findIndex(
      (product) => product.id === Number(req.params.pid)
    );

    if (productIndex === -1) {
      res.send("No existe un producto con ese id");
    } else {
      let productFound = allProducts[productIndex];
      let newQuantity = req.body.quantity;
      productFound = {
        ...productFound,
        quantity: productFound.quantity + newQuantity,
      };
      res.status(201).send(productFound);
    }
  }
});

export { cartsRouter };
