import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditarProducto = (props) => {
  // obtener el ID
  const { id } = props.match.params;

  // producto = state, y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
  });

  // consultar la api para traer el prodcuto a editar

  const consultarAPI = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);

    guardarProducto(productoConsulta.data);
  };

  // cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);

  // Edita un producto en la base de datos
  const editarProducto = async (e) => {
    e.preventDefault();

    // crear un formdata
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // almacenarlo en la BD
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //lanzar una alerta
      if (res.status === 200) {
        Swal.fire('Actualizado Correctamente', res.data.mensaje, 'success');
        //redireccionar
        props.history.push('/productos');
      }
    } catch (error) {
      console.log(error);
      // lanzar la alerta
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo',
      });
    }
  };

  //leer los daos del formulario
  const leerInformacionProducto = (e) => {
    guardarProducto({
      // obtener una copia del state y agregar el nuevo
      ...producto,
      [e.target.name]: e.target.value, // value accede al valor de lo que escribas
    });
  };

  // coloca la imagen en el state
  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]); // se utiliza para acceder a los archivos
  };

  // archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState('');

  // validar el formulario
  const validarProducto = () => {
    //Destructuring
    const { nombre, precio } = producto;

    //revisar que las propiedades del state tengan contenido
    let valido = !nombre.length || !precio.length;

    //return true o false
    return valido;
  };

  // extraer los valores del state
  const { nombre, precio, imagen } = producto;

  if (!nombre) return <Spinner />;

  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Producto'
            name='nombre'
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>

        <div className='campo'>
          <label>Precio:</label>
          <input
            type='number'
            name='precio'
            min='0.00'
            step='0.01'
            placeholder='Precio'
            onChange={leerInformacionProducto}
            defaultValue={precio}
          />
        </div>

        <div className='campo'>
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http://localhost:5000/${imagen}`}
              alt='imagen'
              width='300'
            />
          ) : null}
          <input type='file' name='imagen' onChange={leerArchivo} />
        </div>

        <div className='enviar'>
          <input
            type='submit'
            className='btn btn-azul'
            value='Editar Producto'
          // disabled={validarProducto()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(EditarProducto);
