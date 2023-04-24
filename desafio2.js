const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      id: products.length + 1,
      ...product,
    };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path);
      const products = JSON.parse(data.toString());
      return products;
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    return product;
  }

  async updateProduct(id, updateFields) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = {
      ...products[productIndex],
      ...updateFields,
      id,
    };
    products[productIndex] = updatedProduct;
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter((p) => p.id !== id);
    await fs.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
  }
}

// Ejemplo de uso
const productManager = new ProductManager("./productos.json");

async function test() {
  await productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 100,
    thumbnail: "/ruta/a/imagen1.jpg",
    code: "P001",
    stock: 10,
  });

  const products = await productManager.getProducts();
  console.log(products);

  const product = await productManager.getProductById(1);
  console.log(product);

  await productManager.updateProduct(1, { price: 150 });
  const updatedProduct = await productManager.getProductById(1);
  console.log(updatedProduct);

  await productManager.deleteProduct(1);
  const remainingProducts = await productManager.getProducts();
  console.log(remainingProducts);
}

test();
