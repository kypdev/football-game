// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  editBoxPlayername: cc.Node;

  @property(cc.Node)
  savePlayernameBtn: cc.Node;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}

  onClickSavePlayername() {
    // console.log('save playername');

    let playername = this.editBoxPlayername
      .getChildByName("playername")
      .getComponent(cc.Label).string;

    // console.log("name: " + pn);

    const regex = /^[a-zA-Z0-9]+$/;

    if (playername.match(regex)) {
      console.log("go second sence");
      localStorage.setItem("playername", playername);
      cc.director.loadScene("ShootFootball");
      console.log("playname: " + localStorage.getItem("playername"));
    } else {
      console.log("show alert not match eng and numberic");
    }
  }
}
