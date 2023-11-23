import { iniciaPartida } from "./motor";
import { crearTablero } from "./ui";
import { tablero } from "./model";

document.addEventListener("DOMContentLoaded", () => {
  const iniciarBtn = document.getElementById("iniciarBtn")!;

  // Agregar evento al botón de iniciar partida
  iniciarBtn.addEventListener("click", () => {
    iniciaPartida(tablero); // Iniciar la partida
    crearTablero(); // Renderizar el tablero en la interfaz
  });

  // ... otras configuraciones o eventos que desees agregar ...

  // Lógica adicional para la inicialización de la aplicación si es necesario
});
