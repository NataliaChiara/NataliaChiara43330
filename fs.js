const fs = require("fs");

const date = new Date();

console.log(date);

fs.writeFile("./fsSync.txt", `${date}`, (err) => {
  if (err) return console.log("No se escribir");

  fs.readFile("./fsSync.txt", "utf-8", (err, contenido) => {
    if (err) return console.log("No se Leer");
    console.log(contenido);
  });
});
