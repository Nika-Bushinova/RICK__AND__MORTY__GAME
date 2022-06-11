
var canvas = document.createElement('canvas')
canvas.id = "canvas__game"
var width = window.innerWidth;
var height = window.innerHeight;
var widthForRender = width;
canvas.width = width;
canvas.height = height;

var dd = document.getElementById('wrapper__game')
dd.appendChild(canvas)//добавляем canvas в DOM
var requestAnimFrame = all();//для работы requestAnimationFrame во всех браузерах
var context = canvas.getContext('2d');

$(context.canvas).css("width", "100%");
$(context.canvas).css("height", "100%");
var gameOver = document.getElementById('gameover-screen');
gameOver.style.display = "none";
var portal = document.querySelector('.main__portal')//портал
var gameScore = document.getElementById('gameScore')
var gameOverButton = document.getElementById('game__over')
var mainDiv = document.getElementById('wrapper')
var gameDiv = document.getElementById('wrapper__game')
var wrapperMain = document.getElementById('wrapper')
var cursorGame = document.getElementById('canvas__game');
var stop = true;//переменная для запуска/паузы игры
var score = "";//переменная для подсчета количества убитых инопланетян
var pauseX;//координата х для кнопки паузы
var saveKeyScore = "highScore";
var highScore = localStorage.getItem(saveKeyScore);
var nameS = ""//переменная для хранения имени игрока
var alian = [];//инопланетяне, x,y,скорость изменения по оси x, скорость изменения по оси y 
var alian2 = [];//инопланетяне Солнце
var explosion = [];//первоначальная единичная картинка выстрела
var expl = [];//спрайт взрывов
var timer = 0;
var question // переменная для вопроса при попытке ухода со страницы
var ship = {
   x: width * 0.42,
   y: height * 0.3
};
var camera = {
   x: 0
};
var pause = {//кнопка паузы
   x: -width,
   y: -height
}
var play = {//кнопка плэй
   x: -width,
   y: -height
}
var life = [//жизни
   { x: width * 0.87, y: height * 0.4, delete: 0 },
   { x: width * 0.87, y: height * 0.5, delete: 0 },
   { x: width * 0.87, y: height * 0.6, delete: 0 },
]
var help = {//аптечка
   x: width * 0.87, y: height * 0.8
}
var volume = { x: width * 0.87, y: height * 0.9 }//значок громкости
var stopMusic = false;//запуск музыки
var stopMusicHelp = false;//звук аптечки
var line = { x: -100, y: -100, del: 0 }//красная линия на кнопке звука
var playPause = true;//переключатель для кнопки воспроизведения
var startGame;

var mainMusic = new Audio("music/space.mp3");// добавить музыку
mainMusic.volume = 0.1;
mainMusic.pause()

var wab = new Audio("music/wab.mp3");//звук аптечки
wab.volume = 0.2;


var uhh = new Audio('music/uhh.mp3');//звук столкновения корабля и инопланетянина
uhh.volume = 0.2;

var helpImg = new Image();
helpImg.src = "img/help.png";

var pauseImg = new Image();
pauseImg.src = "img/button.png";

var playImg = new Image();
playImg.src = "img/button2.png"

var alianImg = new Image();
alianImg.src = "img/alian.png";

var alianImg2 = new Image();
alianImg2.src = "img/theSun.png";

var flyingSaucer = new Image();
flyingSaucer.src = "img/ufo.png";

var fire = new Image();
fire.src = "img/fire.png"

var explimg = new Image();
explimg.src = "img/explosion.png";

var lifeImg = new Image();
lifeImg.src = "img/rick.png"

var volumeImg = new Image();
volumeImg.src = 'img/volume.png'

var lineImg = new Image();
lineImg.src = "img/line.png"

var reloadImg = new Image();
reloadImg.src = "img/reload.png"

var startGameImg = new Image();
startGameImg.src = "img/start.png"

//ФОН
function Star() {//объект-прототип планет/звезд
   this.x = Math.random() * width;
   this.y = Math.random() * height;
   this.z = Math.random() * width;
}
Star.prototype.move = function () { //метод move
   this.z = this.z - 2;
   if (this.z <= 0) {
      this.z = width
   }
}
Star.prototype.show = function () {// метод show
   let x, y, s;
   x = (this.x - width / 2) * (width / this.z);
   x = x + width / 2;
   y = (this.y - height / 2) * (width / 1.5 / this.z);
   y = y + height / 2;
   s = size * (width / this.z)
   context.beginPath();
   context.arc(x, y, s, 0, Math.PI * 2);
   context.fill();
}
function Planet() {//объект планеты 1 (наследование)
   Star.call(this);
   this.move;
   this.show;
   this.colour = function () {
      context.fillStyle = "#bd78fa";
      size = 2
   }
}
Planet.prototype =
   Object.create(Star.prototype);
Planet.prototype.constructor = Planet;

var numPlanets = 150;
var planet = [];
for (let i = 0; i <= numPlanets; i++) {
   planet[i] = new Planet();
}
function Planet2() {//объект планеты 2 (наследование)
   Star.call(this);
   this.move;
   this.show;
   this.colour2 = function () {
      context.fillStyle = "#78fafa";
      size = 1
   }
}
Planet2.prototype =
   Object.create(Star.prototype);
Planet2.prototype.constructor = Planet2;

var numPlanet2 = 150;
var planet2 = [];
var size
for (let i = 0; i < numPlanet2; i++) {
   planet2[i] = new Planet2()
}

explimg.onload = function () {
   init()
   game()
}
function all() {//конец игрового цикла
   return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
         window.setTimeout(callback, 1000 / 20)
      };
}
function init() {
   if (width < height) {
      widthForRender = width * 2
   }
   canvas.addEventListener('mousemove', center);//события мыши для корабля
   function center(EO) {
      EO = EO || window.event;
      ship.x = EO.offsetX - widthForRender * 0.15 / 2;
      ship.y = EO.offsetY - height * 0.15 / 2
   };
   timer = 0;
   canvas.addEventListener('touchstart', function (EO) {//события для тач-скрина
      for (let t=0; t<touches.length; t++){
      var touch = EO.touches[t];}
      var mouseEvent = new MouseEvent("mousedown", {
         clientX: touch.clientX,
         clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
   }, { passive: true });

   canvas.addEventListener("touchmove", function (EO) {
      var touch = EO.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
         clientX: touch.clientX,
         clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
   }, { passive: true });

}

function game() {//основной игровой цикл
   if (!stop) {
      update();
      render();
      req1 = window.requestAnimationFrame(game);
   }
}
function startGameLocation() {//местоположение кнопки startGame
   if (width > height) {
      startGame = {
         x: width * 0.4,
         y: height * 0.4
      }
   } else {
      startGame = {
         x: width * 0.3,
         y: height * 0.4
      }
   }
}
startGameLocation()
window.onload = playGame
function playGame() {
   render()
   function makePauseKey(EO) { //пауза КЛАВИАТУРА space
      EO = EO || window.event;
      if (EO.code === 'Space') {
         if (!stop) {
            allpause()
         } else {
            playGameafter()
         }
      }
   }
   canvas.onclick = buttons;//функция  для кнопок паузы/воспроизведения МЫШЬ
   function buttons(EO) {
      EO = EO || window.event;
      let x = EO.clientX;
      let y = EO.clientY;
      if (startGame.x && startGame.y) {//start         
         if (x >= width * 0.43 && x <= width * 0.43 + width * 0.2 && y >= height * 0.4 && y <= height * 0.4 + height * 0.3) {
            document.addEventListener('keydown', makePauseKey)
            stop = false;
            playPause = true;
            cursorGame.style.cursor = "none";//
            req1 = window.requestAnimationFrame(game);

            mainMusic.play()
            pause.x = pauseX
            if (width > height) {
               pauseX = width * 0.80
            } else if (width < height) { pauseX = width * 0.725 }
            pause.y = height * 0.05;
            play.x = width * 0.86;
            play.y = height * 0.05;
            delete startGame.x
            delete startGame.y
         }
      }
      if (x >= pauseX && x <= pauseX + widthForRender * 0.06 && y >= height * 0.05 && y <= height * 0.05 + height * 0.08) {//координаты кнопки паузы
         allpause()
      }
      if (playPause === false) {//координаты кнопки воспроизведения
         if (x >= width * 0.86 && x <= widthForRender * 0.86 + widthForRender * 0.05 && y >= height * 0.05 && y <= height * 0.05 + height * 0.08) {
            playGameafter()
         }
      }
      if (!stopMusic && !stop) {//кнопка громкости

         if (x >= width * 0.87 && x <= widthForRender * 0.87 + widthForRender * 0.045 && y >= height * 0.9 && y <= height * 0.9 + height * 0.08) {
            stopMusic = true;
            line.del = 1;
            mainMusic.pause()
            wab.pause();
            uhh.pause();
         }
      } else if (stopMusic === true) {//кнопка громкости

         if (x >= width * 0.87 && x <= width * 0.87 + widthForRender * 0.045 && y >= height * 0.9 && y <= height * 0.9 + height * 0.08) {
            stopMusic = false;
            line.del = 0
            mainMusic.play();
            if (line.del === 0) {
               line.x = -100;
               line.y = -100;
            }
         }
      }
      if (stopMusic === true && stop === true) {
         mainMusic.pause()
      }
      if (line.del === 1) {//красная линия на значке громкости
         line.x = width * 0.87;
         line.y = height * 0.9;
      }

      if (help.x && help.y) {//аптечка
         if (x >= width * 0.87 && x <= width * 0.87 + widthForRender * 0.045 && y >= height * 0.8 && y <= height * 0.8 + height * 0.08 && stop === false) {
            if (navigator.vibrate) {
               window.navigator.vibrate(100);
            }
            if (stopMusic === false) {
               stopMusicHelp = false;
               wab.play();
            }
            if (stopMusic === true) {
               stopMusicHelp = true;
               wab.pause();
               uhh.pause()
            }
            if (stop === true) {
               wab.pause()
            }
            if (!stop) {
               life.push({ x: width * 0.06, y: height * 0.4, delete: 0 },//добавить доп.жизни
                  { x: width * 0.06, y: height * 0.5, delete: 0 },
                  { x: width * 0.06, y: height * 0.6, delete: 0 })
               delete help.x;
               delete help.y
            }
         }
      }
   }
   window.onhashchange = goToMainFromURLHash;//для изменения URL

   function goToMainFromURLHash() {
      var URLHash = window.location.hash;
      var stateJSON = decodeURIComponent(URLHash.substr(1));
      var newName;

      if (stateJSON != "") { newArray = JSON.parse(stateJSON); }
      else
         newArray = { page: "Main" };

      switch (newArray.page) {
         case 'Main'://если переключаемся на 
            mainDiv.style.display = 'block';
            gameDiv.style.display = 'none';
            sc.style.transform = 'translateY(-200%)';
            visibleScore = false;
            countPush = 0;
            portal.style.animation = "A 10s linear 0s infinite";
            reload()
            break;
         case 'Game':
            mainDiv.style.display = 'none';
            gameDiv.style.display = 'block';
            window.onbeforeunload=function(){
                mainDiv.style.display = 'none';
               gameDiv.style.display = 'block';
            
                 }
            
            break;
         case 'Records':
            mainDiv.style.display = 'block';
            gameDiv.style.display = 'none';
            sc.style.transform = 'translateY(0%)';
            visibleScore = true;
            countPush = 1;
            portal.style.animation = "A 10s linear 0s infinite";
            reload()
break
      }
   }


   goToMainFromURLHash()

   function switchToState(newState) {
      location.hash = encodeURIComponent(JSON.stringify(newState));
   }

   document.getElementById('game_button').addEventListener('click', straight)
   function straight(EO) {
      switchToState({ page: 'Game' });
      EO.preventDefault();
   }
   document.getElementById('button-score').addEventListener('click', straight2)
   function straight2(EO) {
      if (visibleScore == true) {
         switchToState({ page: 'Records' });
         EO.preventDefault();
      } else {
         switchToState({ page: 'Main' });
         EO.preventDefault();
         visibleScore = false;
         countPush = 0
      }
   }
}

function update() {
   timer++;

   if (timer % 100 == 0) {//кол-во инопланетян1
      alian.push({
         x: Math.random() * width * 0.9,
         y: -100,
         sx: Math.random() * 2 - 1,
         sy: 1,//скорость и направление движения инопланетян1
         del: 0,
      });
   }
   if (timer % 200 == 0) {//кол-во инопланетян2
      alian2.push({
         angle: 0,
         sxangle: Math.random() * 0.2 - 0.1,
         x: Math.random() * width * 0.9,
         y: -100,
         sx: Math.random() * 2 - 1,
         sy: 2,//скорость и направление движения инопланетян2
         del: 0
      });
   }
   if (timer % 30 == 0) {//стрельба
      explosion.push({ x: ship.x + widthForRender * 0.04, y: ship.y - height * 0.04, sx: -1, sy: -5 });
      explosion.push({ x: ship.x + widthForRender * 0.045, y: ship.y - height * 0.04, sx: 0, sy: -5 });
      explosion.push({ x: ship.x + widthForRender * 0.05, y: ship.y - height * 0.04, sx: 1, sy: -5 })
   }
   for (var i = 0; i < explosion.length; i++) {
      //движение взрыва
      explosion[i].x = explosion[i].x + explosion[i].sx;
      explosion[i].y = explosion[i].y + explosion[i].sy;

      //граница движения взрыва
      if (explosion[i].y < -30) {
         explosion.splice(i, 1);
      }
   }

   function act(obj) { //функция движение инопланетян
      for (var i = 0; i < obj.length; i++) {

         obj[i].x = obj[i].x + obj[i].sx;
         obj[i].y = obj[i].y + obj[i].sy;
         obj[i].angle = obj[i].angle + obj[i].sxangle;

         if (obj[i].x >= width * 0.97 || obj[i].x <= 0) {//граница движения инопланетян
            obj[i].sx = -obj[i].sx;
         }
         if (obj[i].y >= height) {
            obj.splice(i, 1);
         }

         for (var j = 0; j < explosion.length; j++) {//столкновение взрыва с инопланетянином
            if (obj[i] !== undefined) {
               if (Math.abs(obj[i].x + widthForRender * 0.025 - explosion[j].x - widthForRender * 0.03) < widthForRender * 0.045 && Math.abs(obj[i].y - explosion[j].y) < 25) {
                  expl.push({ x: obj[i].x, y: obj[i].y, animx: 0, animy: 0 })//столкнулся корабль и инопланетянин
                  obj[i].del = 1;
                  explosion.splice(j, 1);
                  break;
               }
            }
         }
         if (obj[i] !== undefined) {
            if (obj[i].del === 1) {
               obj.splice(i, 1);
               score++
            }
         }
         if (score > highScore) {
            highScore = score;
            localStorage.setItem(saveKeyScore, highScore)
         }

         for (var k = 0; k < life.length; k++) {//удаление жизни, при столкновении инопланетянина с кораблем
            if (obj[i] !== undefined) {
               if (Math.abs(obj[i].x >= ship.x && obj[i].x <= ship.x + widthForRender * 0.15 && obj[i].y >= ship.y && obj[i].y <= ship.y + height * 0.15)) {
                  life[0].delete = 1;
                  obj[i].del = 1;
                  if (!stopMusic) {
                     if (navigator.vibrate) {
                        window.navigator.vibrate(100);
                     }
                     uhh.play()
                  } else if (stopMusic === true) {
                     uhh.pause()
                  }
                  if (life[k].delete === 1) {
                     life.splice(k, 1);
                  }
                  if (life.length == 0) {
                     function gameOverr() {
                        let gameOver = document.getElementById('gameover-screen');
                        var gameResult = document.createTextNode(score)
                        var userResult = document.createTextNode(nameS)
                        var textResult = document.createTextNode(", your score is ")
                        gameOver.style.display = "block";
                        gameScore.appendChild(userResult)
                        gameScore.appendChild(textResult)
                        gameScore.appendChild(gameResult)
                        mainMusic.pause()
                        blockDataBase()

                     }
                     gameOverr()
                     cursorGame.style.cursor = "auto";
                     // window.cancelAnimationFrame(req1);
                     canvas.style.display = "none"

                  }
               }
            }
         }
      }
   }
   act(alian)
   act(alian2)
   for (k in expl) {
      expl[k].animx = expl[k].animx + 0.4;
      if (expl[k].animx > 4) { expl[k].animy++; expl[k].animx = 0 }
      if (expl[k].animy > 4) {
         expl.splice(k, 1)
      }
   }
   ship.animx = ship.animx + 1;
   if (ship.animx > 4) { ship.animy++; ship.animx = 0 }
   if (ship.animy > 3) { ship.animx = 0; ship.animy = 0 }
}
