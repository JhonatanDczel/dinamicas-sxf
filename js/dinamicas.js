const ticket = document.getElementById('ticket');

ticket.innerHTML = /*html*/`
  <h2>name</h2>
  <input type="number" id="number">
  <button onclick="sendNumber()">Enviar</button>
`;

function sendNumber() {
  const number = document.getElementById('number').value;
  fetch('http://dinamicas-sxf.local:3000/participante', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idParticipante: 1, nombre: 'name', numero: number })
  })
    .then(res => res.text())
    .then(res => alert(res));
}