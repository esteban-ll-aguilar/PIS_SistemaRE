import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const OLvidoContrasena = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Campo obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@unl\.edu\.ec$/i.test(values.email)) {
      errors.email = "Correo inválido, el dominio debe ser @unl.edu.ec";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/olvido-contrasena`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });

        if (response.ok) {
          alert("Correo enviado con éxito");
        } else {
          alert("Error al enviar el correo");
        }
      } catch (error) {
        alert("Hubo un error al conectarse con el servidor");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c9d6ff]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#fafafa] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Recuperar Contraseña</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"}`}
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="mt-2 text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
              Enviar
            </button>
          </div>
        </form>
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400"
          onClick={() => navigate("/iniciosesion")}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default OLvidoContrasena;
