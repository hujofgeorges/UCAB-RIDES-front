const user = JSON.parse(localStorage.getItem("user"));


export const msjpasajeroCasa = [
    '¡Hola!',
    'Estoy en la laguna de los patos',
    '¡Estoy en la parada de colas!',
    'No te veo',
    'No puedo ir al punto de encuentro',
    'Si',
    'No',
    '¿Te fuiste?',
    'Voy en camino',
    '¡Ya llegué!',
    '¡Gracias por la cola!',
    'Adios!'
]

export const msjpasajeroUcab = [
    `Mi número de teléfono es: ${user?.phoneNumber}`,
    '¡Hola!',
    'Voy para el punto de encuentro',
    '¡Ya llegué al punto de encuentro!',
    'No te veo',
    'No puedo ir al punto de encuentro',
    'Si',
    'No',
    '¿Me puedes dar tu número telefónico?',
    'Voy en camino',
    '¡Gracias por la cola!',   
    'Adios!' 
]

export const msjconductorUcab = [
    `Mi número de teléfono es: ${user?.phoneNumber} `,
    '¡Hola!',
    'Te espero 5 minutos',
    'Te espero en el punto de encuentro',
    'No te veo',
    'Si',
    'No',
    'Voy saliendo de mi casa',
    'Estoy cerca del punto de encuentro',
    '¡Ya llegué!',
    '¿Dónde estás?',
    'No puedo ir al punto de encuentro',
    'Ya me fui',
    'Adios!'
]


export const msjconductorCasa = [
    '¡Hola!',
    'En 5 minutos salgo',
    'Estoy en la laguna de los patos',
    'Nos vemos en Caja Negra',
    '¡Tengo Prisa!',
    'Si',
    'No',
    'Estoy en el CDE',
    '¡Espérame en la parada de colas!',
    'Estoy esperando en la parada de colas',
    'Ya me fui',
    'Adios!'
]

