const axios = require('axios');

const obtenerProveedores = async (req, res) => {
  try {
    const response = await axios.get('https://diario-obra-default-rtdb.firebaseio.com/proveedores.json');
    const proveedores = response.data;
    res.render('proveedores', { proveedores });
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

    await axios.post('https://diario-obra-default-rtdb.firebaseio.com/proveedores.json', nuevoProveedor);
    res.redirect('/proveedores');
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.render('error', { error: 'Error al crear el proveedor' });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const proveedorId = req.params.id;
    await axios.delete(`https://diario-obra-default-rtdb.firebaseio.com/proveedores/${proveedorId}.json`);
    res.redirect('/proveedores');
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error);
    res.render('error', { error: 'Error al eliminar el proveedor' });
  }
};


module.exports = {
    obtenerProveedores,
    crearProveedor,
    eliminarProveedor,
  };
  
