const express = require('express');
const app = express();
const port = 3000;
const sorteoActual = sorteo(1);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('TEST ¡Hola! Esta es tu página de dinámica de sorteo.');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://dinamicas:${port}`);
});

/* crea api para recibir participantes con sus números, lo que se enviara seran dos parametros uno idParticipante y otro llamado numero, estos se agregaran a sorteoActual*/
app.post('/participante', (req, res) => {
  console.log(req.body.idParticipante, sorteoActual.registros[req.body.idParticipante]);
  if (!(sorteoActual.registros[req.body.idParticipante] == undefined)) {
    res.send('¡Ya registraste un numero!');
    return;
  }
  sorteoActual.addRegistro(req.body.idParticipante, req.body.nombre, req.body.numero, res);
});

/* crea una api para que los clientes puedan consultar si hay un sorteo vigente o no */ 
app.get('/sorteo', (req, res) => {
  res.send(sorteoActual !== null);
});

function sorteo(id) {
  let registros = {};

  let addRegistro = (idParticipante, nombre, numeroElegido, res) => {
    for (const id in registros) {
      if (registros.hasOwnProperty(id)) {
        if (registros[id].numeroElegido === numeroElegido) {
          res.send('¡Este número ya ha sido registrado por otro participante!');
          return;
        }
      }
    }
    registros[idParticipante] = {nombre, numeroElegido};
    showData();
    res.send('¡Participacion registrada!');
  }

  return {
    addRegistro,
    registros,
    id
  };
}

function showData() {
  let ranking = [];
  // Iterar sobre el objeto de registros
  for (const idParticipante in sorteoActual.registros) {
    if (sorteoActual.registros.hasOwnProperty(idParticipante)) {
      const registro = sorteoActual.registros[idParticipante];
      ranking.push({nombre: registro.nombre, numero: registro.numeroElegido});
    }
  }
  ranking.sort(function(a, b) {
    return parseInt(a.numero) - parseInt(b.numero);
  });
  console.log(ranking);
}
