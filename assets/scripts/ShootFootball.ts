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

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let playername = localStorage.getItem("playername");
    this.playernameLabel.string = playername;
  }

  start() {
    this.ball.setPosition(479.657, 41.469);
  }

  // update (dt) {}

  onClickSelectLeft(e: any, d: number) {
    console.log("Left: " + d);
    this.ballDirection = d;
  }

  onClickSelectMid(e: any, d: number) {
    console.log("Mid: " + d);
    this.ballDirection = d;
  }

  onClickSelectRight(e: any, d: number) {
    console.log("Right: " + d);
    this.ballDirection = d;
  }

  onClickConfirmShoot() {
    try {
      console.log("confirm shoot");
      console.log("ballDirec: " + this.ballDirection);
    } catch (error) {
      console.error("shoot: " + error);
    }
  }
}
