import React, { Fragment, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

//importar el context
import { CRMContext } from '../../context/CRMContext';

const NuevoCliente = ({ history }) => {
  //cliente = state, guardarCliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',
  });

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // leer los datos del formulario
  const actualizarState = (e) => {
    // Almacenar lo que el usuario esscribe en el state
    guardarCliente({
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

  // añade en la rest api un nuev cliente
  const agregarCliente = (e) => {
    e.preventDefault();

    // enviar peticion
    clienteAxios.post('/clientes', cliente, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((res) => {
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

        Swal.fire('Se agrego el cliente', res.data.mensaje, 'success');
        //redireccionar
        history.push('/');
      }
    });
  };

  //verificar si el usuario esta autenticado o no
  if (!auth.auth && (localStorage.getItem('token') === auth.token)) {
    history.push('/iniciar-sesion');
  }

  return (
    <Fragment>
      <h1>Nuevo cliente</h1>

      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className='campo'>
          <label>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre Cliente'
            name='nombre'
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
          <label>Apellido:</label>
          <input
            type='text'
            placeholder='Apellido Cliente'
            name='apellido'
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
          <label>Empresa:</label>
          <input
            type='text'
            placeholder='Empresa Cliente'
            name='empresa'
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
          <label>Email:</label>
          <input
            type='email'
            placeholder='Email Cliente'
            name='email'
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
          <label>Teléfono:</label>
          <input
            type='tel'
            placeholder='Teléfono Cliente'
            name='telefono'
            onChange={actualizarState}
          />
        </div>

        <div className='enviar'>
          <input
            type='submit'
            className='btn btn-azul'
            value='Agregar Cliente'
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

// HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
