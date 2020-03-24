const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config');
const serviceAccount = require('../certs/tablica-korkowa-firebase-adminsdk-noris-33873cd73b.json');

const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    await firestoreService.restore('./JSON/users.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();