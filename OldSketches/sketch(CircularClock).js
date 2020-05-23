export default function sketch(p){
    let canvas;
    let width = 400; 
    let height = 400;
    let l_circle = 400-10;
    
    p.setup = () => {
      canvas = p.createCanvas(height, width);
      p.noStroke();
      p.angleMode(p.DEGREES);
      p.background('black');
    }
    
    var drawCircle = (value, state, color) => {
      var len = height/8; var c_size = l_circle;
      if (state === "hour"){len = height*3/8; c_size = l_circle- 20};
      if (state === "min" ){len = height/4;   c_size = l_circle - 40};
      p.stroke(color);
      p.strokeWeight(8);
      p.arc(p.width/2, p.height/2, c_size, c_size, 0-90, value-90);
      
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(value- 180);
      p.line(0, 0, 0, len);
      p.pop();
      }

    p.draw = () => {
      p.noFill();
      var day = new Date();
      var hour = p.map(day.getHours()%12, 0, 12, 0, 360, true);
      var min  = p.map(day.getMinutes(), 0, 60, 0, 360, true);
      var sec  = p.map(day.getSeconds(), 0, 60, 0, 360, true);
      p.background('black');
      //Draw Hours
      drawCircle(hour, "hour",'#E8AEB7');
      //Draw Minutes
      drawCircle(min , "min", '#A9FFF7');
      //Draw Seconds
      drawCircle(sec , "sec", '#94FBAB');

    }
}
