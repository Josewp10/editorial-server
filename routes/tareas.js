const express = require("express");
const router = express.Router();
const { validarTarea,
    guardarTarea,
    consultarTareas,consultarTarea,eliminarTarea,editarTarea } = require("../controllers/tareas");


//Trae todas las tareas dentro de la base de datos
router.get("/tareas", async (req, res) => {
    let info_tareas = await req.body;
    consultarTareas()
        .then(tareasDB => {
            let tareas = tareasDB.rows;
            res.send({ ok: true, info: tareas, mensaje: "Tareas consultadas" });
        })
        .catch((error) => {
            res.send(error);
        });
});

//Trae una tarea filtrada por el Id
router.get("/tareas/:id", async (req, res) => {
  let id = req.params.id;
  
  consultarTarea(id)
      .then(tareasDB => {
          let tareas = tareasDB.rows;
          res.send({ ok: true, info: tareas, mensaje: "Tarea consultada" });
      })
      .catch((error) => {
        console.log(error);
          res.send(error);
      });
});

//Guardamos 

router.post("/tareas", (req, res) => {
    try {
        let info_tarea = req.body;

        validarTarea(info_tarea);

        guardarTarea(info_tarea)
            .then(respuestaDB => {
                console.log("entro");
                
                res.send({ ok: true, mensaje: "Tarea guardada", info: info_tarea });
            })
            .catch(error => {
                res.send(error);
            });
    } catch (error) {
        res.send(error);
    }

});


//Eliminar


router.delete("/tareas/:id", (req, res) => {
    let id = req.params.id;
    eliminarTarea(id)
      .then((respuestaDB) => {
        console.log("LOLO")
        res.send({ ok: true,  mensaje: "Tarea eliminada", info: {id} });
      })
      .catch((error) => {
        res.send(error);
      });
  });
  
  //Actualizar

 
router.put("/tareas/:id", (req, res) => {
    try {
      //Capturar el body desde la solicitud
      let id = req.params.id;
      let info_tarea = req.body;
  
      // Actualiza el usuario en base de datos
      editarTarea(info_tarea, id)
        .then(respuestaDB => {
          res.send({ ok: true, mensaje: "Tarea editada", info: info_tarea });
        })
        .catch(error => {
          res.send(error);
        });
  
      // Responder
    } catch (error) {
      res.send(error);
    }
    
  });


//Exportación del router

module.exports = router;