
const express = require("express");
const router = express.Router();
const { reporteUno} = require("../controllers/reporteConsulta");


//Trae todas las obras de la base de datos
router.get("/reporteConsulta", async (req, res) => {
    let info_obras = await req.body;
    reporteUno()
        .then(obraDB => {
            let obra = obraDB.rows;
            res.send({ ok: true, info: obra, mensaje: "Reporte Consultado" });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;