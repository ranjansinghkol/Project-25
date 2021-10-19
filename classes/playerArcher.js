class PlayerArcher {
    constructor(x, y, width, height, angle) {
      const options = {
        isStatic: true
      };
  
      this.body = Matter.Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.angle = angle;
      this.collapse = false;
      this.image = loadImage("assets/playerArcher.png");

      //this.trajectory = [];
  
      World.add(world, this.body);
      Matter.Body.setAngle(this.body, this.angle); 
    }
  
    display() {
      var pos = this.body.position;

      //console.log(this.angle);

      if (keyIsDown(UP_ARROW) && this.angle > -103) {
        this.angle --;
      }
      if (keyIsDown(DOWN_ARROW) && this.angle < -73) {
        this.angle ++;
      }

      angleMode(DEGREES);
      
      //add the code to move arrow up and down
      push();
      translate(pos.x, pos.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
  }