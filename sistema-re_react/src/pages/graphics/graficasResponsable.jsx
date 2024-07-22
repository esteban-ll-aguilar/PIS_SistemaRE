import React, { useState, useEffect } from 'react';
import GraficasCiclo from '../graphics/graficasCiclo';
import GraficasMateria from './graficasMateria';
import Cargando from '../../components/funtions/cargando';

export const GraficasResponsable = () => {
    const [rendimientoMaterias, setRendimientoMaterias] = useState({});
    const [rendimientoCiclo, setRendimientoCiclo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/ciclo/rendimiento/materias/', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data.rendimientoCiclos);
                setRendimientoMaterias(data.rendimientoMaterias);
                setRendimientoCiclo(data.rendimientoCiclos);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Cargando />
            ) : (
                <div>
                    <div className='dashboard gap-4 p-4'>
                        <div className="bg-white card col-span-1 md:col-span-2 lg:col-span-3 p-4 dark:bg-sky-900 dark:text-white rounded-md">
                            <div className="stat dark:bg-sky-900">
                                <h2 className='text-2xl font-bold text-center mt-4'>Rendimiento Académico Estudiantil</h2>
                                <p className='text-center'>Gráfica del rendimiento estudiantil por ciclo de la carrera de computación, seleccione el ciclo para observar su rendimiento</p>
                                <GraficasCiclo rendimientoCiclos={rendimientoCiclo} />
                            </div>
                            <div className="chart"></div>
                        </div>
                        {Object.keys(rendimientoMaterias).map(cicloKey => (
                            <div key={cicloKey} className="  bg-white  card col-span-1 mt-4 md:col-span-2 lg:col-span-3 p-3 color dark:bg-sky-900 dark:text-white rounded-md items-center">                                <div className="text-2xl chart-title font-bold text-center mt-4">Ciclo {cicloKey}</div>
                                <div className="line-chart"></div>
                                <GraficasMateria materias={rendimientoMaterias[cicloKey].materias} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default GraficasResponsable;
