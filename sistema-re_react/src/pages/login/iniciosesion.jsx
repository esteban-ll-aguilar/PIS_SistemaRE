import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'; // Incluimos los estilos adicionales

const Iniciosesion = () => {
  
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

    // Clean up event listeners on component unmount
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
    <div className="container" id="container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
      <div className="form-container sign-up">
        <form>
          <h1>Activar cuenta</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>Te enviaremos una clave de activación a tu correo</span>
          <input type="email" placeholder="correo@unl.edu.ec" required />
          <input type="password" placeholder="Tu codigo de activación" required />
          <button type="submit">Validar</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Inicia sesión</h1>
          <div className="social-icons">
            <a href="https://www.instagram.com/foranix/" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.unl.edu.ec/" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>Ingresa tus credenciales institucionales | UNL</span>
          <input type="email" placeholder="correo@unl.edu.ec" required />
          <input type="password" placeholder="contraseña" required />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>FORANIX</h1>
            <p>Si ya realizaste correctamente tu validación, ya eres parte de nuestro sistema !Bienvenido¡</p>
            <button id="login">Ingresa aquí</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>FORANIX</h1>
            <p>Si eres nuevo por aquí, debes realizar la activación de tu correo
              y cambiar la contraseña temporal que te fue asignada.
            </p>
            <button id="register">Activar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iniciosesion;
