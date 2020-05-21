const { Pool } = require("pg");

//Clase con información de la base de datos  

class ServicioPG {
  constructor() {
    this.pool = new Pool({
      user: "dllo_web_udem",
      host: "saurmo.com",
      database: "udem",
      password: "bf5e722cc518fce3c4a57fdb1b6647b0434138370eb1c30f9293ec8e03062b78",
      port: 5432,
    });
  }

// Ejecuta la clase y el metodo se debe hacer
// de forma asincrona para que respuesta tenga un valor
  
async ejecutarSql(sql,params) {
    let respuesta = await this.pool.query(sql,params);
    return respuesta;
  }
}

// Exporta la clase, para poder ser utilizada desde otros archivos

module.exports = ServicioPG;