import Phaser from 'phaser'

class Scene1 extends Phaser.Scene {
    constructor() {

      super("bootGame");
    }
  
    preload(){
      console.log("========================> Scene1")
      this.load.image("background", "http://localhost:3000/assets/images/webGL/board.jpg");
      this.load.image("blue_boo", "http://localhost:3000/assets/images/webGL/blue_boo.png");
      this.load.image("pink_boo", "http://localhost:3000/assets/images/webGL/pink_boo.png");
      this.load.image("me", "http://localhost:3000/assets/images/webGL/user.png");
      this.load.image("you", "http://localhost:3000/assets/images/webGL/user2.png");
      this.load.image('dot', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png'); // slider dot
    }
  
    create() {
      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");
    }

  }

  export default Scene1;  