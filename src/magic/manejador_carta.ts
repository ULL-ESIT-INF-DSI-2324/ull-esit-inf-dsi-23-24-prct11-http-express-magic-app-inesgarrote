import * as fs from 'fs';
import { Carta } from './carta.js';

/**
 * Clase para gestionar las cartas de los usuarios.
 */
export class ManejadorCartas {
  private static instance: ManejadorCartas;

  private constructor() {}

  /**
   * Obtiene la instancia singleton de ManejadorCartas.
   */
  public static getInstance(): ManejadorCartas {
    if (!ManejadorCartas.instance) {
      ManejadorCartas.instance = new ManejadorCartas();
    }
    return ManejadorCartas.instance;
  }

  /**
   * Agrega una carta a la colección de un usuario.
   */
  public agregarCarta(
    usuario: string,
    carta: Carta,
    callback: (error: string | undefined, resultado: string | undefined) => void,
  ): void {
    const carpetaUsuario = `./cartas/${usuario}`;
    const rutaArchivo = `${carpetaUsuario}/${carta.getId()}.json`;

    fs.mkdir(carpetaUsuario, { recursive: true }, (err) => {
      if (err) return callback(err.message, undefined);
      fs.stat(rutaArchivo, (err) => {
        if (err) {
          fs.writeFile(rutaArchivo, JSON.stringify(carta), (err) => {
            if (err) return callback(err.message, undefined);
            callback(undefined, `La carta ha sido agregada a la colección de ${usuario}`);
          });
        } else {
          callback(`Ya existe una carta con el mismo ID en la colección de ${usuario}`, undefined);
        }
      });
    });
  }

  /**
   * Elimina una carta de la colección de un usuario.
   */
  public eliminarCarta(
    usuario: string,
    cartaID: number,
    callback: (error: string | undefined, resultado: string | undefined) => void,
  ): void {
    const rutaArchivo = `./cartas/${usuario}/${cartaID}.json`;

    fs.stat(rutaArchivo, (err) => {
      if (err) return callback(`La carta no fue encontrada en la colección de ${usuario}`, undefined);
      fs.unlink(rutaArchivo, (err) => {
        if (err) return callback(err.message, undefined);
        callback(undefined, `Carta eliminada con éxito en la colección de ${usuario}`);
      });
    });
  }

  /**
   * Modifica una carta en la colección de un usuario.
   */
  public modificarCarta(
    usuario: string,
    carta: Carta,
    callback: (error: string | undefined, resultado: string | undefined) => void,
  ): void {
    const rutaArchivo = `./cartas/${usuario}/${carta.getId()}.json`;

    fs.stat(rutaArchivo, (err) => {
      if (err) return callback(`La carta no fue encontrada en la colección de ${usuario}`, undefined);
      fs.writeFile(rutaArchivo, JSON.stringify(carta), (err) => {
        if (err) return callback(err.message, undefined);
        callback(undefined, `Carta modificada con éxito en la colección de ${usuario}`);
      });
    });
  }

  /**
   * Lista las cartas de un usuario.
   */
  public listarCartas(usuario: string, callback: (error: string | undefined, resultado: string | undefined) => void): void {
    const dirPath = `./cartas/${usuario}`;

    fs.stat(dirPath, (err) => {
      if (err) return callback(`${usuario} no tiene una colección de cartas`, undefined);
      fs.readdir(dirPath, (err, files) => {
        if (err) return callback(err.message, undefined);
        const collection: string[] = [];
        let n_ficheros = 0;
        files.forEach((file) => {
          fs.readFile(`${dirPath}/${file}`, (err, data) => {
            if (err) return callback(err.message, undefined);
            collection.push(data.toString());
            n_ficheros++;
            if (n_ficheros === files.length) {
              callback(undefined, JSON.stringify(collection));
            }
          });
        });
      });
    });
  }

  /**
   * Muestra una carta de la colección de un usuario.
   */
  public mostrarCarta(
    usuario: string,
    cartaID: number,
    callback: (error: string | undefined, resultado: string | undefined) => void,
  ): void {
    const rutaArchivo = `./cartas/${usuario}/${cartaID}.json`;

    fs.stat(rutaArchivo, (err) => {
      if (err) return callback(`La carta no fue encontrada en la colección de ${usuario}`, undefined);
      fs.readFile(rutaArchivo, (err, data) => {
        if (err) return callback(err.message, undefined);
        const carta = [data.toString()];
        callback(undefined, JSON.stringify(carta));
      });
    });
  }
}
