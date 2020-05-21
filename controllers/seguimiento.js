const ServicioPg = require("../services/postgress");

// se valida la informacion

// se valida la informacion

let validarSeguimiento = (seguimiento) => {
  if (!seguimiento) {
    throw {
      ok: false,
      mensaje: "El id del seguimiento",
    };
  } else if (!seguimiento.id_tarea) {
    throw {
      ok: false,
      mensaje: "El id de la tarea",
    };
  } else if (!seguimiento.fecha) {
    throw {
      ok: false,
      mensaje: "La fecha del seguimiento ",
    };
  } else if (!seguimiento.comentario) {
    throw {
      ok: false,
      mensaje: "El comentario del seguimiento",
    };
  } else if (!seguimiento.estado) {
    throw {
      ok: false,
      mensaje: "El estado del seguimiento",
    };
  } else if (!seguimiento.archivo) {
    throw {
      ok: false,
      mensaje: "El archivo del seguimiento",
    };
  }
};

let guardarSeguimiento = async (seguimiento) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.pu_seguimientos_aprobados (
        id, id_tarea, fecha, comentario, estado, archivo, id_propuesta) 
            VALUES ($1,$2,$3,$4,$5,$6,$7);`;
  let valores = [
    seguimiento.id,
    seguimiento.id_tarea,
    seguimiento.fecha,
    seguimiento.comentario,
    seguimiento.estado,
    seguimiento.archivo,
    seguimiento.id_propuesta,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let consultarSeguimientos = async () => {
  let _servicio = new ServicioPg();
  let sql = `SELECT pu_seguimientos_aprobados.id, pu_tareas.nombre AS Tarea, fecha, comentario, estado, archivo
    FROM public.pu_seguimientos_aprobados
    INNER JOIN pu_tareas ON pu_seguimientos_aprobados.id_tarea = pu_tareas.id;`;
  let respuesta = await _servicio.ejecutarSql(sql);
  return respuesta;
};

let consultarSeguimiento = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT id, id_tarea, fecha, comentario, estado, archivo
	            FROM public.pu_seguimientos_aprobados WHERE pu_seguimientos_aprobados.id = $1;`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let consultarPorObra = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT pu_seguimientos_aprobados.id,pu_tareas.nombre as Tarea, fecha, estado, comentario FROM public.pu_seguimientos_aprobados
                INNER JOIN public.pu_tareas on pu_tareas.id = pu_seguimientos_aprobados.id_tarea
                INNER JOIN public.pu_propuestas_publicaciones on pu_propuestas_publicaciones.id = pu_seguimientos_aprobados.id_propuesta
                WHERE pu_seguimientos_aprobados.id_propuesta = $1;`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let eliminarSeguimiento = async (id) => {
  let _servicio = new ServicioPg();
  console.log(id);
  let sql = `DELETE FROM public.pu_seguimientos_aprobados WHERE id=$1;`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let editarSeguimiento = async (seguimiento, id) => {
  if (seguimiento.id != id) {
    throw {
      ok: false,
      mensaje: "el id de la tarea no corresponde al enviado",
    };
  }
  let _servicio = new ServicioPg();

  let sql =
    "UPDATE public.pu_seguimientos_aprobados set id_tarea =$1," +
    "fecha =$2, comentario =$3, estado =$4, archivo =$5 WHERE id = $7;";
  let valores = [
    seguimiento.id_tarea,
    seguimiento.fecha,
    seguimiento.comentario,
    seguimiento.estado,
    seguimiento.archivo,
    seguimiento.id_propuesta,
    id,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);

  return respuesta;
};

// exportar los metodos para ser usados en otros archivos

module.exports = {
  validarSeguimiento,
  guardarSeguimiento,
  consultarSeguimiento,
  consultarSeguimientos,
  eliminarSeguimiento,
  editarSeguimiento,
  consultarPorObra,
};
