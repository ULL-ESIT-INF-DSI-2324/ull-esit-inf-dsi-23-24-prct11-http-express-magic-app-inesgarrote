//import request from 'request';
import "mocha";
//import { expect } from "chai";
import pkg from "chai";
const { expect } = pkg;
import { Usuario } from "../src/ejercicio-pe/usuario.js";
import { Carta, Color } from "../src/ejercicio-pe/carta.js";


describe('Usuario methods tests', () => {
    let usuario: Usuario;
  
    beforeEach(() => {
      usuario = new Usuario("nombreUsuario");
    });
  
    it('agregarCarta should add a card to the collection', () => {
      const carta: Carta = new Carta(1, "Carta1",4, Color.Azul, "Tipo1", "Rareza1", "Texto1", 3, 2, 5, 10);
      return usuario.agregarCarta(carta)
        .then(() => {
          expect(usuario.coleccion.length).to.be.equal(1);
          expect(usuario.coleccion[0]).to.deep.equal(carta);
        });
    });
  
    it('eliminarCarta should remove a card from the collection', () => {
      const carta: Carta = new Carta(1, "Carta1",4,  Color.Azul, "Tipo1", "Rareza1", "Texto1", 3, 2, 5, 10);
      usuario.coleccion.push(carta);
      return usuario.eliminarCarta(1)
        .then(() => {
          expect(usuario.coleccion.length).to.be.equal(0);
        });
    });
  
    it('eliminarCarta should return an error if card not found', () => {
      return usuario.eliminarCarta(999)
        .catch((error) => {
          expect(error.message).to.be.equal("¡Error! No se encontró ninguna carta con ese ID en la colección.");
        });
    });
  });