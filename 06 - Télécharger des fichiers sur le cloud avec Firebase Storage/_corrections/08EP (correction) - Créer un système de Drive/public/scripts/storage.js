import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';

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

    getUserFiles();

    return;
  }
  window.location.href = 'authentication.html';
});

// ==================================
// Affichage des fichiers du bucket
// ==================================

const storage = getStorage(app);


async function getUserFiles() {
  const listRef = ref(storage, `users/${currentUser.uid}`);

  const res = await listAll(listRef);

  const itemsData = [];

  for (const item of res.items) {
    itemsData.push(getMetadata(item));
  }

  const files = await Promise.all(itemsData);

  renderFilesList(files);
}

// ==================================
// Clic sur un fichier de la liste (téléchargement ou suppression)
// ==================================

const tableFilesList = document.querySelector('#files-list');

tableFilesList.addEventListener('click', async (event) => {
  if (!event.target.matches('[data-file]')) {
    return;
  }

  event.preventDefault();

  const filePath = event.target.dataset.file;
  const action = event.target.dataset.action;

  const fileRef = ref(storage, filePath);

  switch (action) {
    case 'download': // Téléchargement
      const url = await getDownloadURL(fileRef);
      window.open(url, '_blank');
      break;

    case 'delete': // Suppression
      if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
        try {
          await deleteObject(fileRef);
          getUserFiles();
        } catch (error) {
          setFileError(error);
        }
      }
      break;
  }
});

// ==================================
// Envoi d'un fichier
// ==================================

const addFileForm = document.querySelector('#addFileForm');
const setFileError = createFormAlert(addFileForm, 'alert-danger');
const setFileSuccess = createFormAlert(addFileForm, 'alert-success');

const file = addFileForm.querySelector('input#file');

hideProgressBar();

file.addEventListener('change', (event) => {
  // Remise à zéro de la barre de progression et des messages de succès/erreur
  showProgressBar();
  setProgressBar(0);
  showCancelButton();
  setFileSuccess(null);
  setFileError(null);
  
  const file = event.target.files[0];
  const fileRef = ref(storage, `users/${currentUser.uid}/${file.name}`);

  const uploadTask = uploadBytesResumable(fileRef, file);

  // Mise à jour de la fonction d'annulation pour cet envoi
  const cancelUploadBtn = document.getElementById('cancel-download');
  cancelUploadBtn.onclick = () => {
    uploadTask.cancel();
  };

  // Calcul de la progression de l'envoi (pour la barre de progression)
  uploadTask.on('state_changed', (snapshot) => {
    const progress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100, 10);
    setProgressBar(progress); // Mise à jour de la barre de progression
  }, () => {
    // Téléchargement annulé
    hideProgressBar();
    hideCancelButton();
    setFileError('Envoi annulé');
  }, () => {
    // Téléchargement réussi
    setFileSuccess('Fichier envoyé avec succès !');

    hideProgressBar();
    hideCancelButton();
    event.target.value = '';

    // Mise à jour de la liste
    getUserFiles();
  });
});

// ==================================
// Fonctions
// ==================================

function hideProgressBar() {
  document.querySelector('.progress').style.display = 'none';
}

function showProgressBar() {
  document.querySelector('.progress').style.display = 'block';
}

function showCancelButton() {
  document.getElementById('cancel-download').style.display = 'inline-block';
}

function hideCancelButton() {
  document.getElementById('cancel-download').style.display = 'none';
}

// Change la valeur de la barre de progression (en pourcentage)
function setProgressBar(percent) {
  const progressBar = document.getElementById('progress');
  progressBar.style.width = `${percent}%`;
  progressBar.setAttribute('aria-valuenow', percent);
  progressBar.innerHTML = `${percent}%`;
}

// Affiche la liste des fichiers dans le tableau HTML
function renderFilesList(files) {
  const filesList = document.getElementById('files-list');

  filesList.innerHTML = '';

  for (const file of files) {
    filesList.innerHTML += `
    <tr>
      <td><a href="#" data-file="${file.fullPath}" data-action="download">${file.name}</a></td>
      <td>${new Date(file.timeCreated).toLocaleDateString()}</td>
      <td><button class="btn btn-danger btn-sm" data-file="${file.fullPath}" data-action="delete" title="Supprimer le fichier">╳</button></td>
    </tr>`
  }
}