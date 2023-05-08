import express from "express";
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("Escuchando el 8080");
});
