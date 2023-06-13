const axios = require('axios');

const obtenerProveedores = async (req, res) => {
  try {
    const response = await axios.get('https://diario-obra-default-rtdb.firebaseio.com/proveedores.json');
    const proveedores = response.data;

    // Ordenar los proveedores alfabéticamente por empresa
    const proveedoresOrdenados = Object.values(proveedores).sort((a, b) => {
      return a.empresa.localeCompare(b.empresa);
    });

    res.render('proveedores', { proveedores: proveedoresOrdenados });
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    res.render('error', { error: 'Error al obtener los proveedores' });
  }
};

const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = {
      empresa: req.body.empresa,
      producto: req.body.producto,
      direccion: req.body.direccion,
      telefono: req.body.telefono
    };

    await axios.post(process.env.FIREBASE_API_URL, nuevoProveedor);
    res.redirect('/proveedores');
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.render('error', { error: 'Error al crear el proveedor' });
  }
};

module.exports = {
  obtenerProveedores,
  crearProveedor
};

