const cena = document.querySelector("#cena");
let jogo = undefined;

// X = -3 até 3
function getPositionX() {
  return (Math.random() * 6) - 3;
}

// Y = -0.5 até 2.5
function getPositionY() {
  return Math.random() * 3 - 0.5;
}

// Z = -1.2 até -3
function getPositionZ() {
  return Math.random() * (-1.2 + 3) - 3;
}

function newGame() {
  jogo = setInterval(() => {
    const ball = document.createElement("a-sphere");
    ball.setAttribute("class", "raycastable");
    ball.setAttribute("radius", "0.3");
    ball.setAttribute("color", "#333");
    ball.setAttribute("position", `${getPosition()} ${getPositionY()} ${getPositionZ()}`);
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