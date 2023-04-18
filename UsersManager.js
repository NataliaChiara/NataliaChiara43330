const fs = require("fs");

class UserManager {
  constructor() {
    fs.promises.writeFile("./users.json", JSON.stringify([]));
  }

  async addUser(user) {
    try {
      const actualUsers = await this.getUsers();
      actualUsers.push(user);
      await fs.promises.writeFile("./users.json", JSON.stringify(actualUsers));
      JSON.parse(actualUsers);
    } catch (err) {
      console.log("No puedo agregar usuarios");
    }
  }

  async getUsers() {
    try {
      const actualUsers = await fs.promises.readFile("./users.json", "utf-8");
      return JSON.parse(actualUsers);
    } catch (err) {
      console.log("No puedo darte usuarios");
    }
  }
}

const users = new UserManager();
setTimeout(() => {}, 1000);

const test = async () => {
  try {
    await users.addUser({
      nombre: "Pato",
      apellido: "Decima",
      edad: 27,
      curso: 43330,
    });
    await users.addUser({
      nombre: "Julian",
      apellido: "Fuentes",
      edad: 23,
      curso: 43330,
    });

    console.log(users.getUsers());
  } catch (err) {
    console.log("Salio mal el Test");
  }
};

test();
