import { Router } from "express";

const products = [
  {
    id: 1,
    title: "tokyo revengers",
    description: "autor: ken wakui",
    price: 1000,
    thumbnail: "ruta de imagen",
    code: "a1",
    stock: 20,
  },
  {
    id: 2,
    title: "chainsaw man",
    description: "autor: tatsuki fujimoto",
    price: 1000,
    thumbnail: "ruta de imagen",
    code: "a2",
    stock: 20,
  },
  {
    id: 3,
    title: "haikyu",
    description: "autor: haruichi furudate",
    price: 1000,
    thumbnail: "ruta de imagen",
    code: "a3",
    stock: 20,
  },
];
const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  let allProducts = products;
  let limit = req.query.limit;

  if (limit) {
    res.send(allProducts.slice(0, limit));
  } else {
    res.send(allProducts);
  }
});

export { productsRouter };
