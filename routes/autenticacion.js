const express = require("express");
const router = express.Router();
const _controller = require("../controllers/autenticacion");


router.use((req, res, next) => {
    try {
      let url = req.url;
      if (url === "/login") {
        next();
      } else {
        let token = req.headers.token;
        let verificar = _controller.verificarToken(token);
        next();
      }
    } catch (error) {
      res.status(401).send({ ok: false, info: error, message: "No autenticado" });
    }
  });
  
  router.post("/login", (req, res) => {
    try {
      let body = req.body;
      _controller.validarLogin(body);
      _controller
        .consultarUsuario(body)
        .then((answerDB) => {
          let usuario = answerDB.rowCount > 0 ? answerDB.rows[0] : undefined;
  
          if (usuario) {
            let token = _controller.generarToken(usuario);
            res.status(200).send({
              ok: true,
              info: token,
              primera_vez: usuario.primera_vez,
              rol: usuario.rol,
              message: "Usuario autenticada",
            });
          } else {
            res.status(400).send({
              ok: false,
              info: {},
              message: "Documento y/o clave incorrecta.",
            });
          }
        })
        .catch((error) => {
          res.status(500).send({fallo:error,mensaje:"aqui estoy"});
        });
    } catch (error) {
      console.log(error);
      
      res.status(400).send(error);
    }
  });
  
  router.get("/verificar", (req, res) => {
    try {
      let token = req.headers.token;
      let verificar = _controlador.verificarToken(token);
      next();
    }catch (error) {
    res.status(401).send({
      ok: false,
      info: error,
      mensaje: "No autenticado.",
    });
  }
});


  module.exports = router;