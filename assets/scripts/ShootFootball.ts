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
  scoreLabel: cc.Label
  // * Shoot Mid Button
  @property(cc.Node)
  shootMidBtn: cc.Node


  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let playername = localStorage.getItem("playername");
    this.playernameLabel.string = playername;
  }

  start() {}

  // update (dt) {}

  onClickShootMid() {
    try {
      console.log('play animation');


      var anim = this.getComponent(cc.Animation)
      anim.play('../animation/mid/Mid1.anim')

      


    } catch (error) {
      console.error(error);
      
    }
  }
}
