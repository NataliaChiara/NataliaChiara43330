import { Router } from "express";

let id = 4;

let products = [
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

productsRouter.get("/:id", (req, res) => {
  const idToFind = Number(req.params.id);
  const allProducts = products;
  const productIndex = allProducts.findIndex(
    (product) => product.id === idToFind
  );
  if (productIndex === -1) {
    res.send("No existe");
  } else {
    const productFound = allProducts[productIndex];
    res.send(productFound);
  }
});

productsRouter.post("/", (req, res) => {
  let product = req.body;

  const productCode = products.findIndex((item) => item.code === product.code);

  if (
    (productCode === -1) &
    (product.title != undefined) &
    (product.description != undefined) &
    (product.price != undefined) &
    (product.status != undefined) &
    (product.stock != undefined) &
    (product.category != undefined)
  ) {
    product.id = id;
    id++;
    let allProducts = products;
    allProducts.push(product);
    res.status(201).send(product);
  } else {
    res.status(400).send("invalid code/No ingreso todos los campos");
  }
});

export { productsRouter };
