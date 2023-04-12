// Realizar una clase “ProductManager” que gestione un conjunto de productos.

// -Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

// -Cada producto que gestione debe contar con las propiedades:
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)

// -Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// Al agregarlo, debe crearse con un id autoincrementable
// Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

// -Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// En caso de no coincidir ningún id, mostrar en consola un error “Not found”

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
