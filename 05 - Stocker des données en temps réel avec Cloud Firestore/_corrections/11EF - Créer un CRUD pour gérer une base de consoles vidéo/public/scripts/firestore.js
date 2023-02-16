import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';

import { app } from './index';
import { getSession } from './session';
import { createFormAlert } from './utils/functions';

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
// Affichage des consoles en temps réel
// ==================================

const db = getFirestore(app);

const consolesCollection = collection(db, 'consoles');

// Fabrique une requête pour récupérer les consoles en ordre décroissant par prix
const q = query(consolesCollection, orderBy('prix', 'desc'));

// Gestion du temps réel via les "snapshots"
onSnapshot(q, (querySnapshot) => {
  for (const change of querySnapshot.docChanges()) {
    const html = renderConsole({ id: change.doc.id, ...change.doc.data() });

    switch (change.type) {
      case 'added': // Si le changement est un ajout, on ajoute le HTML de la console dans le DOM
        document.querySelector('#consoles').innerHTML += html;
        break;
        
      case 'modified': // Si le changement est une modification, on remplace le HTML existant (via son ID) par le nouveau HTML dans le DOM
        document.querySelector(`[data-console-id="${change.doc.id}"]`).innerHTML = html;
        break;

      case 'removed': // Si le changement est une suppression, on supprime le HTML existant (via son ID) du DOM
        document.querySelector(`[data-console-id="${change.doc.id}"]`).remove();
        break;
    }
  }
});

// Transforme un objet "console" en HTML
function renderConsole({ id, photo, nom, description, constructeur, prix }) {
  return `
    <div class="col" data-console-id="${id}">
      <div class="card">
        <img src="${photo}" class="card-img-top" alt="${nom}" />
        <div class="card-body">
          <h5 class="card-title">${nom}</h5>
          <p class="card-text">
          ${description}
          </p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <small class="text-muted">Constructeur : <strong>${constructeur}</strong></small>
          <small class="text-muted">Prix :<strong> ${prix.toFixed(2)} €</strong></small>
        </div>
      </div>
    </div>
  `;
}

// ==================================
// Gestion du formulaire d'ajout de console
// ==================================

const addConsoleForm = document.querySelector('#formAddConsole');
const setAddError = createFormAlert(addConsoleForm, 'alert-danger');
const setAddSuccess = createFormAlert(addConsoleForm, 'alert-success');

// Gestion de l'envoi du formulaire
addConsoleForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(addConsoleForm);

  // Création du nouveau document
  const newDoc = {
    nom: formData.get('nom'),
    prix: parseFloat(formData.get('prix')),
    constructeur: formData.get('constructeur'),
    description: formData.get('description'),
    photo: formData.get('photo'),
  };

  // Ajout du document dans la collection "consoles"
  try {
    await addDoc(consolesCollection, newDoc);
    setAddSuccess('Console ajoutée avec succès !');
    addConsoleForm.reset();
  }
  catch (error) {
    setAddError(error.message);
  }
});
