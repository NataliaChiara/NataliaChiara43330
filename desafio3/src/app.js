import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    let allProducts = await productManager.getProducts();
    let limit = req.query.limit;

    if (limit) {
      res.send(allProducts.slice(0, limit));
    } else {
      res.send(allProducts);
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let product = await productManager.getProductById(Number(id));
    res.send(product);
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, () => {
  console.log("Estoy escuchando el 8080");
});
