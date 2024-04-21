/**
 * @brief Enumerado de colores de las cartas
 */
export enum Color {
  Blanco = 'Blanco',
  Azul = 'Azul',
  Negro = 'Negro',
  Rojo = 'Rojo',
  Verde = 'Verde',
  Incoloro = 'Incoloro',
  Multicolor = 'Multicolor',
}

/**
 * @brief Enumerado de tipo de carta
 */
export enum Tipo {
  Tierra = 'Tierra',
  Criatura = 'Criatura',
  Encantamiento = 'Encantamiento',
  Conjuro = 'Conjuro',
  Instantaneo = 'Instantaneo',
  Artefacto = 'Artefacto',
  Planeswalker = 'Planeswalker',
}

/**
 * @brief Enumerado de rareza de carta
 */
export enum Rareza {
  Comun = 'Comun',
  Infrecuente = 'Infrecuente',
  Rara = 'Rara',
  Mitica = 'Mitica',
}

// alias de tipo
export type fuerzaResistencia = [number, number] | undefined;

/**
 * @brief Interfaz para la clase Carta
 */
export interface CartaIntertaz {
  id: number;
  nombre: string;
  costeMana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  textoReglas: string;
  fuerzaResistencia: fuerzaResistencia; // sólo se incluyen en aquellas cartas de tipo Criatura
  marcasLealtad: number | undefined; // Solo en cartas Planeswalker
  valorMercado: number;
}

/**
 * @brief Clase Carta
 */
export class Carta implements CartaIntertaz {
  constructor(
    public id: number,
    public nombre: string,
    public costeMana: number,
    public color: Color,
    public tipo: Tipo,
    public rareza: Rareza,
    public textoReglas: string,
    public valorMercado: number,
    public fuerzaResistencia: fuerzaResistencia,
    public marcasLealtad: number | undefined,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.costeMana = costeMana;
    this.color = color;
    this.tipo = tipo;
    this.rareza = rareza;
    this.textoReglas = textoReglas;
    this.valorMercado = valorMercado;
    if (this.tipo === Tipo.Criatura) {
      if (fuerzaResistencia == undefined) {
        throw new Error('Las criaturas deben tener fuerza y resistencia');
      }
      this.fuerzaResistencia = fuerzaResistencia;
    }
    if (this.tipo === Tipo.Planeswalker) {
      if (marcasLealtad == undefined) {
        throw new Error('Los planeswalker deben tener marcas de lealtad');
      }
      this.marcasLealtad = marcasLealtad;
    }
  }

  /**
   * @brief devuelve el id de la carta
   */
  public getId(): number {
    return this.id;
  }

  /**
   * @brief devuelve el nombre de la carta
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * @brief devuelve el coste de maná de la carta
   */
  public getCosteMana(): number {
    return this.costeMana;
  }

  /**
   * @brief devuelve el color de la carta
   */
  public getColor(): Color {
    return this.color;
  }

  /**
   * @brief devuelve el tipo de la carta
   */
  public getTipo(): Tipo {
    return this.tipo;
  }

  /**
   * @brief devuelve la rareza de la carta
   */
  public getRareza(): Rareza {
    return this.rareza;
  }

  /**
   * @brief devuelve el texto de reglas de la carta
   */
  public getTextoReglas(): string {
    return this.textoReglas;
  }

  /**
   * @brief devuelve el valor de mercado de la carta
   */
  public getValorMercado(): number {
    return this.valorMercado;
  }

  /**
   * @brief devuelve la fuerza y resistencia de la carta
   */
  public getFuerzaResistencia(): fuerzaResistencia {
    return this.fuerzaResistencia;
  }

  /**
   * @brief devuelve las marcas de lealtad de la carta
   */
  public getMarcasLealtad(): number | undefined {
    return this.marcasLealtad;
  }
}

/**
 * @brief convierte una carta de JSON a un objeto Carta
 * @param card objeto JSON con los datos de la carta
 * @returns objeto Carta
 */
export function JSONaCarta(card: any): Carta {
  const cartaMagic = new Carta(
    card.id,
    card.nombre,
    card.costeMana,
    card.color,
    card.tipo,
    card.rareza,
    card.textoReglas,
    card.valorMercado,
    card.fuerzaResistencia,
    card.marcasLealtad,
  );
  return cartaMagic;
}
