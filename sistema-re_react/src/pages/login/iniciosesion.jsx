import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Importamos Tailwind CSS
import { useNavigate } from 'react-router-dom'; // Importamos el hook useNavigate de React Router DOM
import "bootstrap-icons/font/bootstrap-icons.css"; // Importamos los iconos de Bootstrap
import './inicioSesion.css'; // Incluimos los estilos adicionales
import { useFormik } from 'formik'; // Importamos useFormik para gestionar el estado y validación del formulario

export const Iniciosesion = () => {
  const [data, setData] = useState(); // Estado para almacenar los datos del formulario
  // Función de validación para el formulario
  const validate = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Campo Obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@unl\.edu\.ec$/i.test(values.email)) {
      errors.email = 'Correo inválido el dominio debe ser con @unl.edu.ec';
    }
    return errors;
  };

  // Configuración del formulario con useFormik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Función temporal para mostrar los valores del formulario
    },
  });

  const navigate = useNavigate(); // Obtenemos la función navigate para cambiar de página
  
  // Función para manejar el inicio de sesión
  // Función para manejar el inicio de sesión
const handleLoginClick = async (e) => {
  e.preventDefault();
  const response = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: formik.values.email, password: formik.values.password }),
  });

  // Lógica para manejar la respuesta del inicio de sesión
  if (response.ok) {
    const responseData = await response.json();
    setData(responseData);

    // Mostrar una alerta de éxito
    alert('Inicio de sesión exitoso');

    // Verificar si responseData tiene la propiedad 'funcion' antes de acceder a ella
    if (responseData.funcion && responseData.funcion.length > 0) {
      for (let i = 0; i < responseData.funcion.length; i++) {
        if (responseData.funcion[i].descripcion === 'ENCARGADO SEG') {
          navigate('/interfaz/admin/' + responseData.funcion[i].docente_user_cedula);
        } else if (responseData.funcion[i].descripcion === 'DOCENTE') {
          navigate('/interfaz/docente/' + responseData.funcion[i].docente_user_cedula);
        } else if (responseData.funcion[i].descripcion === 'DIRECTOR') {
          navigate('/interfaz/director/' + responseData.funcion[i].docente_user_cedula);
        }
      }
    } else {
      console.error('No se encontraron roles válidos para el usuario');
    }
  } else {
    console.error('Error al iniciar sesión:', response.statusText);
    alert('Error al iniciar sesión:', response.statusText);
    // Mostrar una alerta visual de error al usuario
  }
};

  const handleActivationEmailClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/activar-cuenta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formik.values.email }),
    });
  
    if (response.ok) {
      // Lógica para manejar la respuesta de activación exitosa
      console.log('Correo de activación enviado correctamente.');
      // Aquí podrías mostrar un mensaje de éxito al usuario o redirigirlo a otra página
    } else {
      // Manejo de errores en la activación de la cuenta
      console.error('Error al activar cuenta:', response.statusText);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };
  const isEmailValid = formik.touched.email && !formik.errors.email && formik.values.email;

  // Efecto para manejar la interacción con los botones de registro e inicio de sesión
  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn) {
      // Agregar clase 'active' al contenedor al hacer clic en 'register'
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });

      // Remover clase 'active' al contenedor al hacer clic en 'login'
      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    }


    // Limpiar listeners al desmontar el componente
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

  // Renderizamos el formulario y los botones de registro e inicio de sesión
  return (
    <div className="supremo dark:bg-slate-700" >
      <div className="container" id="container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
        <div className="form-container sign-up">
          <form>
            <h1 className='font-bold'>Activar cuenta</h1>
            <div className="social-icons">
              <a href="https://github.com/esteban-ll-aguilar/PIS_SistemaRE.git" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-solid fa-school"></i></a>
              <a href="mailto:foranix2023@gmail.com" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-square-instagram"></i></a>
            </div>
            <span>Te enviaremos un enlace de activación a tu correo </span>
            <input type="email" placeholder="correo@unl.edu.ec" required name="email" id="email"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}

            <button 
              type="submit" id="validate-button"
              disabled={!isEmailValid}
              className={isEmailValid ? 'button-enabled' : 'button-disabled'}
              onClick={handleActivationEmailClick}
            >
              Activar correo
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
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
              id="validate-button"
              disabled={!isEmailValid || !formik.values.password}
              className={isEmailValid ? 'button-enabled' : 'button-disabled'}
              onClick={handleLoginClick}
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
              <button id="register">
                Activar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iniciosesion;
