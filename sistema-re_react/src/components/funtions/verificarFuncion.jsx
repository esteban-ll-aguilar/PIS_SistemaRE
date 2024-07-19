const verificarFuncion = async (cedula, descripcion) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/ver/funciones_docente/${cedula}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        const funciones = data.funciones;
        console.log(funciones);
        let tienePermiso = false;
        for (let i = 0; i < funciones.length; i++) {
            if (funciones[i].descripcion === descripcion) {
                tienePermiso = true;
            }
        }

        if (!tienePermiso) {
            alert('No tienes permisos para acceder a esta interfaz');
                window.location.href = 'http://localhost:3000/';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default verificarFuncion;
