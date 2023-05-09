import { Router } from "express";

const productsRouter = Router();

let appId = 4;

let products = [
  {
    id: 1,
    title: "tokyo revengers",
    description: "autor: ken wakui",
    code: "a1",
    price: 1000,
    status: true,
    stock: 20,
    category: "libros",
    thumbnails: ["ruta 1", "ruta 2", "ruta 3"],
  },
  {
    id: 2,
    title: "chainsaw man",
    description: "autor: tatsuki fujimoto",
    code: "a2",
    price: 1000,
    status: true,
    stock: 20,
    category: "libros",
    thumbnails: ["ruta 1", "ruta 2", "ruta 3"],
  },
  {
    id: 3,
    title: "haikyu",
    description: "autor: haruichi furudate",
    code: "a3",
    price: 1000,
    status: true,
    stock: 20,
    category: "libros",
    thumbnails: ["ruta 1", "ruta 2", "ruta 3"],
  },
];

productsRouter.get("/", (req, res) => {
  let allProducts = products;
  let limit = Number(req.query.limit);

  if (limit) {
    res.send(allProducts.slice(0, limit));
  } else {
    res.send(allProducts);
  }
});

productsRouter.get("/:id", (req, res) => {
  let idToFind = Number(req.params.id);
  let allProducts = products;
  let productIndex = allProducts.findIndex(
    (product) => product.id === idToFind
  );
  if (productIndex === -1) {
    res.send("No existe");
  } else {
    let productFound = allProducts[productIndex];
    res.send(productFound);
  }
});

productsRouter.post("/", (req, res) => {
  let product = req.body;
  let allProducts = products;
  let productCode = allProducts.findIndex((item) => item.code === product.code);

  if (
    (productCode === -1) &
    (product.title != undefined) &
    (product.description != undefined) &
    (product.price != undefined) &
    (product.status != undefined) &
    (product.stock != undefined) &
    (product.category != undefined)
  ) {
    product.id = appId;
    appId++;
    allProducts.push(product);
    res.status(201).send(product);
  } else {
    res.status(400).send("invalid code/No ingreso todos los campos");
  }
});

productsRouter.put("/", (req, res) => {
  let edit = req.body;
  let id = Number(edit.id);
  let allProducts = products;

  if (id != undefined) {
    let index = allProducts.findIndex((item) => item.id === id);
    if (index !== -1) {
      allProducts[index] = { ...allProducts[index], ...edit };
      res.status(201).send(allProducts);
    } else {
      res.status(400).send("No se encontro el objeto a editar");
    }
  } else {
    res.status(400).send("Id invalido");
  }
});

productsRouter.delete("/", (req, res) => {
  let id = Number(req.body.id);
  let allProducts = products;

  if (id != undefined) {
    let index = allProducts.findIndex((item) => item.id === id);
    if (index !== -1) {
      allProducts.splice(index, 1);
      res.status(201).send(allProducts);
    } else {
      res.status(400).send("No se encontro el objeto a eliminar");
    }
  } else {
    res.status(400).send("Id invalido");
  }
});

export { productsRouter };
