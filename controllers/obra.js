const ServicioPg = require("../services/postgress");

// se valida la informacion

let validarObra = (obra) => {
  if (!obra) {
    throw {
      ok: false,
      mensaje: "Ingresar información de la obra",
    };
  } else if (!obra.id) {
    throw {
      ok: false,
      mensaje: "Ingresar el id de la Obra",
    };
  } else if (!obra.titulo) {
    throw {
      ok: false,
      mensaje: "Ingresar el titulo de la Obra ",
    };
  } else if (!obra.facultad) {
    throw {
      ok: false,
      mensaje: "Ingresar la facultad de la Obra",
    };
  } else if (!obra.tipo_publicacion) {
    throw {
      ok: false,
      mensaje: "Ingresar el tipo de publicación de la Obra",
    };
  } else if (!obra.area) {
    throw {
      ok: false,
      mensaje: "Ingresar el area de la Obra",
    };
  } else if (!obra.resumen) {
    throw {
      ok: false,
      mensaje: "Ingresar el resumen de la Obra",
    };
  }
};

let guardarObra = async (obra) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.pu_propuestas_publicaciones(
        titulo, facultad, tipo_publicacion, area, resenia_autores, resumen,
        aspectos_novedosos, contribucion_area, publico_objetivo, datos_proyecto_asociado,
        forma_ajusta_mision_udem, observaciones_finales, id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`;
  let valores = [
    obra.titulo,
    obra.facultad,
    obra.tipo_publicacion,
    obra.area,
    obra.resenia_autores,
    obra.resumen,
    obra.aspectos_novedosos,
    obra.contribucion_area,
    obra.publico_objetivo,
    obra.datos_proyecto_asociado,
    obra.forma_ajusta_mision_udem,
    obra.observaciones_finales,
    obra.id,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let consultarTareas = async () => {
  let _servicio = new ServicioPg();
  let sql = `SELECT pu_tareas.id, pu_tareas.nombre FROM public.pu_tareas;`;
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let consultarObras = async () => {
  let _servicio = new ServicioPg();
  let sql = `SELECT pu_propuestas_publicaciones.id AS idObra,titulo,
    CONCAT(nombre,' ',apellidos)AS Autor, facultad,tipo_publicacion, area 
                FROM public.pu_autores_publicaciones
                INNER JOIN public.acc_usuarios on public.pu_autores_publicaciones.id_autor = public.acc_usuarios.id
                INNER JOIN public.pu_propuestas_publicaciones on public.pu_autores_publicaciones.id_publicacion =  public.pu_propuestas_publicaciones.id 
                INNER JOIN public.pu_registros_evaluaciones on pu_registros_evaluaciones.id_publicacion  = public.pu_propuestas_publicaciones.id
                WHERE public.pu_registros_evaluaciones.concepto = 1`;
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let consultarObra = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT pu_propuestas_publicaciones.id AS idObra,titulo,CONCAT(nombre,' ',apellidos)AS Autor, facultad,tipo_publicacion, area 
    FROM public.pu_autores_publicaciones
    INNER JOIN public.acc_usuarios on public.pu_autores_publicaciones.id_autor = public.acc_usuarios.id
    INNER JOIN public.pu_propuestas_publicaciones on public.pu_autores_publicaciones.id_publicacion=public.pu_propuestas_publicaciones.id 
    INNER JOIN public.pu_registros_evaluaciones on pu_registros_evaluaciones.id_publicacion  = public.pu_propuestas_publicaciones.id
    WHERE public.pu_registros_evaluaciones.concepto = 1`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let eliminarObra = async (id) => {
  let _servicio = new ServicioPg();
  console.log(id);
  let sql = `DELETE FROM public.pu_propuestas_publicaciones WHERE id=$1;`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let editarObra = async (obra, id) => {
  if (obra.id != id) {
    throw {
      ok: false,
      mensaje: "El id de la obra no corresponde al enviado",
    };
  }
  console.log("NOOOO");
  let _servicio = new ServicioPg();

  let sql =
    "UPDATE public.pu_propuestas_publicaciones" +
    "SET titulo=$1, facultad=$2, tipo_publicacion=$3," +
    " area=$4, resenia_autores=$5, resumen=$6, aspectos_novedosos=$7," +
    " contribucion_area=$8, publico_objetivo=$9, datos_proyecto_asociado=$10," +
    "forma_ajusta_mision_udem=$11, observaciones_finales=$12" +
    "WHERE id=$13;";
  let valores = [
    obra.titulo,
    obra.facultad,
    obra.tipo_publicacion,
    obra.area,
    obra.resenia_autores,
    obra.resumen,
    obra.aspectos_novedosos,
    obra.contribucion_area,
    obra.publico_objetivo,
    obra.datos_proyecto_asociado,
    obra.forma_ajusta_mision_udem,
    obra.observaciones_finales,
    id,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);

  return respuesta;
};

let infoAutor = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT CONCAT(nombre,' ',apellidos)AS Autor, acc_usuarios.correo
    FROM public.pu_autores_publicaciones
    INNER JOIN public.acc_usuarios on public.pu_autores_publicaciones.id_autor = public.acc_usuarios.id
    INNER JOIN public.pu_propuestas_publicaciones on public.pu_autores_publicaciones.id_publicacion=public.pu_propuestas_publicaciones.id 
    INNER JOIN public.pu_registros_evaluaciones on pu_registros_evaluaciones.id_publicacion  = public.pu_propuestas_publicaciones.id
    WHERE public.pu_propuestas_publicaciones.id = $1;`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

// exportar los metodos para ser usados en otros archivos

module.exports = {
  validarObra,
  guardarObra,
  consultarObras,
  consultarObra,
  eliminarObra,
  editarObra,
  consultarTareas,
  infoAutor,
};
