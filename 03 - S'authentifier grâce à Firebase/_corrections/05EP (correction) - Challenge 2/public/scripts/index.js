import { initializeApp } from 'firebase/app';
import firebaseConfig from './config';
import { getSession } from './session';

export const app = initializeApp(firebaseConfig, 'Firebase Playground');

getSession(app);

/* if (app) {
  console.log(`Le projet "${app.name}" est bien configuré`);
} */
