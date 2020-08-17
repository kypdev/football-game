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
  @property(cc.Node)
  editBoxPlayername: cc.Node;
  // * Save Playername Button
  @property(cc.Node)
  savePlayernameBtn: cc.Node;
  // * Alert Node
  @property(cc.Node)
  alertPlayername: cc.Node;
  // * OK Button Alert Validate Playername
  @property(cc.Node)
  okBtnAlert: cc.Node;

  @property(cc.Button)
  btn: cc.Button;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.alertPlayername.active = false;
  }

  // start() {}

  // update (dt) {}

  onClickSavePlayername() {
    console.log("save playername");

    let playername = this.editBoxPlayername
      .getChildByName("playername")
      .getComponent(cc.Label).string;

    // console.log("name: " + pn);

    const regex = /^[a-zA-Z0-9]+$/;

    if (playername.match(regex)) {
      // console.log("go second sence");
      localStorage.setItem("playername", playername);
      cc.director.loadScene("Game");
      // console.log("playname: " + localStorage.getItem("playername"));
    } else {
      // console.log("show alert not match eng and numberic");
      this.alertPlayername.active = true;
    }
  }

  onClickOKAlertBtn() {
    this.alertPlayername.active = false;
  }

  onTextChange(data: string) {
  
      if(data.length == 0){
        console.log('no data');
        
      }
  
  }
}
