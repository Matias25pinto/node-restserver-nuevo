const express = require("express");
const { dbConnection } = require("../database/config");
var cors = require("cors");

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath     = "/api/auth";
    //Conectar a la BD
    this.conectarBD();
    //Middlewares
    this.middleware();
    //Rutas
    this.routes();
  }

  async conectarBD() {
    await dbConnection();
  }

  routes() {
    //Ruta de auth
    this.app.use(this.authPath, require("../routes/auth"));
    //Ruta de usuarios
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  middleware() {
    //CORS, es un middleware para gestionar el acceso a la api los navegadores lo piden de manera obligatoria
    this.app.use(cors());

    //JSON, es un middleware que lee y luego parsea lo enviado en el body a un objeto json
    this.app.use(express.json());

    //Es un middleware que permite hacer publica una carpeta
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("El restserver se esta ejecutando en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
