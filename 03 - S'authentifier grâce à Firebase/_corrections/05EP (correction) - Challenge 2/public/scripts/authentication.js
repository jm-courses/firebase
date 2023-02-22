import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { app } from './index';
import { createFormAlert } from './utils/functions';

import { updateHeader, getSession } from './session';

const auth = getAuth(app);

getSession(app);

const registerForm = document.querySelector('#registerForm');
const setRegisterError = createFormAlert(registerForm, 'alert-danger');
const setRegisterSuccess = createFormAlert(registerForm, 'alert-success');

const loginForm = document.querySelector('#loginForm');
const setLoginError = createFormAlert(loginForm, 'alert-danger');
const setLoginSuccess = createFormAlert(loginForm, 'alert-success');

const loginButtonGoogle = document.querySelector('#loginButtonGoogle');
const loginButtonGithub = document.querySelector('#loginButtonGithub');
const socialContainer = document.querySelector('#social-connect');
const setSocialAuthError = createFormAlert(socialContainer, 'alert-danger');
const setSocialAuthSuccess = createFormAlert(socialContainer, 'alert-success');

registerForm.addEventListener('submit', onRegister);
loginForm.addEventListener('submit', onLogin);
loginButtonGoogle.addEventListener('click', googleLogin);
loginButtonGithub.addEventListener('click', githubLogin);

async function onRegister(event) {
  event.preventDefault();

  setRegisterError(null);
  setRegisterSuccess(null);

  const form = event.target;

  const email = form.querySelector('#registerEmail').value;
  const password = form.querySelector('#registerPassword').value;
  const password_confirm = form.querySelector('#registerPasswordConfirm').value;

  if (password !== password_confirm) {
    setRegisterError('Les mots de passe doivent concorder !!');
    return;
  }

  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    setRegisterSuccess(`Utilisateur ${user.email} enregistré !`);
  } catch (err) {
    setRegisterError(err.message);
  }
}

async function onLogin(event) {
  event.preventDefault();

  setLoginError(null);
  setLoginSuccess(null);

  const form = event.target;

  const email = form.querySelector('#loginEmail').value;
  const password = form.querySelector('#loginPassword').value;

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = credentials.user;
    console.log(user);
    setLoginSuccess(`Connecté ! Heureux de vous revoir ${user.email}`);
    updateHeader(user);
  } catch (err) {
    setLoginError(err.message);
  }
}

async function googleLogin() {
  setSocialAuthSuccess(null);
  setSocialAuthError(null);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log('Connecté !', user);
    setSocialAuthSuccess(`Bienvenue ${user.displayName} !`);

    updateHeader(user);
  } catch (err) {
    console.log('Erreur', err.message);
    setSocialAuthError(err.message);
  }
}

async function githubLogin() {
  setSocialAuthSuccess(null);
  setSocialAuthError(null);

  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log('Connecté !', user);
    setSocialAuthSuccess(`Bienvenue ${user.displayName} !`);

    updateHeader(user);
  } catch (err) {
    console.log('Erreur', err.message);
    setSocialAuthError(err.message);
  }
}
