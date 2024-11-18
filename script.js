const cena = document.querySelector("#cena");
let jogo = undefined;
const tempo = cena.querySelector("#tempo");
let segundos = 60;
const chao = cena.querySelector("#chao");
const resetButton = cena.querySelector("#resetButton");
const imageLight = cena.querySelector("#imageLight");
const lua = cena.querySelector("#lua");

const cores = [
  "#77A6F7",
  "#FF9F68",
  "#F8D49D",
  "#5BC3EB",
  "#B0DFE5",
  "#5A879D",
  "#7E6EAC",
  "#F1D4D4",
  "#9BC53D",
  "#98B1A1",
  "#DEB0B2",
  "#E6B655",
  "#D3A4FF",
  "#7DD6BF",
  "#C4D7ED",
  "#F2A65A",
  "#BC8F8F", 
  "#8EAF3C",
  "#EEC8E0",
  "#8FAADC" 
];

// Retorna uma cor
function getColor(){
  return cores[Math.floor(Math.random() * cores.length)];
}

// Retorna um radius
function getRadius() {
  return Math.random() * (0.3 - 0.1) + 0.1;
}

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

function iniciaTempo(){
  let intervalTempo = setInterval(()=>{
    tempo.setAttribute("visible", "true");
    tempo.setAttribute("value", `${segundos}`);
    segundos--;

    if(segundos < 0){
      clearInterval(intervalTempo);
      endGame();
    }
  }, 1000); 
}

function newGame() {
  tempo.setAttribute("visible", "true");
  iniciaTempo();
  
  jogo = setInterval(() => {
    const ball = document.createElement("a-sphere");
    ball.setAttribute("class", "raycastable");
    ball.setAttribute("radius", `${getRadius()}`);
    ball.setAttribute("color", `${getColor()}`);
    ball.setAttribute("position", `${getPositionX()} ${getPositionY()} ${getPositionZ()}`);
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

function endGame(){
  // Tempo sumir e botão de reset aparecer só após o fim das animações 
  setTimeout(()=>{
    tempo.setAttribute("visible", "false");
    resetButton.setAttribute("visible", "true");
    resetButton.classList.add("raycastable");
  }, 600);
  
  // As bolas param de aparecer
  clearInterval(jogo);
  
  // Muda a cor do chão
  chao.setAttribute("animation", {
    property: "color",
    to: "#db5166",
    dur: 500
  });
  
  // Muda a cor da Lua
  lua.setAttribute("animation", {
    property: "color",
    to: "#db5166",
    dur: 500
  });
  
  // Muda a cor da imagem de fundo da lua
  imageLight.setAttribute("material", "src: img/luz_end.png; transparent: true; opacity: 0.5;");

  // Muda a cor da luz da lua que a lua emana
  lua.setAttribute("light", "type: point; intensity: 10; distance: 20; decay: 3; color: #DB5166");

  
  // Muda a cor e a opacidade das bolas
  cena.querySelectorAll("a-sphere.raycastable").forEach(ball=>{
    ball.classList.remove("raycastable");
    ball.classList.add("remover");
    
    ball.setAttribute("animation__color", {
      property: "color",
      to: "#db5166",
      dur: 300
    });
    
    setTimeout(()=>{
       ball.setAttribute("animation__opacity", {
          property: "material.opacity",
          to: 0.4,
          dur: 300
        });
    }, 500);
  });
}