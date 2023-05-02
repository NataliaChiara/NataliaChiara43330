import fs from "fs";

export default class ProductManager {
  #id = 0;
  constructor() {
    if (!fs.existsSync("./products.json")) {
      fs.writeFileSync("./products.json", JSON.stringify([]));
    }
    this.path = "./products.json";
  }
  async getProducts() {
    const products = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(products);
  }

  /**
   * @param {object} product
   */
  async addProduct(product) {
    let { id, ...rest } = product;

    let newProduct = {
      ...rest,
      id: this.#getID(),
    };

    let products = await this.getProducts();
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  #getID() {
    this.#id++;
    return this.#id;
  }

  async getProductById(id) {
    let products = await this.getProducts();
    let product = products.filter((product) => product.id === id);
    return product[0];
  }

  async updateProduct(id, edit) {
    let products = await this.getProducts();
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...edit };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    const index = products.findIndex((item) => item.id === id);
    products.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }
}

const product = new ProductManager();

async function test() {
  //   console.log(await product.getProducts()); FUNCIONA
  //   await product.addProduct({
  //     title: "asd",
  //     description: "asd",
  //     price: 1000,
  //     thumbnail: "ruta de imagen",
  //     code: "asd",
  //     stock: 20,
  //   }); FUNCIONA
  //   console.log(await product.getProductById(2)); FUNCIONA
  // await product.updateProduct(10, { title: "asd" }); FUNCIONA
  // await product.deleteProduct(9); FUNCIONA
}

// test();
