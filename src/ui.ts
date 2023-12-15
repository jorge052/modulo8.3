import { tablero } from "./model";

import {
  esPartidaCompleta,
  voltearCarta,
  reiniciarPartida,
} from "./motor";


// Función para renderizar el tablero en el HTML

export const renderizarTablero = () => {
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
};

export const finalizarPartida = () => {
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
    alert("¡Has ganado!");
  } else {
    reiniciarPartida();
  }
};
/*
// Event listener para el botón de iniciar partida
iniciarBtn.addEventListener("click", iniciarPartida);

// Iniciar la partida al cargar la página
iniciarPartida();*/
