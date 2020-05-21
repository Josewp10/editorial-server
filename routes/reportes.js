const express = require("express");
const router = express.Router();


const { PassThrough } = require("stream");
const { crearPDF } = require("../services/reportes/jsreport");
router.get("/pdf/publicaciones", async (req, res) => {
  try {
    res.set("Content-disposition", "attachment; filename=reporte.pdf");

    let info = {
      nombre: "autor",
      people: ["UdeM", "Editorial", "propuesta"],
    };
    let bufferPDF = await crearPDF(info, "reportes");

    let stream = new PassThrough();
    stream.end(bufferPDF);
    stream.pipe(res);
  
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;