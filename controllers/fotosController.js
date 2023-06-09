
const { getFirestoreInstance } = require("../db/firebase");

const db = getFirestoreInstance();

const fotosCollection = db.collection("fotos");

exports.index = async (req, res) => {
  const fotosSnapshot = await fotosCollection.get();
  const fotos = fotosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.render("fotos", { fotos });
};
