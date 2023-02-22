import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './index';

const consoles = [
  {
    nom: 'PlayStation 5',
    prix: 799.99,
    constructeur: 'Sony',
    description: `La PlayStation 5 a été commercialisé le 12 novembre 2020 au États-Unis puis le 19 novembre de cette même année en Europe, elle a été créée par Sony Interactive Entertainment.`,
    photo: '/public/assets/images/consoles/ps5.png',
  },
  {
    nom: 'Xbox Series X',
    prix: 499.99,
    constructeur: 'Microsoft',
    description: `Xbox Series est la gamme de consoles de neuvième génération comprenant la Xbox Series X et la Xbox Series S, développées et fabriquées par Microsoft et sorties le 10 novembre 2020`,
    photo: '/public/assets/images/consoles/xbox-x.png',
  },
  {
    nom: 'Switch',
    prix: 399.99,
    constructeur: 'Nintendo',
    description: `La Nintendo Switch est une console de jeux vidéo hybride développée par Nintendo. Elle est sortie le 3 mars 2017 au Japon, le 3 mars 2017 en Amérique du Nord et le 3 mars 2017 en Europe.`,
    photo: '/public/assets/images/consoles/switch.png',
  },
];

const db = getFirestore(app);

async function addConsoles() {
  // Crée une nouvelle référence de collection nommée "consoles"
  const consolesCollection = collection(db, 'consoles');

  // Ajoute chaque console du tableau à la collection "consoles"
  for (const gameConsole of consoles) {
    await addDoc(consolesCollection, gameConsole);
  }
}

// Appelle la fonction asynchrone "addConsoles"
addConsoles();
