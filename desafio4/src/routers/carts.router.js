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

cartsRouter.get("/:cid", (req, res) => {
  let allcarts = carts;
  let idToFind = Number(req.params.cid);
  let cartIndex = allcarts.findIndex((cart) => cart.id === idToFind);
  if (cartIndex === -1) {
    res.send("No existe");
  } else {
    let cartFound = allcarts[cartIndex];
    res.send(cartFound);
  }
});

cartsRouter.post("/", (req, res) => {
  let allCarts = carts;
  let newCart = {
    id: appId,
    products: [],
  };
  appId++;
  allCarts.push(newCart);
  res.status(201).send(newCart);
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  let allCarts = carts;
  let cartToFind = Number(req.params.cid);
  let cartIndex = allCarts.findIndex((cart) => cart.id === cartToFind);

  if (cartIndex === -1) {
    res.send("No existe ese id");
  } else {
    let cartFound = allCarts[cartIndex];

    let allProducts = cartFound.products;
    let productToFind = Number(req.params.pid);
    let productIndex = allProducts.findIndex(
      (product) => product.id === productToFind
    );

    if (productIndex === -1) {
      res.status(400).send("No existe ese producto");
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

// productFound > allProducts > cartFound > allCarts

export { cartsRouter };
