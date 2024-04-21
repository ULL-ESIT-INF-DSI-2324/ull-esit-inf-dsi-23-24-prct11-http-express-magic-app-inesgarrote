import { expect } from 'chai';
import { ManejadorCartas } from '../src/magic/manejador_carta.js';
import { Carta, JSONaCarta, Color, Rareza, Tipo } from '../src/magic/carta.js';

describe('ManejadorCartas', () => {
  let manejadorCartas: ManejadorCartas;

  beforeEach(() => {
    manejadorCartas = ManejadorCartas.getInstance();
  });

  describe('agregarCarta', () => {
    it('should add a card to the collection of a user', (done) => {
      const usuario = 'pepe';
      const carta = new Carta(1, 'nombre carta', 3, Color.Azul, Tipo.Tierra, Rareza.Comun, 'texto', 100, undefined, undefined);
      manejadorCartas.agregarCarta(usuario, carta, (error, resultado) => {
        expect(error).to.be.undefined;
        expect(resultado).to.equal(`La carta ha sido agregada a la colección de ${usuario}`);
        done();
      });
    });

    it('should not add a card to the collection of a user', (done) => {
      const usuario = 'pepe';
      const carta = new Carta(1, 'nombre carta', 3, Color.Azul, Tipo.Tierra, Rareza.Comun, 'texto', 100, undefined, undefined);
      manejadorCartas.agregarCarta(usuario, carta, (error, resultado) => {
        expect(error).to.be.equal(`Ya existe una carta con el mismo ID en la colección de ${usuario}`);
        expect(resultado).to.be.undefined;
        done();
      });
    });
  });

  describe('modificarCarta', () => {
    it('should update a card in the collection of a user', (done) => {
      const usuario = 'pepe';
      const carta = new Carta(
        1,
        'holii',
        3,
        Color.Azul,
        Tipo.Tierra,
        Rareza.Comun,
        'texto modificado',
        100,
        undefined,
        undefined,
      );
      manejadorCartas.modificarCarta(usuario, carta, (error, resultado) => {
        expect(error).to.be.undefined;
        expect(resultado).to.equal(`Carta modificada con éxito en la colección de ${usuario}`);
        done();
      });
    });

    it('should not update a card in the collection of a user', (done) => {
      const usuario = 'pepe';
      const carta = new Carta(
        123,
        'holii',
        3,
        Color.Azul,
        Tipo.Tierra,
        Rareza.Comun,
        'texto modifcado',
        100,
        undefined,
        undefined,
      );
      manejadorCartas.modificarCarta(usuario, carta, (error, resultado) => {
        expect(error).to.be.equal(`La carta no fue encontrada en la colección de ${usuario}`);
        expect(resultado).to.be.undefined;
        done();
      });
    });
  });

  describe('eliminarCarta', () => {
    it('should remove a card from the collection of a user', (done) => {
      const usuario = 'pepe';
      const cartaID = 1;
      manejadorCartas.eliminarCarta(usuario, cartaID, (error, resultado) => {
        expect(error).to.be.undefined;
        expect(resultado).to.equal(`Carta eliminada con éxito en la colección de ${usuario}`);
        done();
      });
    });

    it('should not remove a card from the collection of a user', (done) => {
      const usuario = 'pepe';
      const cartaID = 123;
      manejadorCartas.eliminarCarta(usuario, cartaID, (error, resultado) => {
        expect(error).to.be.equal(`La carta no fue encontrada en la colección de ${usuario}`);
        expect(resultado).to.be.undefined;
        done();
      });
    });
  });

  describe('listarCartas', () => {
    it('should list the cards of a user', (done) => {
      const usuario = 'pepe';
      manejadorCartas.listarCartas(usuario, (error, resultado) => {
        expect(error).to.be.undefined;
        expect(resultado).to.be.a('string');
        done();
      });
    });

    it('should not list the cards of a user', (done) => {
      const usuario = 'quevedo';
      manejadorCartas.listarCartas(usuario, (error, resultado) => {
        expect(error).to.be.equal(`${usuario} no tiene una colección de cartas`);
        expect(resultado).to.be.undefined;
        done();
      });
    });
  });

  describe('mostrarCarta', () => {
    it('should show a card from the collection of a user', (done) => {
      const usuario = 'pepe';
      const cartaID = 2;
      manejadorCartas.mostrarCarta(usuario, cartaID, (error, resultado) => {
        expect(error).to.be.undefined;
        expect(resultado).to.be.a('string');
        done();
      });
    });

    it('should not show a card from the collection of a user', (done) => {
      const usuario = 'pepe';
      const cartaID = 123;
      manejadorCartas.mostrarCarta(usuario, cartaID, (error, resultado) => {
        expect(error).to.be.equal(`La carta no fue encontrada en la colección de ${usuario}`);
        expect(resultado).to.be.undefined;
        done();
      });
    });
  });
});

describe('JSONtoCard', () => {
  it('should convert a card from JSON to a MagiCard object', () => {
    const card = {
      id: 3,
      nombre: 'holi',
      costeMana: 12345,
      color: 'Verde',
      tipo: 'Tierra',
      rareza: 'Rare',
      textoReglas: 'esto es texto',
      valorMercado: 12,
      fuerzaResistencia: undefined,
      marcasLealtad: undefined,
    };

    const magiCard = new Carta(
      card.id,
      card.nombre,
      card.costeMana,
      card.color as Color,
      card.tipo as Tipo,
      card.rareza as Rareza,
      card.textoReglas,
      card.valorMercado,
      card.fuerzaResistencia,
      card.marcasLealtad,
    );

    const result = JSONaCarta(card);

    expect(result).to.deep.equal(magiCard);
  });
});
