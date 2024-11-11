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
     deleteBall(ball)
      .then(() => {
        ball.remove();
      });
    });
  }, 500);
}

function deleteBall(ball) {
  return new Promise((resolve) => {
    // Configura a animação de opacidade
    ball.setAttribute("animation", {
      property: "material.opacity",
      to: 0,
      dur: 300,
    });

    setTimeout(()=>{
      resolve();
    }, 500);
  });
}