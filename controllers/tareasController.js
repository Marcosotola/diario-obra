
const { getFirestoreInstance } = require("../firebase");
const db = getFirestoreInstance();



const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");


const index = async (req, res) => {
    const tareasSnapshot = await tareasCollection.get();
    const tareas = tareasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('index', { tareas });
};



module.exports = {
    index
};







