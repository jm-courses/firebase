import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

updateHeader(null);

export function getSession(app) {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    updateHeader(user);
  });

  // PRÉPARATION DU LIEN DE DÉCONNEXION
  const logout = document.querySelector('#logout-link');

  logout.addEventListener('click', async (event) => {
    event.preventDefault();
    await signOut(auth);
    updateHeader(null);
  });
  // ==================================
}

export function updateHeader(userObject) {
  const userProfileContainer = document.querySelector('#user');
  const photoElement = userProfileContainer.querySelector('#user-image');
  const profileElement = userProfileContainer.querySelector('#user-name');

  if (!userObject) {
    userProfileContainer.classList.add('d-none');
    profileElement.textContent = '';
    photoElement.src = '';
    return;
  }

  userProfileContainer.classList.remove('d-none');
  profileElement.textContent = userObject.displayName ?? userObject.email;
  photoElement.src = userObject.photoURL ?? 'assets/images/profile.png';
}
