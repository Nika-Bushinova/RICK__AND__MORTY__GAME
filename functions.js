document.getElementById('game_button').addEventListener('click', gameStart);//скрываем страницу-приветствие
document.getElementById('game_button').addEventListener('click', nameSf);

function gameStart() {//скрываем блоки фона, окончания игры, показываем блок игры
   gameDiv.style.display = "block";
   mainDiv.style.display = "none"
   gameOver.style.display = "none"
   canvas.style.display = "block";
   portal.style.animation = "none";
}
function nameSf() {//функция передачи имени
   nameS = document.getElementById('nameID').value;
   if (nameS == "") nameS = "User"
}
function allpause() {//функция паузы
   playPause = false;
   stop = true;
   cursorGame.style.cursor = "auto";
   mainMusic.pause()
}
function playGameafter() {//функция продолжения игры после попытки ухода со страницы
   stop = false;
   playPause = true;
   cursorGame.style.cursor = "none";
   game()
   mainMusic.play()
}
gameOverButton.addEventListener('click', gameOverButtonf)//функция перезагрузки игры после окончания
function gameOverButtonf() {
   gameDiv.style.display = "none";
   mainDiv.style.display = "block"
   document.location.reload()
}

function reload(){
   if (!startGame.x) {
      question = confirm('Покинуть игру? Данные будут потеряны!')

   
     if (question) { document.location.reload()
   
    } else {
    mainDiv.style.display = 'none';
   gameDiv.style.display = 'block';

     }
     
   }
}