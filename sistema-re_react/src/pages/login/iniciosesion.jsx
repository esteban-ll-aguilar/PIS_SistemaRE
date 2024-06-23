import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './inicioSesion.css';
import { useFormik } from 'formik';
import axios from 'axios';

export const Iniciosesion = () => {

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Campo Obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@unl\.edu\.ec$/i.test(values.email)) {
      errors.email = 'Correo invalido el dominio debe ser con @unl.edu.ec';
    }

    return errors;
  };

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    }

    return () => {
      if (registerBtn && loginBtn) {
        registerBtn.removeEventListener('click', () => {
          container.classList.add('active');
        });

        loginBtn.removeEventListener('click', () => {
          container.classList.remove('active');
        });
      }
    };
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        /* const response = await axios.post('http://127.0.0.1:5000/login', {
          email: values.email,
          password: values.password,
        });
        var funcion = response.data.funcion;
        var docente = response.data.docente;
        for (var i = 0; i < funcion.length; i++) {
          if (funcion[i] === 'ADMINISTRADOR') {
            navigate('/interfaz/admin/'+docente[0].user_cedula);
          } else if (funcion[i] === 'RESPOSABLE') {
            navigate('/interfaz/responsable/'+docente[0].user_cedula);
          }else{
            navigate('/interfaz/docente/'+docente[0].user_cedula);
          }
        } */
        navigate('/interfaz/docente/6115396905');
      } catch (error) {
        // Maneja los errores aquí
        console.error('Error al enviar la solicitud:', error);
      }
    },
  });

  const isEmailValid = formik.touched.email && !formik.errors.email && formik.values.email;

  return (
    <div className="supremo" id="container">
      <div className='container'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
        <div className="form-container sign-up">
          <form onSubmit={formik.handleSubmit}>
            <h1 className='font-bold'>Activar cuenta</h1>
            <div className="social-icons">
              <a href="https://github.com/esteban-ll-aguilar/PIS_SistemaRE.git" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-solid fa-school"></i></a>
              <a href="mailto:foranix2023@gmail.com" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-square-instagram"></i></a>
            </div>
            <span>Te enviaremos un enlace de activación a tu correo </span>
            <input type="email" placeholder="correo@unl.edu.ec" required name="email" id="emailActivate"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}
            <button 
              type="submit" id="activate-button"
              disabled={!isEmailValid}
              className={isEmailValid ? 'button-enabled' : 'button-disabled'}
            >Activar correo</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={formik.handleSubmit}>
            <h1 className='font-bold'>Inicia sesión</h1>
            <div className="social-icons">
              <a href="https://github.com/esteban-ll-aguilar/PIS_SistemaRE.git" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-solid fa-school"></i></a>
              <a href="mailto:foranix2023@gmail.com" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-square-instagram"></i></a>
            </div>
            <span>Ingresa tus credenciales institucionales | UNL</span>
            <input type="email" placeholder="correo@unl.edu.ec" required name="email" id="email"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}
            <input type="password" placeholder="contraseña" required name="password" id="password"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
            <button 
              type="submit" 
              id="login-button"
              disabled={!isEmailValid || !formik.values.password}
              className={isEmailValid ? 'button-enabled' : 'button-disabled'}
            >
              Iniciar sesión
            </button>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div id='hidden' className="toggle-panel toggle-left">
              <h1 className='font-bold'>FORANIX</h1>
              <p>Si ya realizaste correctamente tu validación, ya eres parte de nuestro sistema !Bienvenido¡</p>
              <button id="login">Ingresa aquí</button>
            </div>
            <div id='hidden' className="toggle-panel toggle-right">
              <h1 className='font-bold'>FORANIX</h1>
              <p>Si eres nuevo por aquí, debes realizar la activación de tu correo
                electronico para que puedas ser uso de nuestro sistema.
              </p>
              <button id="register">Activar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iniciosesion;
