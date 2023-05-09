import { Router } from "express";

const cartsRouter = Router();

let appId = 2;

let carts = [
  { id: 1, products: ["a", "b", "c"] },
  { id: 2, products: ["e", "f", "g"] },
];

// cartsRouter.post("/", (req, res) => {
//   let allCarts = carts;
//   let products = req.body;
//   let array = Array.from(products);
//   let arrayLenght = array.length;

//   if (arrayLenght > 0) {
//     let cart = {
//       id: appId,
//       products: [products],
//     };
//     appId++;
//     allCarts.push(cart);
//     res.status(201).send(cart);
//   } else {
//     res.status(400).send("No se agrego");
//   }
// }); FUNCIONA

// cartsRouter.get("/:cid", (req, res) => {
//   let idToFind = Number(req.params.cid);
//   let allcarts = carts;
//   let cartIndex = allcarts.findIndex((cart) => cart.id === idToFind);
//   if (cartIndex === -1) {
//     res.send("No existe");
//   } else {
//     let cartFound = allcarts[cartIndex];
//     res.send(cartFound);
//   }
// }); FUNCIONA NO TOQUES MAS, DROGADA

export { cartsRouter };
