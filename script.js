const cena = document.querySelector("#cena");
const title = cena.querySelector("#title");
const powerButton = cena.querySelector("#powerButton");
const chao = cena.querySelector("#chao");
const lua = cena.querySelector("#lua");
const imageLight = cena.querySelector("#imageLight");
const tempo = cena.querySelector("#tempo");
const resetButton = cena.querySelector("#resetButton");
let segundos = 60;
let jogo = undefined;
let pontos = 0;

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

window.addEventListener("load", ()=>{
  powerButton.addEventListener("mouseenter", ()=>{
    newGame();
    powerButton.remove();
    title.remove();
  });
  
  resetButton.addEventListener("mouseenter", ()=>{
    resetGame();
  });
});

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

function resetGame(){
  tempo.setAttribute("visible", "true");
  resetButton.setAttribute("visible", "false");
  resetButton.classList.remove("raycastable");
  cena.querySelector("#score").remove();
  
  // A imagem de luz volta a ser a inicial
  imageLight.setAttribute("material", "src: https://cdn.glitch.global/3f73e26f-922b-430b-8619-d23100e9b406/luz_sol.png?v=1730231449709; transparent: true; opacity: 0.5;");
  
  // A luz da lua volta ser amarela
  lua.setAttribute("light", "type: point; intensity: 5; distance: 15; decay: 3; color: #f0bb4d");
  
  // Muda a cor do chão
  chao.setAttribute("animation", {
    property: "color",
    to: "#a7a7c7",
    dur: 500
  });
  
  // Muda a cor da Lua
  lua.setAttribute("animation", {
    property: "color",
    to: "#ffda8c",
    dur: 500
  });
  
  cena.querySelectorAll("a-sphere.remover").forEach(ball=>{
    deleteBall(ball)
      .then(()=>{
        ball.remove();
    });
  });
  
  pontos = 0;
  segundos = 60;
  newGame();
}

function newGame() {
  iniciaTempo();

  jogo = setInterval(() => {
    const ball = document.createElement("a-sphere");
    ball.setAttribute("class", "raycastable");
    ball.setAttribute("radius", `${getRadius()}`);
    ball.setAttribute("color", `${getColor()}`);
    ball.setAttribute("position", `${getPositionX()} ${getPositionY()} ${getPositionZ()}`);
    cena.appendChild(ball);

    ball.addEventListener("mouseenter", () => {
      pontos++;
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
  
  // As bolas param de aparecer
  clearInterval(jogo);
  
  // Muda a cor da imagem de fundo da lua
  imageLight.setAttribute("material", "src: https://cdn.glitch.global/3f73e26f-922b-430b-8619-d23100e9b406/lua-loose.png?v=1730231871143; transparent: true; opacity: 0.5;");
  
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
  
  setTimeout(()=>{
    showScore();
  }, 600);
  
}

function showScore(){
  const score = document.createElement("a-text");
  score.setAttribute("id", "score");
  score.setAttribute("value", `${pontos} Pontos`);
  score.setAttribute("position", "0 0 -5");
  score.setAttribute("scale", "4 4 1");
  score.setAttribute("shader", "msdf");
  score.setAttribute("font", "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/anton/Anton-Regular.json");
  score.setAttribute("align", "center");
  cena.appendChild(score);
}