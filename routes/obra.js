const express = require("express");
const router = express.Router();
const {
  validarObra,
  guardarObra,
  consultarObra,
  consultarObras,
  eliminarObra,
  editarObra,
  consultarTareas,
  infoAutor,
} = require("../controllers/obra");

//Trae todas las obras de la base de datos
router.get("/obra", async (req, res) => {
  let info_obras = await req.body;
  consultarObras()
    .then((obraDB) => {
      let obra = obraDB.rows;
      res.send({ ok: true, info: obra, mensaje: "Obras consultadas" });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Trae una obra filtrada por el id
router.get("/obra/:id", async (req, res) => {
  let id = req.params.id;

  if (id == "tareas") {
    consultarTareas()
      .then((tareaDB) => {
        let tareas = tareaDB.rows;
        res.send({ ok: true, info: tareas, mensaje: "Tareas consultadas" });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } else {
    consultarObra(id)
      .then((obraDB) => {
        let obra = obraDB.rows;
        res.send({ ok: true, info: obra, mensaje: "Obra consultada" });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
});

//Trae una obra filtrada por el id
router.get("/obra/autor/:id", async (req, res) => {
  let id = req.params.id;

  infoAutor(id)
    .then((autorDB) => {
      let autor = autorDB.rows;
      res.send({ ok: true, info: autor, mensaje: "Autor consultado" });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

//Guardamos

router.post("/obra", (req, res) => {
  try {
    let info_obra = req.body;

    validarObra(info_obra);

    guardarObra(info_obra)
      .then((respuestaDB) => {
        console.log("entro");

        res.send({ ok: true, mensaje: "Obra guardada", info: info_obra });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

//Eliminar

router.delete("/obra/:id", (req, res) => {
  let id = req.params.id;
  eliminarObra(id)
    .then((respuestaDB) => {
      console.log("LOLO");
      res.send({ ok: true, mensaje: "Obra eliminada", info: { id } });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

//Actualizar

router.put("/obra/:id", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id = req.params.id;
    let info_obra = req.body;

    // Actualiza el usuario en base de datos
    editarObra(info_obra, id)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Obra editada", info: info_obra });
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
