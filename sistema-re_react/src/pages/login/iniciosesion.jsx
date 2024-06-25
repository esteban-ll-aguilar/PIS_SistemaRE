import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './inicioSesion.css'; // Incluimos los estilos adicionales
import { useFormik } from 'formik';

export const Iniciosesion = () => {

  //---------------------------------------------------------------- VALIDACION DEL DOMINIO DEL CORREO ELECTRONICO ------------------------------------------------
  const validate = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Campo Obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@unl\.edu\.ec$/i.test(values.email)) {
      errors.email = 'Correo invalido el dominio debe ser con @unl.edu.ec';
    }
  
    return errors;
  };

   // ----------------------------------------------------------------- FORMULARIO DE INICIO DE SESION --------------------------------------------------------------
   const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const navigate = useNavigate();
  
  const handleLoginClick = (e) => {
    e.preventDefault();
    if (formik.touched.email && !formik.errors.email && formik.values.email && formik.values.password) {
    if (formik.values.password === '1'){
      navigate('/interfaz/admin/6115396905');
    }
    else {
      navigate('/interfaz/docente/6115396905');
    }
    }
  };

  const isEmailValid = formik.touched.email && !formik.errors.email && formik.values.email;

  // ----------------------------------------------------------------- FUNCIONES DE LOS BOTONES --------------------------------------------------------------
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
           >Activar correo</button>
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
            <button id="register">Activar</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Iniciosesion;