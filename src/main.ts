// main.ts
import { renderizarTablero } from './ui';


import { iniciarPartida } from './motor';

/*const tableroElement = document.getElementById("tablero") as HTMLDivElement;*/
const iniciarBtn = document.getElementById("iniciarBtn") as HTMLButtonElement;


// Event listener para el botón de iniciar partida
iniciarBtn.addEventListener("click", () => {
  iniciarPartida();
  renderizarTablero();
});



// cartas.ts
/*interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  // Agrega aquí las demás cartas

  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];*/
/*
// Función para mezclar un array (shuffle)
const barajarCartas = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice(); // Crear una copia del array para no modificar el original

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const cartas: Carta[] = [];
  infoCartas.forEach((infoCarta) => {
    const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    cartas.push(carta1, carta2);
  });
  // Mezclar las cartas
  return barajarCartas(cartas);
};*/
/*
type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: [],
  estadoPartida: "PartidaNoIniciada",
});

let tablero: Tablero = crearTableroInicial();

const tableroElement = document.getElementById("tablero") as HTMLDivElement;
const iniciarBtn = document.getElementById("iniciarBtn") as HTMLButtonElement;

// Función para renderizar el tablero en el HTML

const renderizarTablero = () => {
  const tableroContainer = document.getElementById("contenedor-cartas");

  if (tableroContainer && tableroContainer instanceof HTMLDivElement) {
    tableroContainer.innerHTML = ""; // Limpiar el contenido antes de renderizar

    // Lógica para renderizar cada carta
    tablero.cartas.forEach((carta, index) => {
      const cartaElement = document.createElement("div");
      cartaElement.className = "carta";
      cartaElement.setAttribute("data-indice-array", index.toString());

      if (carta.estaVuelta || carta.encontrada) {
        cartaElement.innerHTML = `<img src="${carta.imagen}" alt="" data-indice-image="${index}" />`;
      } else {
        cartaElement.innerHTML = `<img src="https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png" alt="" data-indice-image="${index}" />`;
        cartaElement.addEventListener("click", () => voltearCarta(index));
      }

      tableroContainer.appendChild(cartaElement);
    });
  }
};*/
/*
// Función para manejar el inicio de la partida
const iniciarPartida = () => {
  tablero.cartas = crearColeccionDeCartasInicial(infoCartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  renderizarTablero();
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  return (
    !carta.encontrada &&
    !carta.estaVuelta &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return (
    tablero.estadoPartida === "DosCartasLevantadas" &&
    tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
  );
};

const parejaEncontrada = (
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

const parejaNoEncontrada = (
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

const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Función para voltear una carta
const voltearCarta = (indice: number) => {
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
};*/
/*
const finalizarPartida = () => {
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
    alert("¡Has ganado!");
  } else {
    reiniciarPartida();
  }
};

// Función para reiniciar el estado de la partida
const reiniciarPartida = () => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  renderizarTablero();
};

// Event listener para el botón de iniciar partida
iniciarBtn.addEventListener("click", iniciarPartida);

// Iniciar la partida al cargar la página
iniciarPartida();
*/