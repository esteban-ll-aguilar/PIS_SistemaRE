const verificarFechaMayorAUnMes = (fecha) => {
    // Crear un objeto Date con la fecha ingresada
    const fechaIngresada = new Date(fecha);

    // Crear una nueva fecha un mes después de la fecha ingresada
    const fechaUnMesSuperior = new Date(fechaIngresada);
    fechaUnMesSuperior.setMonth(fechaUnMesSuperior.getMonth() + 1);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Comparar la fecha actual con la fecha un mes superior
    if (fechaActual < fechaUnMesSuperior) {
        return true;
    } else {
        return false;
    }
}



const verificarFechaMayor = (fecha) => {
    // Crear un objeto Date con la fecha ingresada
    const fechaIngresada = new Date(fecha);

    // Verificar si la fecha ingresada es válida
    if (isNaN(fechaIngresada.getTime())) {
        throw new Error('Fecha ingresada no es válida');
    }

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Comparar la fecha actual con la fecha ingresada
    
    return fechaActual < fechaIngresada;
};
export {verificarFechaMayor, verificarFechaMayorAUnMes};

