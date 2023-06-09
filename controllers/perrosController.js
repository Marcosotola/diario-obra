
const axios = require("axios");

const logUrlMiddleware = async (req, res, next) => {
  try {
    const respuesta = await axios.get('https://random.dog/woof.json');
    const urlPerro = respuesta.data.url;
    req.urlPerro = urlPerro;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const show = (req, res) => {
  const urlPerro = req.urlPerro;
  res.render("perros", { url: urlPerro });
};

module.exports = { logUrlMiddleware, show };


