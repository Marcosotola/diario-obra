const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

let initialized = false;

function initializeFirebaseApp() {
  if (!initialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    initialized = true;
  }
}

const getFirestoreInstance = () => {
  initializeFirebaseApp();
  return admin.firestore();
};

module.exports = { getFirestoreInstance };

