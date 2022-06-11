function render() {// отрисовка
   if (highScore == null) {
      highScore = 0;
   } else {
      highScore = parseInt(highScore)
   }
   context.font = "55px Mulish";
   if (width < "1200") {
      context.font = "22px Mulish";
   }
   context.fillStyle = "black";
   context.fillRect(0, 0, width, height)
   context.textAlign = "start";
   for (let i = 0; i <= numPlanets; i++) {//отрисовка планет1
      planet[i].show();
      planet[i].move();
      planet[i].colour();
   }
   for (var i = 0; i < numPlanet2; i++) {//отрисовка планет2
      planet2[i].show()
      planet2[i].move()
      planet2[i].colour2();
   }
   context.drawImage(flyingSaucer, ship.x, ship.y, widthForRender * 0.15, height * 0.15);
   for (i in explosion) { context.drawImage(fire, explosion[i].x, explosion[i].y, widthForRender * 0.05, height * 0.05) }

   for (i in alian) {
      context.drawImage(alianImg, alian[i].x, alian[i].y, widthForRender * 0.03, height * 0.08) // img, x, y, width, height
   }
   for (i in alian2) {
      context.save();
      context.translate(alian2[i].x + width * 0.06 / 2, alian2[i].y + height * 0.095 / 2);
      context.rotate(alian2[i].angle);
      if (width > height) {
         context.drawImage(alianImg2, -width * 0.06 / 2, -height * 0.095 / 2, widthForRender * 0.05, height * 0.095) // img, x, y, width, height
      } else {
         context.drawImage(alianImg2, -width * 0.06 / 2, -height * 0.095 / 2, widthForRender * 0.09, height * 0.095)
      }
      context.restore();
   }
   for (i in expl) {
      context.drawImage(explimg, 128 * Math.floor(expl[i].animx), 128 * Math.floor(expl[i].animy), 130, 120, expl[i].x, expl[i].y, widthForRender * 0.05, height * 0.07)
   }
   context.fillStyle = "white ";
   if (width > height) {
      context.fillText("Name: " + nameS, width * 0.8, height * 0.2)
      context.fillText("Score: " + score, width * 0.8, height * 0.3);
      context.fillText("Your high score: " + highScore, width * 0.4, height * 0.1)
   }
   context.drawImage(pauseImg, pauseX, pause.y, widthForRender * 0.06, height * 0.08)
   context.drawImage(playImg, play.x, play.y, widthForRender * 0.05, height * 0.08)
   for (i in life) {
      context.drawImage(lifeImg, life[i].x, life[i].y, widthForRender * 0.045, height * 0.08)
   }
   context.drawImage(helpImg, help.x, help.y, widthForRender * 0.045, height * 0.08)
   context.drawImage(volumeImg, volume.x, volume.y, widthForRender * 0.045, height * 0.08)
   context.drawImage(lineImg, line.x, line.y, widthForRender * 0.06, height * 0.08)
   context.drawImage(startGameImg, startGame.x, startGame.y, widthForRender * 0.2, height * 0.3)
   if (width < height) {
      context.fillText("Name: " + nameS, width * 0.1, height * 0.8)
      context.fillText("Score: " + score, width * 0.1, height * 0.9);
      context.fillText("Your high score: " + highScore, width * 0.1, height * 0.1)
   }
}
