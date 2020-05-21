
var data = [];
let consultar = () => {
    axios.get("http://localhost:3001/reporteConsulta").then((response) => {
        console.log("Respuesta del Api");
        console.log(response);
        registros = response.data.info;
        console.log(registros);
        let lista = document.getElementById("lista");
        let data = "";
        for (let i = 0; i < registros.length; i++) {
            facultad = registros[i].facultad;
            titulo = registros[i].titulo;
            estado = registros[i].estado;
            autor = registros[i].autor;
            data += "<tr>";
            data += `<td>${facultad}</td>`;
            data +=`<td>${titulo}</td>`;
            data += `<td>${estado} </td>`;
            data += `<td>${autor} </td>`;
            "</tr>";
        }
        lista.innerHTML = data;
    });
};

consultar();
