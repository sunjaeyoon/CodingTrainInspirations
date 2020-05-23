export default function sketch(p){
    let canvas;
    let width = 400; 
    let height = 400;
    let resolution = 10;
    let frame_rate = 5;
    let player;
    let food;
    
    function Snake() {
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.total = 0;
      this.tail = [];
      this.over = 0;
      
      this.move = () => {
            for (let i = 0; i < this.tail.length - 1; i++) {
                  this.tail[i] = this.tail[i + 1];
            }
            if (this.total >= 1) {
                  this.tail[this.total - 1] = p.createVector(this.x, this.y);
            }
      

            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
            };
      this.show = function() {
            p.stroke(255);
            p.fill(255);
            
      for (let i = 0; i < this.tail.length; i++) {
            p.rect(this.tail[i].x*resolution, this.tail[i].y*resolution, resolution, resolution);
      }            
      p.rect(Math.floor(this.x)*resolution,Math.floor(this.y)*resolution, resolution, resolution);
            };
      this.dir = (x, y) => {
            this.dx = x;
            this.dy = y;
            };
            
      this.eat = (x, y) => {
            var d = (Math.floor(this.x)===Math.floor(x) && 
                  Math.floor(y)===Math.floor(this.y));
            if (d){
                  this.total++;
                  return true;}
            else{return false;}
            };
      this.death = function() {
            if (this.x < 0 || this.x > Math.floor(width/resolution) ||
                this.y < 0 || this.y > Math.floor(height/resolution)){
                  this.over = 0;
                  this.total = 0;
                  this.tail  = [];
                  this.x = 0;
                  this.y = 0;
                  this.dx = 0;
                  this.dy = 0;
            }else{
                  for (let i = 0; i < this.tail.length; i++) {
                        let pos = this.tail[i];
                        let d  = (Math.floor(this.x)===Math.floor(pos.x) && 
                        Math.floor(pos.y)===Math.floor(this.y));
                        if (d) {
                              console.log('starting over');
                              this.total = 0;
                              this.tail  = [];
                              this.x = 0;
                              this.y = 0;
                              this.dx = 0;
                              this.dy = 0;
                              this.over  = 0;
                        }}
                  }
         }
         
         this.score = function(){
               p.push()
               p.stroke(0, 102, 153);
               p.fill(0, 102, 153);
               //p.textAlign(p.CENTER, p.CENTER);
               p.textSize(20);
               p.text(this.total, 10, 60);
               p.pop()
               }
         
      }
            
      p.keyPressed = function () {
            if (p.keyCode === p.UP_ARROW){
                  player.dir(0,-1);
                  }
            if (p.keyCode === p.DOWN_ARROW){
                  player.dir(0, 1);
                  }
            if (p.keyCode === p.RIGHT_ARROW){
                  player.dir(1, 0);
                  }
            if (p.keyCode === p.LEFT_ARROW){
                  player.dir(-1, 0);
            }
            if (p.keyCode === p.ENTER){
                  //player.over = !player.over;
                  }
      };
      
      function foodLocation(){
            this.x = 10;
            this.y = 10;
            
            this.newLoc = () =>{
                  this.x = Math.floor(Math.random()*width/resolution);
                  this.y = Math.floor(Math.random()*height/resolution);
            };
      };
            
      player = new Snake();
      food = new foodLocation();
      food.newLoc();
      
      p.setup = () => {
            canvas = p.createCanvas(height, width);
            p.background('black');
            p.frameRate(frame_rate)
      
      }

      p.draw = () => {
            p.background('black');
            player.move();
            player.show();
            if (player.eat(food.x,food.y)){
                  food.newLoc();
            }
            p.fill(255,0,100);
            p.rect(food.x*resolution, food.y*resolution, resolution, resolution);
            player.death();
            player.score();
      }
      
}
