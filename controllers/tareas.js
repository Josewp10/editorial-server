const ServicioPg = require("../services/postgress");


// se valida la informacion 

let validarTarea = tareas => {

    if (!tareas) {
        throw {
            ok: false,
            mensaje: "El id de la tarea"
        };

    } else if (!tareas.nombre) {
        throw {
            ok: false,
            mensaje: "El nombre de la tarea "
        };
    } else if (!tareas.descripcion) {
        throw {
            ok: false,
            mensaje: "La descripcion de la tarea"
        };
    } 
};

let guardarTarea = async (pu_tareas) => {
    let _servicio = new ServicioPg();
    let sql = `INSERT INTO public.pu_tareas(
        id, nombre, descripcion, modulo) VALUES ($1,$2,$3,$4);`;
    let valores = [pu_tareas.id,pu_tareas.nombre,pu_tareas.descripcion,pu_tareas.modulo]
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
};

let consultarTareas = async (tareas) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT id, nombre, descripcion, modulo FROM pu_tareas ORDER BY pu_tareas.id`;
    let respuesta = await _servicio.ejecutarSql(sql);
    return respuesta;
};

let consultarTarea = async (id) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT id, nombre, descripcion, modulo FROM pu_tareas WHERE pu_tareas.id = $1`;
    let respuesta = await _servicio.ejecutarSql(sql, [id]);
    return respuesta;
};

let eliminarTarea = async (id) => {
    let _servicio = new ServicioPg();
    console.log(id)
    let sql = `DELETE FROM public.pu_tareas WHERE id=$1;`;
    let respuesta = await _servicio.ejecutarSql(sql, [id]);
    return respuesta;
  };
  

  let editarTarea = async (tareas, id) => {
    if(tareas.id != id){
        throw {
            ok: false,
            mensaje: "el id de la tarea no corresponde al enviado",   
        };
    }
    let _servicio = new ServicioPg();
    let sql = 'UPDATE public.pu_tareas set nombre =$1,'
    +'descripcion =$2, modulo =$3 WHERE id = $4;';
    let valores = [tareas.nombre, tareas.descripcion, tareas.modulo, id]
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    
    return respuesta;
};


// exportar los metodos para ser usados en otros archivos

module.exports = { validarTarea, guardarTarea, consultarTareas,consultarTarea, eliminarTarea,editarTarea };