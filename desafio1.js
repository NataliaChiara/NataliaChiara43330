class ProductManager {
  #id = 0;

  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  /**
   * @param {string} title
   * @param {string} description
   * @param {number} price
   * @param {string} thumbnail
   * @param {number} code
   * @param {number} stock
   */

  addProduct(title, description, price, thumbnail, code, stock) {
    const productCode = this.products.findIndex(
      (product) => product.code === code
    );

    if (
      (productCode === -1) &
      (title != undefined) &
      (description != undefined) &
      (price != undefined) &
      (thumbnail != undefined) &
      (stock != undefined)
    ) {
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      product.id = this.#getId();
      this.products.push(product);
    } else {
      console.log("invalid code");
    }
  }

  #getId() {
    this.#id++;
    return this.#id;
  }

  getProductById(idToFind) {
    const productIndex = this.products.findIndex(
      (product) => product.id === idToFind
    );
    if (productIndex === -1) {
      console.log("Not found");
      return;
    }
    const productFound = this.products[productIndex];

    return productFound;
  }
}

const productManager = new ProductManager();
productManager.addProduct("zapatilla", "talle 37", 8000, "srcImagen", 15, 5);
productManager.addProduct("remera", "talle s", 4000, "srcImagen", 20, 10);
productManager.addProduct("pantalon", "talle 40", 6000, "srcImagen", 20, 15); // no se agrega porque tiene el mismo codigo que el producto de arriba
productManager.addProduct("pollera", "talle 35", 4000, "srcImagen", 25, 10);
productManager.addProduct("bufanda", "tela cuadros", 2000, "srcImagen", 30); // no se agrega porque le falta el parametro de stock
console.log(productManager.getProducts()); // muestra los productos "zapatilla", "remera" y "pollera"
console.log(productManager.getProductById(1)); // muestra el producto "zapatilla"
console.log(productManager.getProductById(4)); // muestra "not found" porque solo llega al id nº3
