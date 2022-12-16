import { initializeApp } from 'firebase/app';
import firebaseConfig from './config';

export const app = initializeApp(firebaseConfig, 'Firebase Playground');

/* if (app) {
  console.log(`Le projet "${app.name}" est bien configuré`);
} */
