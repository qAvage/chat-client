import './style.css'
import { io } from "socket.io-client";

const name = prompt('Введите своё имя').trim()

const socket = io(import.meta.env.VITE_SERVER_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value && input.value.trim() !== '') {
    socket.emit('chat message', input.value.trim(), name === '' ? 'Amogus' : name)
    input.value = ''
  }
});

socket.on('chat message', (msg, name, time) => {
  messages.insertAdjacentHTML('beforeend', `
    <li>
      <div>
        <span style="font-weight:700;">${name}:</span>
        <span>${msg}</span>
      </div>
      <div>
        <span>${time}</span>
      </div>
    </li>
    `)
  window.scrollTo(0, document.body.scrollHeight);
});



