import { Carta, Tablero, InfoCarta, tablero, infoCartas } from "./model";

import { finalizarPartida, renderizarTablero } from "./ui";

// Función para mezclar un array (shuffle)
const barajarCartas = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice(); // Crear una copia del array para no modificar el original

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

export const crearColeccionDeCartasInicial = (
  infoCartas: InfoCarta[]
): Carta[] => {
  const cartas: Carta[] = [];
  infoCartas.forEach((infoCarta) => {
    const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    cartas.push(carta1, carta2);
  });
  // Mezclar las cartas
  return barajarCartas(cartas);
};

// Función para manejar el inicio de la partida
export const iniciarPartida = () => {
  tablero.cartas = crearColeccionDeCartasInicial(infoCartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  renderizarTablero();
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const carta = tablero.cartas[indice];
  return (
    !carta.encontrada &&
    !carta.estaVuelta &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return (
    tablero.estadoPartida === "DosCartasLevantadas" &&
    tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
  );
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  if (sonPareja(indiceA, indiceB, tablero)) {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];
    cartaA.encontrada = true;
    cartaB.encontrada = true;
  }
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  if (sonPareja(indiceA, indiceB, tablero)) {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];
    cartaA.estaVuelta = false;
    cartaB.estaVuelta = false;
  } else {
    // Si no son pareja, espera 1 segundo y luego resetea su estado sin voltear
    setTimeout(() => {
      const cartaA = tablero.cartas[indiceA];
      const cartaB = tablero.cartas[indiceB];
      cartaA.estaVuelta = false;
      cartaB.estaVuelta = false;
      renderizarTablero();
    }, 1000);
  }
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Función para voltear una carta
export const voltearCarta = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    tablero.cartas[indice].estaVuelta = true;

    if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.estadoPartida = "UnaCartaLevantada";
      tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === "UnaCartaLevantada") {
      tablero.estadoPartida = "DosCartasLevantadas";
      tablero.indiceCartaVolteadaB = indice;

      const indiceA = tablero.indiceCartaVolteadaA || 0;
      const indiceB = tablero.indiceCartaVolteadaB || 0;

      if (sonPareja(indiceA, indiceB, tablero)) {
        parejaEncontrada(tablero, indiceA, indiceB);
      } else {
        parejaNoEncontrada(tablero, indiceA, indiceB);
      }

      // Comprobar si todas las cartas han sido encontradas
      if (esPartidaCompleta(tablero)) {
        finalizarPartida();
      } else {
        // Reiniciar el estado de la partida si no se ha completado
        reiniciarPartida();
      }
    }

    renderizarTablero();
  }
};

// Función para reiniciar el estado de la partida
export const reiniciarPartida = () => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  renderizarTablero();
};
