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
  // * Alert Ball In
  @property(cc.Node)
  alertBallIn: cc.Node;
  // * Alert Ball Out
  @property(cc.Node)
  alertBallOut: cc.Node;

  firstBallPositionX: number;
  firstBallPositionY: number;
  ballDirection: number;
  ballDirectionX: number;
  ballDirectionY: number;
  score: number;
  round: number;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let playername = localStorage.getItem("playername");
    this.playernameLabel.string = 'Playername: ' + playername;
  }

  start() {
    this.firstBallPositionX = 479;
    this.firstBallPositionY = 41;
    this.ball.setPosition(this.firstBallPositionX, this.firstBallPositionY);
    this.ballDirectionX = this.firstBallPositionX;
    this.ballDirectionY = this.firstBallPositionY;
    this.score = 0;
    this.round = 0;
    this.ballDirection = null;
  }

  setFirstBallPosition() {
    this.ball.setPosition(this.firstBallPositionX, this.firstBallPositionY);
    this.ball.setRotation(0);
    this.ball.setScale(1);
    this.alertBallIn.active = false;
    this.alertBallOut.active = false;
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
    //  yTop < 741
    //  yBottom > 234

    if (
      this.ballDirectionX >= 101 &&
      this.ballDirectionX <= 851 &&
      this.ballDirectionY <= 471 &&
      this.ballDirectionY >= 234
    ) {
      console.log("Ball IN");
      this.score++;
      this.alertBallIn.active = true;
    } else {
      console.log("Ball OUT");
      this.alertBallOut.active = true;
    }
  }

  onClickConfirmShoot() {
    try {
      console.log("confirm shoot");

      if (this.ballDirection == null) {
        console.log(" You haven' t choose ball direction shoot yet !!");

        console.log("ballDirec: " + this.ballDirection);
      } else this.ballTweenAction(this.ballDirectionX, this.ballDirectionY);
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

  updateScore() {
    this.scoreLabel.string = "คะแนน: " + this.score;
  }

  ballTweenAction(x: number, y: number) {
    cc.tween(this.ball)
      .to(1, { position: cc.v2(x, y), rotation: 1500 })
      .to(1, { scale: 1 })
      .call(() => {
        console.log(" finished animation");
        console.log("show result IN OUT\n#########################");

        let x = this.ball.position.x.toFixed(3);
        let y = this.ball.position.y.toFixed(3);

        console.log("X: " + x + ", Y: " + y);

        this.checkBallInOut();

        this.updateScore();

        this.round++;
        console.log("Score: " + this.score + ", Round: " + this.round);

        if (this.round == 5) {
          console.log("play 5 rounds show score !!");
        }

        // this.setFirstBallPosition();
      })
      .start();
  }
}
