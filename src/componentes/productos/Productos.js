import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
//importar clienteaxios
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

//importar el context
import { CRMContext } from '../../context/CRMContext';

const Productos = (props) => {
  // productos = state, guardarproductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);


  // useefect para consultar api cuando carge
  useEffect(() => {

    if (auth.token !== '') {
      // query a la api
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get('/productos', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });

          guardarProductos(productosConsulta.data);
        } catch (error) {
          //Error de autorizacion token vencido o no valido
          if (error.response.status === 500) {
            props.history.push('/iniciar-sesion');
          }
        }
      };

      // llamando a la api
      consultarAPI();
    } else {
      props.history.push('/iniciar-sesion')
    }
  }, [productos]);

  // si el state esta como false
  if (!auth.auth) {
    props.history.push('/iniciar-sesion');
  }

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

export default withRouter(Productos);
