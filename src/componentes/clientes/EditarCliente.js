import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const EditarCliente = (props) => {
  // obtener el ID
  const { id } = props.match.params;
  const { history } = props;

  // query a la api
  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
    /*.then((res) => {
        console.log(res);
      });*/

    //colocar en el state
    datosCliente(clienteConsulta.data);
  };

  //useeffect cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);

  //cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, datosCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
  });

  // leer los datos del formulario
  const actualizarState = (e) => {
    // Almacenar lo que el usuario esscribe en el state
    datosCliente({
      // obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // validar el formulario
  const validarCliente = () => {
    //Destructuring
    const { nombre, apellido, email, empresa, telefono } = cliente;

    //revisar que las propiedades del state tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;

    //return true o false
    return valido;
  };

  const actualizarCliente = (e) => {
    e.preventDefault();

    //enviar peticion por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente).then((res) => {
      //se ejecutan el then cuando la conexion con la rest api es exitosa code 200
      // validar si hay errores de mongo
      if (res.data.code === 11000) {
        //este codigo de error es para duplicado en mongo
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'Email duplicado',
        });
      } else {
        console.log(res.data);
        Swal.fire(
          'Se actualizo el cliente correctamente',
          res.data.mensaje,
          'success'
        );
        //redireccionar
        history.push('/');
      }
    });
  };

  return (
    <Fragment>
      <h1>Editar cliente</h1>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Cliente'
            name='nombre'
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className='campo'>
          <label>Apellido:</label>
          <input
            type='text'
            placeholder='Apellido Cliente'
            name='apellido'
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className='campo'>
          <label>Empresa:</label>
          <input
            type='text'
            placeholder='Empresa Cliente'
            name='empresa'
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className='campo'>
          <label>Email:</label>
          <input
            type='email'
            placeholder='Email Cliente'
            name='email'
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className='campo'>
          <label>Teléfono:</label>
          <input
            type='tel'
            placeholder='Teléfono Cliente'
            name='telefono'
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className='enviar'>
          <input
            type='submit'
            className='btn btn-azul'
            value='Guardar Cambios'
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

// HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);
