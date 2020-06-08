import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

const Pedidos = () => {

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {

    const consultarApi = async () => {
      // obtener los pedidos
      const resultado = await clienteAxios.get('/pedidos');

      setPedidos(resultado.data);
    }

    consultarApi();
  }, [])

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

export default Pedidos;
