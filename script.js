const cena = document.querySelector("#cena");
let jogo = undefined;

function newGame() {
  jogo = setInterval(() => {
    const ball = document.createElement("a-sphere");
    ball.setAttribute("class", "raycastable");
    ball.setAttribute("radius", "0.3");
    ball.setAttribute("color", "#333");
    ball.setAttribute("position", "0 0 -3");
    cena.appendChild(ball);

    ball.addEventListener("mouseenter", () => {
      ball.remove();
    });
  }, 500);
}