// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // * Playername Label
  @property(cc.Label)
  playernameLabel: cc.Label;
  // * Score Label
  @property(cc.Label)
  scoreLabel: cc.Label;
  // * Ball Node
  @property(cc.Node)
  ball: cc.Node;
  // * Confirm Button
  @property(cc.Node)
  shoot: cc.Node;
  // * Left Button
  @property(cc.Node)
  left: cc.Node;
  // * Mid Button
  @property(cc.Node)
  mid: cc.Node;
  // * Right Button
  @property(cc.Node)
  right: cc.Node;

  ballDirection: number;
  ballDirectionX: number;
  ballDirectionY: number;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let playername = localStorage.getItem("playername");
    this.playernameLabel.string = playername;
  }

  start() {
    this.ball.setPosition(479.657, 41.469);
  }

  setFirstBallPosition() {
    this.ball.setPosition(479.657, 41.469);
    this.ball.setRotation(0);
    this.ball.setScale(1);
  }

  // update (dt) {}

  onClickSelectLeft(e: any, d: number) {
    console.log("Left: " + d);
    this.ballDirection = d;

    this.randomLeftBallDirection();
  }

  onClickSelectMid(e: any, d: number) {
    console.log("Mid: " + d);
    this.ballDirection = d;
  }

  onClickSelectRight(e: any, d: number) {
    console.log("Right: " + d);
    this.ballDirection = d;
  }

  checkBallInOut() {
    // Ball In
    //  xLeft > 101
    //  xRight < 851
    //  yLeft < 741
    //  yBottom > 234

    if (
      this.ballDirectionX >= 101 &&
      this.ballDirectionX <= 851 &&
      this.ballDirectionY <= 471 &&
      this.ballDirectionY >= 234
    ) {
      console.log("Ball IN");
    } else {
      console.log("Ball OUT");
    }
  }

  onClickConfirmShoot() {
    try {
      console.log("confirm shoot");
      console.log("ballDirec: " + this.ballDirection);
      
      this.ballTweenAction(this.ballDirectionX, this.ballDirectionY);
      this.checkBallInOut() 
    } catch (error) {
      console.error("shoot: " + error);
    }
  }

  randomLeftBallDirection() {
    // let xMin = 335;
    // let XMax = -1;
    // let yMin = 67;
    // let yMax = 555;

    let xRan = Math.floor(Math.random() * 335 + -1);
    let yRan = Math.floor(Math.random() * 488 + 67);

    console.log("xRan: " + xRan);
    console.log("yRan: " + yRan);

    this.ballDirectionX = xRan;
    this.ballDirectionY = yRan;
  }

  ballTweenAction(x: number, y: number) {
    cc.tween(this.ball)
      .to(1, { position: cc.v2(x, y), rotation: 1500 })
      .to(1, { scale: 1 })
      .call(() => {
        console.log(" finished animation");
        console.log("show result IN OUT\n#########################");
        // this.onRestore()
        let x = this.ball.position.x.toFixed(3);
        let y = this.ball.position.y.toFixed(3);

        console.log("X: " + x + ", Y: " + y);

        this.setFirstBallPosition();
      })
      .start();
  }
}
