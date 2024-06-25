import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './inicioSesion.css';
import { useFormik } from 'formik';

export const Iniciosesion = () => {

  const validateEmail = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Campo Obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@unl\.edu\.ec$/i.test(values.email)) {
      errors.email = 'Correo invalido el dominio debe ser con @unl.edu.ec';
    }
    return errors;
  };

  const validatePassword = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Campo Obligatorio';
    }
    return errors;
  };

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const activate = () => container.classList.add('active');
    const deactivate = () => container.classList.remove('active');

    if (registerBtn && loginBtn) {
      registerBtn.addEventListener('click', activate);
      loginBtn.addEventListener('click', deactivate);
    } else {
      console.error('Register and login buttons not found');
    }

    // Clean up event listeners on unmount
    return () => {
      if (registerBtn && loginBtn) {
        registerBtn.removeEventListener('click', activate);
        loginBtn.removeEventListener('click', deactivate);
      }
    };
  }, []);

  const navigate = useNavigate();

  const formikActivate = useFormik({
    initialValues: { email: '' },
    validate: validateEmail,
    onSubmit: async (values) => {
      try {
        navigate('/interfaz/docente/6115396905');
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    },
  });

  const formikLogin = useFormik({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = validateEmail(values);
      return {
        ...errors,
        ...validatePassword(values),
      };
    },
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
       if (values.password === '1'){
        navigate('/interfaz/docente/6115396905');
       }else{
        navigate('/interfaz/admin/6115396905');
       }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    },
  });

  const isActivateEmailValid = formikActivate.touched.email && !formikActivate.errors.email && formikActivate.values.email;
  const isLoginEmailValid = formikLogin.touched.email && !formikLogin.errors.email && formikLogin.values.email;
  const isLoginPasswordValid = formikLogin.touched.password && !formikLogin.errors.password && formikLogin.values.password;

  return (
    <div className="supremo dark:bg-slate-700" id="container">
      <div className='container '>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
        <div className="form-container sign-up">
          <form onSubmit={formikActivate.handleSubmit}>
            <h1 className='font-bold'>Activar cuenta</h1>
            <div className="social-icons">
              <a href="https://github.com/esteban-ll-aguilar/PIS_SistemaRE.git" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-solid fa-school"></i></a>
              <a href="mailto:foranix2023@gmail.com" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-square-instagram"></i></a>
            </div>
            <span>Te enviaremos un enlace de activación a tu correo</span>
            <input
              type="email"
              placeholder="correo@unl.edu.ec"
              required
              name="email"
              id="emailActivate"
              onChange={formikActivate.handleChange}
              onBlur={formikActivate.handleBlur}
              value={formikActivate.values.email}
            />
            {formikActivate.touched.email && formikActivate.errors.email ? (
              <span style={{ color: 'red' }}>{formikActivate.errors.email}</span>
            ) : null}
            <button
              type="submit"
              id="activate-button"
              disabled={!isActivateEmailValid}
              className={isActivateEmailValid ? 'button-enabled' : 'button-disabled'}
            >Activar correo</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={formikLogin.handleSubmit}>
            <h1 className='font-bold'>Inicia sesión</h1>
            <div className="social-icons">
              <a href="https://github.com/esteban-ll-aguilar/PIS_SistemaRE.git" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-solid fa-school"></i></a>
              <a href="mailto:foranix2023@gmail.com" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-square-instagram"></i></a>
            </div>
            <span>Ingresa tus credenciales institucionales | UNL</span>
            <input
              type="email"
              placeholder="correo@unl.edu.ec"
              required
              name="email"
              id="email"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
            />
            {formikLogin.touched.email && formikLogin.errors.email ? (
              <span style={{ color: 'red' }}>{formikLogin.errors.email}</span>
            ) : null}
            <input
              type="password"
              placeholder="contraseña"
              required
              name="password"
              id="password"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.password}
            />
            <button
              type="submit"
              id="login-button"
              disabled={!isLoginEmailValid || !isLoginPasswordValid}
              className={isLoginEmailValid && isLoginPasswordValid ? 'button-enabled' : 'button-disabled'}
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
              <p>Si ya realizaste correctamente tu validación, ya eres parte de nuestro sistema ¡Bienvenido!</p>
              <button id="login">Ingresa aquí</button>
            </div>
            <div id='hidden' className="toggle-panel toggle-right">
              <h1 className='font-bold'>FORANIX</h1>
              <p>Si eres nuevo por aquí, debes realizar la activación de tu correo electrónico para que puedas hacer uso de nuestro sistema.</p>
              <button id="register">Activar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iniciosesion;
