import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

// Context
import { CRMContext } from '../../context/CRMContext';


const Login = (props) => {

    // auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    //State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({});

    // almacenar lo que el usuario ecribe en el state
    const leerDatos = (e) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })

    }

    // inicia sesion en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        // autenticar usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data
            localStorage.setItem('token', token);

            // guardar en el state
            guardarAuth({
                token,
                auth: true
            })

            //alerta
            Swal.fire({
                title: 'Login Correcto',
                text: 'Has iniciado Sesion',
                icon: 'Succes'
            })

            //redireccionar
            props.history.push('/');


        } catch (error) {

            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje

                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error'

                })
            }


        }
    }

    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesion"
                            required
                            onChange={leerDatos}
                        />

                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesion"
                            required
                            onChange={leerDatos}
                        />

                    </div>

                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);