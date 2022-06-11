let e1;
let e2;
let e3;
let e4;
let e5;
let e6;
let e7;
let width1 = window.innerWidth;
let height1 = window.innerHeight * 0.8;


let sketch2 = function (p1) {//правая canvas
   p1.setup = function () {
      var canvas2 = p1.createCanvas(width1 * 0.3, height1)
      canvas2.parent("canvas2");
      canvas2.id('mycanvas2');
      if (width1 >= "1200") {
         p1.e1 = new Eye(window.innerWidth * 0.17, window.innerHeight * 0.1, 120);
         p1.e2 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.3, 80);
         p1.e3 = new Eye(window.innerWidth * 0.15, window.innerHeight * 0.6, 220);
      } else if (width1 < "1200" && width1 >= "900") {
         p1.e1 = new Eye(window.innerWidth * 0.17, window.innerHeight * 0.1, 30);
         p1.e2 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.3, 140);
         p1.e3 = new Eye(window.innerWidth * 0.15, window.innerHeight * 0.6, 160);
      } else if (width1 < "900" && width1 >= "496") {
         p1.e1 = new Eye(window.innerWidth * 0.17, window.innerHeight * 0.15, 70);
         p1.e2 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.3, 40);
         p1.e3 = new Eye(window.innerWidth * 0.15, window.innerHeight * 0.5, 110);
      } else if (width1 < "496" && width1 >= "300") {
         if (width1 > height1) {
            p1.e1 = new Eye(window.innerWidth * 0.17, window.innerHeight * 0.1, 30);
            p1.e2 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.2, 50);
            p1.e3 = new Eye(window.innerWidth * 0.15, window.innerHeight * 0.33, 70);
         } else if (height1 > width1) {
            p1.e1 = new Eye(window.innerWidth * 0.17, window.innerHeight * 0.5, 30);
            p1.e2 = new Eye(window.innerWidth * 0.1, window.innerHeight * 0.7, 50);
            p1.e3 = new Eye(window.innerWidth * 0.15, window.innerHeight * 0.35, 70);
         }
      }
   }

   p1.draw = function () {
      p1.e1.update(p1.mouseX, p1.mouseY);
      p1.e2.update(p1.mouseX, p1.mouseY);
      p1.e3.update(p1.mouseX, p1.mouseY);

      p1.e1.display();
      p1.e2.display();
      p1.e3.display();

   }
   function Eye(tx, ty, ts) {
      this.x = tx;
      this.y = ty;
      this.size = ts;
      this.angle = 0;

      this.update = function (mx, my) {
         this.angle = p1.atan2(my - this.y, mx - this.x);
      };

      this.display = function () {
         p1.push();
         p1.translate(this.x, this.y);
         p1.fill(255, 248, 220);
         p1.ellipse(0, 0, this.size, this.size);

         p1.rotate(this.angle);
         p1.fill(153, 204, 0);
         p1.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);


         p1.fill(101, 67, 33);
         p1.ellipse(this.size / 4, 0, this.size / 3, this.size / 3);

         p1.pop();

      };
   }
}

//левая canvas
let sketch = function (p) {

   p.setup = function () {
      var canvas1 = p.createCanvas(window.innerWidth * 0.3, window.innerHeight)
      canvas1.parent("canvas1");
      canvas1.id('mycanvas1');
      if (width1 >= "1200") {
         p.e4 = new Eye(window.innerWidth * 0.1, window.innerHeight * 0.3, 220)
         p.e5 = new Eye(window.innerWidth * 0.13, window.innerHeight * 0.67, 120)
         p.e6 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.5, 120)
         p.e7 = new Eye(window.innerWidth * 0.09, window.innerHeight * 0.1, 80);
      } else if (width1 < "1200" && width1 >= "900") {
         p.e4 = new Eye(window.innerWidth * 0.1, window.innerHeight * 0.4, 120)
         p.e5 = new Eye(window.innerWidth * 0.13, window.innerHeight * 0.65, 90)
         p.e6 = new Eye(window.innerWidth * 0.25, window.innerHeight * 0.5, 70)
         p.e7 = new Eye(window.innerWidth * 0.09, window.innerHeight * 0.1, 100);
      } else if (width1 < "900" && width1 >= "496") {
         p.e4 = new Eye(window.innerWidth * 0.13, window.innerHeight * 0.27, 110)
         p.e5 = new Eye(window.innerWidth * 0.13, window.innerHeight * 0.7, 40)
         p.e6 = new Eye(window.innerWidth * 0.23, window.innerHeight * 0.57, 60)
         p.e7 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.42, 30);
      } else if (width1 < "496" && width1 >= "300") {

         if (width1 > height1) {
            p.e4 = new Eye(window.innerWidth * 0.16, window.innerHeight * 0.18, 70)
            p.e5 = new Eye(window.innerWidth * 0.13, window.innerHeight * 0.33, 50)
            p.e6 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.26, 45)
            p.e7 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.1, 30);
         } else {
            p.e4 = new Eye(window.innerWidth * 0.12, window.innerHeight * 0.7, 70)
            p.e5 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.85, 50)
            p.e6 = new Eye(window.innerWidth * 0.1, window.innerHeight * 0.36, 45)
            p.e7 = new Eye(window.innerWidth * 0.2, window.innerHeight * 0.1, 30);
         }
      }
   }

   p.draw = function () {

      p.e4.update(p.mouseX, p.mouseY);
      p.e5.update(p.mouseX, p.mouseY);
      p.e6.update(p.mouseX, p.mouseY);
      p.e7.update(p.mouseX, p.mouseY);
      p.e4.display();
      p.e5.display();
      p.e6.display();
      p.e7.display();
   }

   function Eye(tx, ty, ts) {
      this.x = tx;
      this.y = ty;
      this.size = ts;
      this.angle = 0;

      this.update = function (mx, my) {
         this.angle = p.atan2(my - this.y, mx - this.x);
      };

      this.display = function () {
         p.push();
         p.translate(this.x, this.y);
         p.fill(255, 248, 220);
         p.ellipse(0, 0, this.size, this.size);

         p.rotate(this.angle);
         p.fill(153, 204, 0);
         p.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);


         p.fill(101, 67, 33);
         p.ellipse(this.size / 4, 0, this.size / 3, this.size / 3);

         p.pop();

      };
   }
}
let myp52 = new p5(sketch2)
let myp51 = new p5(sketch);





