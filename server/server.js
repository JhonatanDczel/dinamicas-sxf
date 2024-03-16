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
  sorteoActual.addRegistro(req.body.idParticipante, req.body.nombre, req.body.numero);
  res.send('¡Participacion registrada!');
  showData();
});

/* crea una api para que los clientes puedan consultar si hay un sorteo vigente o no */ 
app.get('/sorteo', (req, res) => {
  res.send(sorteoActual !== null);
});

function sorteo(id) {
  let registros = [];

  let addRegistro = (idParticipante, nombre, numeroElegido) => {
    registros.push({idParticipante, nombre, numeroElegido});
  }
  return {
    addRegistro,
    registros,
    id
  };
}

function showData() {
  let ranking = [];
  sorteoActual.registros.forEach(registro => {
    ranking.push({nombre: registro.nombre, numero: registro.numeroElegido});
  });
  ranking.sort(function(a, b) {
    return parseInt(a.numero) - parseInt(b.numero);
  });
  console.log(ranking);
}
