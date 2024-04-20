[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/sNC2m9MU)

# Práctica 11 - Aplicación Express para coleccionistas de cartas Magic

Realizada por Inés Garrote Fontenla [alu0101512297@ull.edu.es](alu0101512297@ull.edu.es)  
Enlace al repositorio de Github asociado a la práctica [ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-inesgarrote](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-inesgarrote.git)

## Introducción
En esta práctica, se implementa una aplicación para coleccionistas de cartas Magic mediante un servidor HTTP escrito con Express. La aplicación permite realizar diversas operaciones sobre la colección de cartas de un usuario, como añadir, modificar, eliminar, listar y mostrar cartas.

Los servidores Express son aplicaciones web construidas sobre el marco de trabajo Node.js, diseñadas para simplificar y agilizar el desarrollo de aplicaciones web y APIs. Express proporciona una capa de abstracción sobre Node.js, facilitando la creación de rutas, gestión de peticiones y respuestas, y la integración de middleware para funcionalidades adicionales.
## Desarrollo
Para la implementación de esta práctica se ha tenido que crear un servidor Express que gestione las rutas y las peticiones HTTP de la aplicación. Para ellos primero se ha tenido que hacer modificaciones en el código de la anterior práctica para adaptarlo a Express, es decir, hacer que los métodos sean asíncronos y que usen el patrón callback.

Para el servidor sean empleado los verbos HTTP: GET, POST, DELETE y PATCH

Utilizando el método GET, se puede solicitar detalles específicos de una carta proporcionando su ID y el usuario como parámetros de la consulta. Si no se especifica un ID, se obtiene la colección completa del usuario. Con POST, se agrega una carta al usuario enviando los detalles en formato JSON. DELETE elimina una carta utilizando su ID y el usuario. PATCH permite modificar los detalles de una carta existente, especificando el ID y el usuario, junto con los cambios en formato JSON.

```typescript
import express from 'express';
import { ManejadorCartas } from './manejador_carta.js';
import { JSONaCarta } from './carta.js';

const manejadorCarta = ManejadorCartas.getInstance();
const app = express();
app.use(express.json());

app.get('/cards', (req, res) => {
    const { user, id } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (id) {
        manejadorCarta.mostrarCarta(user as string, parseInt(id as string), (error, result) => {
            res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
        });
    } else {
        manejadorCarta.listarCartas(user as string, (error, result) => {
            res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
        });
    }
    return;
});

app.post('/cards', (req, res) => {
    const { user } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    manejadorCarta.agregarCarta(user as string, JSONaCarta(req.body), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return;
});

app.delete('/cards', (req, res) => {
    const { user, id } = req.query;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (!id) return res.send({ status: 'Error', answer: 'Un id debe ser proporcionado' });
    manejadorCarta.eliminarCarta(user as string, parseInt(id as string), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return; 
});

app.patch('/cards', (req, res) => {
    const { user, id } = req.query;
    const { id: bodyId } = req.body;
    if (!user) return res.send({ status: 'Error', answer: 'Un usuario debe ser proporcionado' });
    if (!id) return res.send({ status: 'Error', answer: 'Un id debe ser proporcionado' });
    if (parseInt(id as string) !== bodyId) {
        return res.send({ status: 'Error', answer: 'El id debe ser el mismo en el query y en el body' });
    }
    manejadorCarta.modificarCarta(user as string, JSONaCarta(req.body), (error, result) => {
        res.send({ status: error ? 'Error' : 'Éxito', answer: error || result });
    });
    return; 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
```

1. Configuración inicial:
- Se importa Express, el manejador de cartas y una función para convertir JSON en carta.
- Se crea una instancia de Express y se configura el middleware para analizar el cuerpo de las solicitudes como JSON.
2. Rutas:
- Se definen cuatro rutas principales en la ruta "/cards": GET, POST, DELETE y PATCH. Estas rutas manejan las diferentes operaciones relacionadas con la colección de cartas del usuario.
3. Ruta GET:
- Permite obtener información sobre una carta específica proporcionando el ID y el usuario como parámetros de la consulta.
- Si no se especifica un ID, devuelve la colección completa de cartas del usuario.
- Se utiliza el método manejadorCarta.mostrarCarta para obtener la carta específica o manejadorCarta.listarCartas para obtener todas las cartas del usuario.
- El resultado se envía de vuelta al cliente como una respuesta JSON.
4. Ruta POST:
- Agrega una nueva carta a la colección del usuario.
- Los detalles de la carta se envían en formato JSON en el cuerpo de la solicitud.
- Se utiliza el método manejadorCarta.agregarCarta para agregar la carta a la colección del usuario.
- El resultado de la operación se envía de vuelta al cliente como una respuesta JSON.
5. Ruta DELETE:
- Elimina una carta de la colección del usuario utilizando el ID de la carta y el nombre de usuario proporcionados como parámetros de la consulta.
- Se utiliza el método manejadorCarta.eliminarCarta para realizar la eliminación.
- El resultado de la operación se envía de vuelta al cliente como una respuesta JSON.
6. Ruta PATCH:
- Modifica los detalles de una carta existente en la colección del usuario.
- Se especifica el ID de la carta y el usuario en los parámetros de la consulta, y los cambios se proporcionan en formato JSON en el cuerpo de la solicitud.
- Se utiliza el método manejadorCarta.modificarCarta para realizar la modificación.
- El resultado de la operación se envía de vuelta al cliente como una respuesta JSON.
7. Inicio del servidor:
- El servidor Express escucha en el puerto 3000.
- Muestra un mensaje en la consola cuando está activo.
## Ejercicio clase
Durante la sesión pe tuvimos que coger los metodos que veniamos implementando de practicas anteriores para usar llamadas a los métodos del API asíncrona usando promesas y posteriormente hacer pruebas.

## Conclusión
En conclusión, la práctica de implementación de una aplicación Express para coleccionistas de cartas Magic permitió aplicar conocimientos en desarrollo de servidores web, rutas, middleware y gestión de solicitudes HTTP. Se enfatizó la importancia de seguir buenas prácticas, documentar el código y diseñar una interfaz de API clara. Express demostró ser una herramienta potente y versátil para construir aplicaciones web y APIs eficientes.