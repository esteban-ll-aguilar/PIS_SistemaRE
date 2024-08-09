import React from "react";

const CargandoBottonAnimation = ({ loading, textload='Subiendo', textunload='Subir Archivo' }) => {
    return (
        <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center ${loading ? 'cursor-wait' : ''}`}
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 016.293-7.293l1.414 1.414A6 6 0 0012 10v2a6 6 0 00-1.293 3.293l-1.414 1.414A8 8 0 014 12z"></path>
              </svg>
            )}
            {loading ? `${textload}...` : `${textunload}`}
        </button>

    );
    }

export default CargandoBottonAnimation;