import React from 'react';
import { Bars } from 'react-loader-spinner';

const Cargando = () => {
    return (
        <div className="flex justify-center h-screen items-center">
          <div className="flex flex-col items-center">
            <Bars
              height="80"
              width="80"
              color="#6366F1"
              ariaLabel="loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <h1 className="text-black text-3xl p-4"><b>Cargando...</b></h1>
          </div>
        </div>
    );
}

export default Cargando;
