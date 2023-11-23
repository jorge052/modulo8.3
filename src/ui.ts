import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
} from "./motor";

import { tablero, infoCartas } from "./model";

const tableroElement = document.getElementById("tablero")!;

// Agregar eventos a las cartas en el tablero
tableroElement.addEventListener("click", (event) => {
  const cartaElement = event.target as HTMLElement;
  if (cartaElement.classList.contains("carta")) {
    const indiceArray = parseInt(cartaElement.dataset.indiceArray!);
    manejarClickCarta(indiceArray);
  }
});


// Función para renderizar el tablero en la interfaz
export const crearTablero = () => {
  tableroElement.innerHTML = ""; // Limpiar el contenido del tablero

  // Recorrer las cartas del tablero y crear elementos HTML para cada una
  tablero.cartas.forEach((carta, cartaIndex) => {
    const cartaElement = document.createElement("div");
    cartaElement.classList.add("carta");
    cartaElement.dataset.indiceArray = cartaIndex.toString();

    const imgElement = document.createElement("img");
    imgElement.alt = "Carta";
    imgElement.dataset.indiceImagen = carta.idFoto.toString();
    imgElement.dataset.volteada = carta.estaVuelta.toString();
    imgElement.dataset.encontrada = carta.encontrada.toString();

    // Verificar si la carta está boca arriba para establecer la imagen correcta
    if (carta.estaVuelta && !carta.encontrada) {
      imgElement.src = infoCartas.find((info) => info.idFoto === carta.idFoto)?.imagen || "bocaAbajo";
    } else {
      imgElement.src = "bocaAbajo";
    }

    cartaElement.appendChild(imgElement);

    tableroElement.appendChild(cartaElement);
  });
};

// Función para manejar el clic en una carta
const manejarClickCarta = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    crearTablero(); // Actualizar la interfaz después de voltear la carta

    if (tablero.estadoPartida === "DosCartasLevantadas") {
      const indiceA = tablero.indiceCartaVolteadaA!;
      const indiceB = tablero.indiceCartaVolteadaB!;

      if (sonPareja(indiceA, indiceB, tablero)) {
        parejaEncontrada(tablero, indiceA, indiceB);
      } else {
        setTimeout(() => {
          parejaNoEncontrada(tablero, indiceA, indiceB);
          crearTablero(); // Actualizar la interfaz después de volver las cartas boca abajo
        }, 1000);
      }
    }

    if (esPartidaCompleta(tablero)) {
      alert("¡Has ganado!");
    }
  }
};
