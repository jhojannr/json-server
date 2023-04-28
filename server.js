const jsonServer = require("json-server");
const server = jsonServer.create();

const users = jsonServer.router("./db/users.json");
const router = jsonServer.router("./db/results.json");

const middlewares = jsonServer.defaults();
const port = 3000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/users": "/users",
    "/vehicles/controlt": "/posts",
  })
);

/* Ruta Especifica */
server.get("/users", (req, res, next) => {
  if (res.status(200)) {
  }
  next();
});

/* Rutas Generales */
server.use((req, res, next) => {
  if (req.method === "GET") {
  }
  next();
});

server.use(users);
server.use(router);

server.listen(port, () => {
  console.log("JSON Server se está ejecutando");
});
