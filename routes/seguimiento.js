const express = require("express");
const router = express.Router();
const {
  validarSeguimiento,
  guardarSeguimiento,
  consultarSeguimiento,
  consultarSeguimientos,
  consultarPorObra,
  eliminarSeguimiento,
  editarSeguimiento,
} = require("../controllers/seguimiento");

//Trae todos los seguimientos
router.get("/seguimiento", async (req, res) => {
  let info_seguimiento = await req.body;
  consultarSeguimientos(info_seguimiento)
    .then((seguimientoDB) => {
      let seguimiento = seguimientoDB.rows;
      res.send({
        ok: true,
        info: seguimiento,
        mensaje: "Seguimientos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Trae un seguimiento filtrado por el Id
router.get("/seguimiento/:id", async (req, res) => {
  let id = req.params.id;
  consultarPorObra(id)
    .then((seguimientoDB) => {
      let seguimiento = seguimientoDB.rows;
      res.send({
        ok: true,
        info: seguimiento,
        mensaje: "Seguimiento consultado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/seguimiento/seg/:id", async (req, res) => {
  let id = req.params.id;
  consultarSeguimiento(id)
    .then((seguimientoDB) => {
      let seguimiento = seguimientoDB.rows;
      res.send({
        ok: true,
        info: seguimiento,
        mensaje: "Seguimiento consultado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Trae el titulo de la propuesta
router.get("/seguimiento", async (req, res) => {
  let titulo = await req.body;
  consultarPropuesta(titulo)
    .then((tituloDB) => {
      let seguimientoTitulo = tituloDB.rows;
      res.send({
        ok: true,
        info: seguimientoTitulo,
        mensaje: "Nombre Tarea Consultada",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Guardamos

router.post("/seguimiento", (req, res) => {
  try {
    let info_seguimiento = req.body;

    validarSeguimiento(info_seguimiento);

    guardarSeguimiento(info_seguimiento)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Seguimiento guardado",
          info: info_seguimiento,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Eliminar

router.delete("/seguimiento/:id", (req, res) => {
  let id = req.params.id;
  eliminarSeguimiento(id)
    .then((respuestaDB) => {
      console.log("LOLO");
      res.send({ ok: true, mensaje: "Seguimiento eliminado", info: { id } });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Actualizar

router.put("/seguimiento/:id", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.id;
    let info_seguimiento = req.body;

    // Actualiza el usuario en base de datos
    editarSeguimiento(info_seguimiento, id)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Seguimiento editado",
          info: info_seguimiento,
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

//Exportación del router

module.exports = router;
