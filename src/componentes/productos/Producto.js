import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;

  // elimina un producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: 'esta seguro que desea eliminar?',
      text: 'Esto no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar',
    }).then((result) => {
      if (result.value) {
        // Eliminar en la rest api
        clienteAxios.delete(`/productos/${id}`).then((res) => {
          if (res.status === 200) {
            //si la respuesta es 200 significa que se elimino
            Swal.fire('Eliminado!', res.data.mensaje, 'success');
          }
        });
      }
    });
  };
  return (
    <li className='producto'>
      <div className='info-producto'>
        <p className='nombre'>{nombre}</p>
        <p className='precio'>$ {precio} </p>
        {imagen ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`}
            style={{ width: 200, height: 200 }}
            alt='imagen'
          />
        ) : null}
      </div>
      <div className='acciones'>
        <Link to={`/productos/editar/${_id}`} className='btn btn-azul'>
          <i className='fas fa-pen-alt'></i>
          Editar Producto
        </Link>

        <button
          type='button'
          className='btn btn-rojo btn-eliminar'
          onClick={() => eliminarProducto(_id)}
        >
          <i className='fas fa-times'></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default Producto;
