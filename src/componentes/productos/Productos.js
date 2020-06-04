import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//importar clienteaxios
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

const Productos = () => {
  // productos = state, guardarproductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  // useefect para consultar api cuando carge
  useEffect(() => {
    // query a la api
    const consultarAPI = async () => {
      const productosConsulta = await clienteAxios.get('/productos');

      guardarProductos(productosConsulta.data);
    };

    // llamando a la api
    consultarAPI();
  }, [productos]);

  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Productos</h2>

      <Link to={'/productos/nuevo'} className='btn btn-verde nvo-cliente'>
        <i className='fas fa-plus-circle'></i>
        Nuevo Producto
      </Link>

      <ul className='listado-productos'>
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
