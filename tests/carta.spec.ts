import 'mocha';
import { expect } from 'chai';
import { Carta, Color, Tipo, Rareza } from '../src/magic/carta.js';

describe('Carta', () => {
  describe('constructor', () => {
    it('should create a card with the given parameters', () => {
      const carta = new Carta(1, 'nombre carta', 3, Color.Azul, Tipo.Tierra, Rareza.Comun, 'texto', 100, undefined, undefined);
      expect(carta.getId()).to.equal(1);
      expect(carta.getNombre()).to.equal('nombre carta');
      expect(carta.getCosteMana()).to.equal(3);
      expect(carta.getColor()).to.equal(Color.Azul);
      expect(carta.getTipo()).to.equal(Tipo.Tierra);
      expect(carta.getRareza()).to.equal(Rareza.Comun);
      expect(carta.getTextoReglas()).to.equal('texto');
      expect(carta.getValorMercado()).to.equal(100);
      expect(carta.getFuerzaResistencia()).to.equal(undefined);
      expect(carta.getMarcasLealtad()).to.equal(undefined);
    });
  });
  it('Should throw an error if fuerzaResistencia is not defined in a creature', () => {
    expect(() => new Carta(1, 'Carta', 1, Color.Azul, Tipo.Criatura, Rareza.Comun, 'Texto', 1, undefined, undefined)).to.throw(
      'Las criaturas deben tener fuerza y resistencia',
    );
  });
  it('Should throw an error if marcasLealtad is defined in a planeswalker', () => {
    expect(
      () => new Carta(1, 'Carta', 1, Color.Azul, Tipo.Planeswalker, Rareza.Comun, 'Texto', 1, undefined, undefined),
    ).to.throw('Los planeswalker deben tener marcas de lealtad');
  });
});
