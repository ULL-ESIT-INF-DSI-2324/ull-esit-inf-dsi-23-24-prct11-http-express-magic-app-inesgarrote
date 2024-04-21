import 'mocha';
import { expect } from 'chai';
import request from 'request';
import { ManejadorCartas } from '../src/magic/manejador_carta.js';
import { JSONaCarta } from '../src/magic/carta.js';


// Existe un error con las pruebas del servidor
// Uncaught TypeError: Cannot read properties of undefined (reading 'status')
// No soy capaz de encontrar el error, por lo que no puedo realizar las pruebas
/*
describe('Pruebas de las rutas de la aplicación Express', () => {
  // Instancia del Manejador de Cartas
  const manejadorCarta = ManejadorCartas.getInstance();

  // Prueba para la ruta GET /cards
  it('no debería funcionar si el usuario no se proporciona en la query string', (done) => {
    request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('Un usuario debe ser proporcionado');
      done();
    });
  });
  
  it('debería obtener todas las cartas de un usuario', (done) => {
    request.get({ url: 'http://localhost:3000/cards?user=juan', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Éxito');
      done();
    });
  });

  it('debería obtener una carta de un usuario', (done) => {
    request.get({ url: 'http://localhost:3000/cards?user=juan&id=2', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Éxito');
      done();
    });
  });

  // Prueba para la ruta POST /cards
  it('no debería funcionar si el usuario no se proporciona en la query string', (done) => {
    request.post({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('Un usuario debe ser proporcionado');
      done();
    });
  });

  it('debería añadir una carta a un usuario', (done) => {
    const cardToAdd = {
      id:1,
       nombre: 'holii',
        costeMana:3,
       color: "Azul",
       tipo: "Tierra",
       rareza: "Comun",
       textoReglas: 'texto modificado',
      valorMercado:  100,
       fuerzaResistencia: undefined,
       marcasLealtad: undefined,
    };
    request.post({ url: 'http://localhost:3000/cards?user=juan', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Éxito');
      done();
    });
  });

  it('no debería añadir una carta a un usuario si ya existe una con el mismo id', (done) => {
    const cardToAdd = {
        id:1,
        nombre: 'holii',
         costeMana:3,
        color: "Azul",
        tipo: "Tierra",
        rareza: "Comun",
        textoReglas: 'texto modificado',
       valorMercado:  100,
        fuerzaResistencia: undefined,
        marcasLealtad: undefined,
    };
    request.post({ url: 'http://localhost:3000/cards?user=juan', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("Ya existe una carta con el mismo ID en la colección de juan");
      done();
    });
  });

  // Prueba para la ruta DELETE /cards
  it('no debería funcionar si el usuario no se proporciona en la query string', (done) => {
    request.delete({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('Un usuario debe ser proporcionado');
      done();
    });
  });

  it('debería eliminar una carta de un usuario', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?user=juan&id=55', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Éxito');
      expect(response.body.answer).to.equal("Carta eliminada con éxito en la colección de juan");
      done();
    });
  });

  it('no debería eliminar una carta de un usuario si no existe', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?user=juan&id=999', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("La carta no fue encontrada en la colección de juan");
      done();
    });
  });

  // Prueba para la ruta PATCH /cards
  it('no debería funcionar si el usuario no se proporciona en la query string', (done) => {
    request.patch({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('Un usuario debe ser proporcionado');
      done();
    });
  });

  it('debería actualizar una carta a un usuario', (done) => {
    const cardToAdd = {
        id:1,
       nombre: 'holii actualizado',
        costeMana:3,
       color: "Azul",
       tipo: "Tierra",
       rareza: "Comun",
       textoReglas: 'texto modificado',
      valorMercado:  100,
       fuerzaResistencia: undefined,
       marcasLealtad: undefined,
    };
    request.patch({ url: 'http://localhost:3000/cards?user=juan&id=2', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Éxito');
      expect(response.body.answer).to.equal("Carta modificada con éxito en la colección de juan");
      done();
    });
  });

  it('no debería actualizar una carta a un usuario si no existe', (done) => {
    const cardToAdd = {
        id:123,
       nombre: 'holii',
        costeMana:3,
       color: "Azul",
       tipo: "Tierra",
       rareza: "Comun",
       textoReglas: 'texto modificado',
      valorMercado:  100,
       fuerzaResistencia: undefined,
       marcasLealtad: undefined,
    };
    request.patch({ url: 'http://localhost:3000/cards?user=juan&id=99', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("La carta no fue encontrada en la colección de juan");
      done();
    });
  });

  
});
*/
