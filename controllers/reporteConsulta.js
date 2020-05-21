const ServicioPg = require("../services/postgress");


let reporteUno = async () => {
    let _servicio = new ServicioPg();
    let sql = `select facultad, titulo,estado,
    concat(acc_usuarios.nombre,acc_usuarios.apellidos) as autor from pu_seguimientos_propuestas
    inner join pu_propuestas_publicaciones on pu_propuestas_publicaciones.id = pu_seguimientos_propuestas.id_propuesta
    inner join pu_autores_publicaciones on pu_autores_publicaciones.id_publicacion = pu_seguimientos_propuestas.id_propuesta
    inner join acc_usuarios on pu_autores_publicaciones.id_autor = acc_usuarios.id 
    where estado = 'aprobado'`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

module.exports = { reporteUno };