import React, { useEffect, useState, Fragment, useContext } from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import { withRouter } from 'react-router-dom';

//importar el context
import { CRMContext } from '../../context/CRMContext';

const Pedidos = (props) => {

  const [pedidos, setPedidos] = useState([]);

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  useEffect(() => {

    if (auth.token !== '') {

      const consultarApi = async () => {
        try {
          // obtener los pedidos
          const resultado = await clienteAxios.get('/pedidos', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });

          setPedidos(resultado.data);
        } catch (error) {
          //Error de autorizacion token vencido o no valido
          if (error.response.status === 500) {
            props.history.push('/iniciar-sesion');
          }
        }
      }

      consultarApi();
    } else {
      props.history.push('/iniciar-sesion')
    }
  }, [])

  // si el state esta como false
  if (!auth.auth) {
    props.history.push('/iniciar-sesion');
  }

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">

        {pedidos.map((pedido) =>
          (<DetallesPedido
            key={pedido._id}
            pedido={pedido}
          />)
        )}

      </ul>
    </Fragment>
  )
};

export default withRouter(Pedidos);
