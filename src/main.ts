// main.ts
import { renderizarTablero } from "./ui";

import { iniciarPartida } from "./motor";

/*const tableroElement = document.getElementById("tablero") as HTMLDivElement;*/
const iniciarBtn = document.getElementById("iniciarBtn") as HTMLButtonElement;

// Event listener para el botón de iniciar partida
iniciarBtn.addEventListener("click", () => {
  iniciarPartida();
  renderizarTablero();
});
