/* Verificar si en el localstorage no hay un dato llamado id, en caso de no haberlo crear uno basado en la hora actual, y en caso de haber, no hacer nada */
if (localStorage.getItem('id') === null) {
  localStorage.setItem('id', Date.now() % 1000);
}

console.log(localStorage.getItem('id'));
const ticket = document.getElementById('ticket');
let div = document.createElement("div");
div.textContent = localStorage.getItem('id');
ticket.appendChild(div);
const modalStatus = document.getElementById('modalStatus');

// Función para cambiar el nombre a editable
function makeNameEditable() {
  const nameElement = document.getElementById('name');
  const name = nameElement.textContent;
  
// Crear un input
const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'text');
inputElement.setAttribute('id', 'nameInput');
inputElement.setAttribute('pattern', '[0-9]*'); // Esta expresión regular permite solo números
inputElement.setAttribute('inputmode', 'numeric'); // Esto ayuda a mostrar el teclado numérico en dispositivos móviles
inputElement.value = name;

  
  // Reemplazar el h2 con el input
  nameElement.parentNode.replaceChild(inputElement, nameElement);
  
  // Enfocar el input
  inputElement.focus();
  
  // Manejar evento de perder el foco para restaurar el nombre
  inputElement.addEventListener('blur', function() {
    restoreName();
  });
}

// Función para restaurar el nombre
function restoreName() {
  const inputElement = document.getElementById('nameInput');
  const name = inputElement.value;
  
  // Crear de nuevo el h2 con el nombre ingresado
  const nameElement = document.createElement('h2');
  nameElement.setAttribute('id', 'name');
  nameElement.textContent = name;
  
  // Reemplazar el input con el h2
  inputElement.parentNode.replaceChild(nameElement, inputElement);
  
  // Volver a asociar el evento de clic al h2
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
