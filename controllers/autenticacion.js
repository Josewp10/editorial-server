const ServicioPg = require("../services/postgress");
const jwt = require("jsonwebtoken");
const SECRET_KEY = '746f4325c687b8823db156b7c9e98dd665a1e3777f501997345b19d9bd99e118754928e78011b5b1bfd66482a17f87bab58bd0d4311f8a9141359a42ddfea07f';

let validarLogin = (usuario) => {
    if (!usuario) {
        throw {
          ok: false,
          message: "La información es obligatoria.",
        };
      }   
      if (!usuario.id) {
        throw { ok: false, message: "La cédula es obligatoria." };
      }
      if (!usuario.clave) {
        throw { ok: false, message: "La clave es obligatoria." };
      }
  };

  let consultarUsuario = async (usuario) => {
    let _service = new ServicioPg();
    let sql = `SELECT * FROM acc_usuarios WHERE id = $1 AND clave = md5($2)`;
    let valores = [usuario.id, usuario.clave]
    let respuesta = await _service.ejecutarSql(sql, valores);
    return respuesta;
  };
  
  let generarToken = (usuario) => {
    delete usuario.clave;
    let token = jwt.sign(usuario, SECRET_KEY, { expiresIn: "1h" });
    return token;
  };
  
  let verificarToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
  };
  
  module.exports = {
    validarLogin,
    consultarUsuario,
    generarToken,
    verificarToken,
  };