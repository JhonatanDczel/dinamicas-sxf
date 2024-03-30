if (localStorage.getItem('id') === null) {
  localStorage.setItem('id', Date.now() % 1000);
}

console.log(localStorage.getItem('id'));
const ticket = document.getElementById('ticket');
let div = document.createElement("div");
div.textContent = localStorage.getItem('id');
ticket.appendChild(div);
const modalStatus = document.getElementById('modalStatus');

function makeNameEditable() {
  const nameElement = document.getElementById('name');
  const name = nameElement.textContent;
  
const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'text');
inputElement.setAttribute('id', 'nameInput');
inputElement.setAttribute('pattern', '[0-9]*'); 
inputElement.setAttribute('inputmode', 'numeric'); 
inputElement.value = name;

  
  nameElement.parentNode.replaceChild(inputElement, nameElement);
  
  inputElement.focus();
  
  inputElement.addEventListener('blur', function() {
    restoreName();
  });
}

function restoreName() {
  const inputElement = document.getElementById('nameInput');
  const name = inputElement.value;
  
  const nameElement = document.createElement('h2');
  nameElement.setAttribute('id', 'name');
  nameElement.textContent = name;
  
  inputElement.parentNode.replaceChild(nameElement, inputElement);
  
  nameElement.addEventListener('click', makeNameEditable);
}

ticket.innerHTML = /*html*/`
  <h2 id="name" onclick="makeNameEditable()">Ingresa tu nombre</h2>
  <input type="number" id="number">
  <button onclick="sendNumber()">Enviar</button>
`;

function sendNumber() {
  const number = document.getElementById('number').value;
  const name = document.getElementById('name').textContent;
  fetch('http://dinamicas-sxf.local:3000/participante', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idParticipante: localStorage.getItem("id"), nombre: name, numero: number })
  })
    .then(res => res.text())
    .then(res => {
      if (res === '¡Participacion registrada!') {
        modalStatus.innerHTML = '¡Participacion registrada!';
      }
      else {
        modalStatus.innerHTML = '¡No hay sorteos activos!' ;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      modalStatus.innerHTML = '¡No hay sorteos activos!';
    });
}
