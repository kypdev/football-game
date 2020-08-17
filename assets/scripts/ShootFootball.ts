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
  @property(cc.Button)
  shoot: cc.Button;
  // * Left Button
  @property(cc.Button)
  left: cc.Button;
  // * Mid Button
  @property(cc.Button)
  mid: cc.Button;
  // * Right Button
  @property(cc.Button)
  right: cc.Button;
  // * Alert Ball In
  @property(cc.Node)
  alertBallIn: cc.Node;
  // * Alert Ball Out
  @property(cc.Node)
  alertBallOut: cc.Node;
  // * Alert 5 Rounds
  @property(cc.Node)
  playResult: cc.Node;
  // * Result Score
  @property(cc.Label)
  resultScore: cc.Label;
  // * Play Again Button
  @property(cc.Node)
  playagainButton: cc.Node;
  // * Exit Button
  @property(cc.Node)
  exitButton: cc.Node;

  // * Ball Direction Alert
  @property(cc.Node)
  ballDirectionAlert: cc.Node;
  @property(cc.Button)
  okBallDirection: cc.Button;

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
    this.playernameLabel.string = "Playername : " + playername;
  }

  start() {
    this.firstBallPositionX = 0;
    this.firstBallPositionY = -278;
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

  // update(dt) {}

  onClickSelectLeft(e: any, d: number) {
    console.log("Left: " + d);
    this.ballDirection = d;

    // this.left.hoverSprite.on

    this.randomLeftBallDirection();
  }

  onClickSelectMid(e: any, d: number) {
    console.log("Mid: " + d);
    this.ballDirection = d;
    this.randomMiddleBallDirection();
  }

  onClickSelectRight(e: any, d: number) {
    console.log("Right: " + d);
    this.ballDirection = d;
    this.randomRightBallDirection();
  }

  checkBallInOut() {
    // Ball In
    //  xLeft > 101
    //  xRight < 851
    //  yTop < 741
    //  yBottom > 234

    let winlose = Math.floor(Math.random() * 2 + 0);
    console.log("winlose: " + winlose);

    if (winlose == 0) {
      console.log("GOAL GOAL GOAL");

      this.score++;
      setTimeout(() => {
        console.log("hide ball");
        this.ball.active = false;

        this.setFirstBallPosition();
      }, 1000);

      setTimeout(() => {
        this.alertBallIn.active = true;
      }, 2000);

      setTimeout(() => {
        this.alertBallIn.active = false;
      }, 3000);
    } else if (winlose == 1) {
      console.log("NO GOAL");

      setTimeout(() => {
        console.log("hide ball");
        this.ball.active = false;

        this.setFirstBallPosition();
      }, 500);

      setTimeout(() => {
        this.alertBallOut.active = true;
      }, 1000);

      setTimeout(() => {
        this.alertBallOut.active = false;
      }, 2000);
    }

    // if (
    //   this.ballDirectionX >= 101 &&
    //   this.ballDirectionX <= 851 &&
    //   this.ballDirectionY <= 471 &&
    //   this.ballDirectionY >= 234
    // ) {
    //   console.log("Ball IN");
    //   this.score++;
    //   setTimeout(() => {
    //     console.log("hide ball");
    //     this.ball.active = false;

    //     this.setFirstBallPosition();
    //   }, 1000);

    //   setTimeout(() => {
    //     this.alertBallIn.active = true;
    //   }, 2000);

    //   setTimeout(() => {
    //     this.alertBallIn.active = false;
    //   }, 3000);

    //   // setTimeout(() => {
    //   //   console.log("show ball");
    //   //   this.ball.active = true;
    //   // }, 4000);
    // } else {
    //   console.log("Ball OUT");

    //   setTimeout(() => {
    //     console.log("hide ball");
    //     this.ball.active = false;

    //     this.setFirstBallPosition();
    //   }, 500);

    //   setTimeout(() => {
    //     this.alertBallOut.active = true;
    //   }, 1000);

    //   setTimeout(() => {
    //     this.alertBallOut.active = false;
    //   }, 2000);

    //   // setTimeout(() => {
    //   //   console.log("show ball");
    //   //   this.ball.active = true;
    //   // }, 3000);
    // }
  }

  onDisableShoot() {
    this.left.interactable = false;
    this.mid.interactable = false;
    this.right.interactable = false;
    this.shoot.interactable = false;
  }

  onEnableShoot() {
    this.left.interactable = true;
    this.mid.interactable = true;
    this.right.interactable = true;
    this.shoot.interactable = true;
    this.ball.active = true;
  }

  onClickConfirmShoot() {
    try {
      console.log("confirm shoot");

      if (this.ballDirection == null) {
        console.log(" You haven' t choose ball direction shoot yet !!");
        this.ballDirectionAlert.active = true;
        console.log("ballDirec: " + this.ballDirection);
      } else {
        this.onDisableShoot();
        this.ballTweenAction(this.ballDirectionX, this.ballDirectionY);
      }
    } catch (error) {
      console.error("shoot: " + error);
    }
  }

  // * Random Left
  randomLeftBallDirection() {
    // let xLeft: -372
    // let xRight: -170;
    // let yBottom: -76
    // let yTop: 224

    let xRan = Math.floor(Math.random() * 202 + -372);
    let yRan = Math.floor(Math.random() * 301 + -76);

    console.log("xRan: " + xRan);
    console.log("yRan: " + yRan);

    this.ballDirectionX = xRan;
    this.ballDirectionY = yRan;
  }

  // * Random Middle
  randomMiddleBallDirection() {
    // let xLeft: -171
    // let XRight: 133
    // let yBottom: -76
    // let yTop: 224

    let xRan = Math.floor(Math.random() * 305 + -171);
    let yRan = Math.floor(Math.random() * 301 + -76);

    console.log("xRan: " + xRan);
    console.log("yRan: " + yRan);

    this.ballDirectionX = xRan;
    this.ballDirectionY = yRan;
  }

  // * Random Right
  randomRightBallDirection() {
    // let xLeft: 134
    // let XRight: 448
    // let yBottom: -76
    // let yTop: 224

    let xRan = Math.floor(Math.random() * 314 + 134);
    let yRan = Math.floor(Math.random() * 301 + -76);

    console.log("xRan: " + xRan);
    console.log("yRan: " + yRan);

    this.ballDirectionX = xRan;
    this.ballDirectionY = yRan;
  }

  updateScore() {
    this.scoreLabel.string = "Score : " + this.score;
  }

  ballTweenAction(x: number, y: number) {
    cc.tween(this.ball)
      .to(0.5, { position: cc.v2(x, y), rotation: 1500 })
      .to(0.5, { scale: 1 })
      .call(() => {
        console.log(" finished animation");
        console.log("show result IN OUT\n#########################");

        let x = this.ball.position.x.toFixed(3);
        let y = this.ball.position.y.toFixed(3);

        console.log("X: " + x + ", Y: " + y);

        this.round++;

        if (this.round > 4) {
          this.hideNodeFinalRound();
          setTimeout(() => {
            console.log("play 5 rounds show score !!");
            this.showResultPlay();
          }, 1000);
        } else if (this.round >= 0 && this.round < 5) {
          this.checkBallInOut();
          setTimeout(() => {
            console.log("show ball");
            this.updateScore();
            this.onEnableShoot();

            // this.scoreLabel
          }, 4000);
        }
        console.log("Score: " + this.score + ", Round: " + this.round);
      })
      .start();
  }

  showResultPlay() {
    this.resultScore.string = this.score + " ประตู";

    this.playResult.active = true;
  }

  delayShow() {
    console.log("delay");

    setTimeout(() => {
      console.log("delay show");
    }, 5000);
  }

  hideNodeFinalRound() {
    // this.right.active = false;
    // this.mid.active = false;
    // this.shoot.active = false;
    // this.ball.active = false;
  }

  onClickPlayAgain() {
    this.setFirstBallPosition();
    this.onEnableShoot();
    this.playResult.active = false;
    this.score = 0;
    this.scoreLabel.string = "Score : 0";
    this.round = 0;
    this.ballDirection = null;
  }

  onClickExit() {
    cc.director.loadScene("Playername");
    localStorage.clear;
  }

  click() {
    console.log("CLICK");
    // this.clickdd.
  }

  okBallDirectionAlert() {
    this.ballDirectionAlert.active = false;
  }
}
