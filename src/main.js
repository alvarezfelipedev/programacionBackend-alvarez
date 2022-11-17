const { servidor } = require("./servidor.js");

const server = servidor.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
