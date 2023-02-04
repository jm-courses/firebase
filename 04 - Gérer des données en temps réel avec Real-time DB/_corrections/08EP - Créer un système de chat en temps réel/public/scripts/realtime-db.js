import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onChildAdded, ref, push, query, limitToLast } from 'firebase/database';

import { app } from './index';
import { getSession } from './session';

// ==================================
// Vérification de l'authentification à l'arrivée sur cette page
// ==================================

getSession(app); // Maj du header

let currentUser = null;

onAuthStateChanged(getAuth(app), (user) => {
  if (user) {
    const alertEl = document.querySelector('.alert-warning');
    alertEl?.parentNode.removeChild(alertEl);

    // Définit la variable "currentUser"
    currentUser = user;

    return;
  }
  window.location.href = 'authentication.html';
});

// ==================================
// Récupération des messages de la Realtime database
// ==================================

const addMessageForm = document.querySelector('#addMessageForm');
const messageField = addMessageForm.querySelector('#message');
const messagesContainer = document.querySelector('#messages');

messagesContainer.innerHTML = '';

const db = getDatabase(app);
const chatRef = ref(db, '/chat-messages'); // Référence vers le noeud "chat-messages"
const lastMessages = query(chatRef, limitToLast(10)); // Les 10 derniers messages

addMessageForm.addEventListener('submit', onSubmitMessage);

// Surveille l'ajout de nouveaux messages dans le chat
onChildAdded(lastMessages, (snapshot) => {
  messagesContainer.innerHTML = renderMessage(snapshot.val(), snapshot.key) + messagesContainer.innerHTML;
});

function onSubmitMessage(event) {
  event.preventDefault();

  if (!currentUser) {
    return (window.location.href = 'authentication.html');
  }

  push(chatRef, {
    uid: currentUser.uid,
    message: messageField.value.trim(),
    author: currentUser.displayName || currentUser.email,
    photoURL: currentUser.photoURL,
    created_at: new Date().toISOString().split('T')[0]
  });

  messageField.value = '';
}

function renderMessage({ message, author, photoURL }, mid) {
  const photo = photoURL || 'assets/images/profile.png';

  return `<div class="d-flex my-2">
            <div class="flex-shrink-0">
              <img src="${photo}" alt="Photo de ${author}" width="40" class="rounded-circle" />
            </div>
            <div class="flex-grow-1 ms-3 d-flex flex-column">
              <strong>${author}</strong>
              <span>${message}"</span>
            </div>
          </div>`;
}
