import Phaser from 'phaser'
import axios from 'axios'
import Slider from 'phaser3-rex-plugins/plugins/slider.js';

const boardSize = 627;
const modalWidth = 1050;
const modalHeight = 700;
var renderSpeed = 500;

const version = {
  'version': 'v1',
}

var header = {
  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt')
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.boardStatus = {
      chacksoo: "",
      placement: [],
      boardIdx: 0,
      isAuto: false,
      idxLen : 0,
      isError: "",
      renderTime: new Date().getTime(),
      challengerId: 0,
      oppositeId: 0,
      idxIncrement: true,
    }
    
    axios.get(`http://203.246.112.32:8000/api/${version.version}/game/${window.localStorage.getItem('selectedGameId')}/`, { headers: header})
    .then((response) => {
        // console.log(response)
        this.boardStatus.isError = response.data.error_msg;
        this.boardStatus.chacksoo = response.data.record.replace(/\n/gi, '').split(/ /);
        console.log(this.boardStatus.chacksoo);
        this.boardStatus.placement = response.data.placement_record.split(/\n/);
        this.boardStatus.idxLen = this.boardStatus.chacksoo.length/64 - 2;
        this.boardStatus.challengerId = response.data.challenger;
        this.boardStatus.oppositeId = response.data.opposite;
      })
      .catch((error) => {
        // console.log(error.response.status);
      });
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
      this.iter = 0; // used for itarations
      this.boardStatus.boardIdx = 0;
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.49);
      this.background.setOrigin(0.5, 0.5);
      // for slider
      this.sliderDot = this.add.image(modalWidth/2, modalHeight - 50, 'dot').setScale(7, 7); // add dot
      this.sliderDot.slider = new Slider(this.sliderDot, {
        endPoints: [{
                x: this.sliderDot.x - 200,
                y: this.sliderDot.y
            },
            {
                x: this.sliderDot.x + 200,
                y: this.sliderDot.y
            }
        ],
        value: 0
      });
    
    this.add.graphics()
              .lineStyle(3, 0xeec65b, 1)
              .strokePoints(this.sliderDot.slider.endPoints);
              
              // change isAuto value
              this.updateClickCountText = () => {
                this.boardStatus.isAuto = !this.boardStatus.isAuto
                
                if(this.boardStatus.isAuto === true){
                  this.clickButton.setText("Auto Mode Button", { font: '17px Arial' })
                  // this.sliderDot.visible = false;
                }
                else{
                  // this.sliderDot.visible = true;
                  this.clickButton.setText("Manual Mode Button", { font: '17px Arial' })
                }
              }
              this.nextIdxText = () => {
                if(this.boardStatus.isAuto === false){
                  if(this.boardStatus.boardIdx !== this.boardStatus.idxLen){
                    this.boardStatus.boardIdx += 1;
                    this.sliderDot.slider.value += 1/this.boardStatus.idxLen;
                  }
                }
              }
              this.previousIdxText = () => {
                if(this.boardStatus.isAuto === false){
                  if(this.boardStatus.boardIdx !== 0){
                    this.boardStatus.boardIdx -= 1;
                    this.sliderDot.slider.value -= 1/this.boardStatus.idxLen;
                  }
                }
              }
      
      
      // auto manual button(text)
      this.clickButton = this.add.text(modalWidth/2 - 100, modalHeight - 110, `${this.boardStatus.isAuto ? "Auto" : "Manual"} Mode Button`, { font: '17px Arial', fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.updateClickCountText();
        this.enterButtonHoverState();
      });
      

      this.nextButton = this.add.text(this.sliderDot.x + 430, modalHeight - 60, "Next Button", { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateNext() )
      .on('pointerout', () => this.enterButtonRestStateNext() )
      .on('pointerdown', () => this.enterButtonActiveStateNext() )
      .on('pointerup', () => {
        this.nextIdxText();
        this.enterButtonHoverStateNext();
      });
      

      this.previousButton = this.add.text(this.sliderDot.x - 180, modalHeight - 60, "Previous Button", { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStatePrevious() )
      .on('pointerout', () => this.enterButtonRestStatePrevious() )
      .on('pointerdown', () => this.enterButtonActiveStatePrevious() )
      .on('pointerup', () => {
        this.previousIdxText();
        this.enterButtonHoverStatePrevious();
      });

      
      this.enterButtonHoverState = () => {
        this.clickButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestState = () => {
        this.clickButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveState = () => {
        this.clickButton.setStyle({ fill: '#0ff' });
      }
      
      this.enterButtonHoverStateNext = () => {
        this.nextButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestStateNext = () => {
        this.nextButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveStateNext = () => {
        this.nextButton.setStyle({ fill: '#0ff' });
      }
      
      this.enterButtonHoverStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#0ff' });
      }
      
      this.updateClickCountText();
      this.previousIdxText();
      this.nextIdxText();
      
      // this.click
      
      // add the background in the center of the scene
      if(parseInt(window.localStorage.getItem('pk')) === this.boardStatus.challengerId){
        // console.log('같다')
        this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.07);
        this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.07);
        this.myName = this.add.text((modalWidth-boardSize)/4 - 30, 5, '나', { font: '34px Arial', fill: '#eec65b' });
        this.yourName = this.add.text(modalWidth - (modalWidth-boardSize)/4 - 35, 5, '상대방', { font: '34px Arial', fill: '#eec65b' });
      }
      else{
        this.me = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"me").setScale(0.07);
        this.you = this.add.image((modalWidth-boardSize)/4,100,"you").setScale(0.07);
        this.myName = this.add.text((modalWidth-boardSize)/4 - 30, 5, '상대방', { font: '34px Arial', fill: '#eec65b' });
        this.yourName = this.add.text(modalWidth - (modalWidth-boardSize)/4 - 35, 5, '나', { font: '34px Arial', fill: '#eec65b' });
      }
      
      this.myChacksoo = this.add.text(60, 160, '', { font: '34px Arial', fill: '#eec65b' });
      this.yourChacksoo = this.add.text(modalWidth - 160, 160, '', { font: '34px Arial', fill: '#eec65b' });

      // make a group of ships
      this.blue_booGroup = this.make.group({
        key: "blue_boo",
        frameQuantity: 64,
        max: 64
      });
      
      this.pink_booGroup = this.make.group({
        key: "pink_boo",
        frameQuantity: 64,
        max: 64
      });
      
      // align the group of ships in a grid
      Phaser.Actions.GridAlign(this.blue_booGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 64,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -45,
        y: -215
      });
      
      Phaser.Actions.GridAlign(this.pink_booGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 64,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -45,
        y: -215
      });
      
      // slider value65b' });
      this.errMsg = this.add.text(modalWidth/2 - 300, 0, `${this.boardStatus.isError}`, { font: '15px Arial', fill: '#eec65b' });
    }
    
  
      update() {
        // console.log(this.boardStatus.boardIdx)
        
        // rotate the ships
        var children = this.blue_booGroup.getChildren();
        var children2 = this.pink_booGroup.getChildren();
        
        for (var i = 0; i < children.length; i++) {
          // // children[i].rotation += 0.1;
          children[i].setScale(0.091);
          children2[i].setScale(0.091);
          
          if(this.boardStatus.chacksoo[((this.boardStatus.boardIdx+1)*64) + i] === "0"){
            children[i].visible = false;
            children2[i].visible = false;
          }
          else if(this.boardStatus.chacksoo[(this.boardStatus.boardIdx+1)*64 + i] === "1"){
            children[i].visible = true;
            children2[i].visible = false;
          }
          else if(this.boardStatus.chacksoo[(this.boardStatus.boardIdx+1)*64 + i] === "-1"){
            children[i].visible = false;
            children2[i].visible = true;
          }
          else{
            children[i].visible = false;
            children2[i].visible = false;
          }
          
        };
  
        if(this.boardStatus.boardIdx%2 === 0){
          // my turn
          if(this.boardStatus.placement[this.boardStatus.boardIdx] !== undefined){
            if(this.boardStatus.placement[this.boardStatus.boardIdx].charAt(4) === '>'){
              // my move
              this.myChacksoo.setText('이동\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(0) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + '>' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(6) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(8));
              if(this.boardStatus.boardIdx === 0){
                this.yourChacksoo.setText('착수\n 준비');
              }
            }
            else{
              // my chacksoo
              this.myChacksoo.setText('착수\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(4));
              if(this.boardStatus.boardIdx === 0){
                this.yourChacksoo.setText('착수\n 준비')
              }
            }
          }
          else{
            // undefined
            this.myChacksoo.setText('착수\n 준비');
            this.yourChacksoo.setText('착수\n 준비');
          }
        }
        else{
          // your turn
          if(this.boardStatus.placement[(this.boardStatus.boardIdx)] !== undefined){
            if(this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(4) === '>'){
              // your move
              this.yourChacksoo.setText('이동\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(0) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + '>' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(6) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(8));
            }
            else{
              // your chacksoo
              if(this.boardStatus.placement[this.boardStatus.boardIdx] !== undefined){
                this.yourChacksoo.setText('착수\n ' + this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(2) + ',' + this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(4));
              }
              else{
                this.yourChacksoo.setText('착수\n 준비');
              }
            }
          }
          else{
            // undefined
            this.myChacksoo.setText('착수\n 준비');
            this.yourChacksoo.setText('착수\n 준비');
          }
        }
        
        // increment the iteration
        this.iter += 0.001;
        if(this.boardStatus.isAuto){
          if(new Date().getTime() - this.boardStatus.renderTime > renderSpeed){
            if(this.boardStatus.idxIncrement){
              this.boardStatus.boardIdx += 1;
              this.sliderDot.x += 400/this.boardStatus.idxLen;
              this.sliderDot.slider.value += 1/this.boardStatus.idxLen;
            }
            this.boardStatus.renderTime = new Date().getTime()
          }
          this.sliderDot.visible = false;
        }
        else{
          this.sliderDot.visible = true;
          this.boardStatus.boardIdx = parseInt(this.sliderDot.slider.value * this.boardStatus.idxLen + 0.00001);
        }
  
        if(this.boardStatus.boardIdx >= (this.boardStatus.idxLen) && this.boardStatus.isAuto){
          this.boardStatus.idxIncrement = false;
          this.sliderDot.slider.value = 0;
        }
        else{
          this.boardStatus.idxIncrement = true;
        }
      };
    } 
  export default Scene2;