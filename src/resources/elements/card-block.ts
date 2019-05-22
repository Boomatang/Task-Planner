import { bindable, customElement } from "aurelia-framework";

import {Card} from "../../services/planner-types";

@customElement('card-block')
export class CardBlock {
  @bindable card: Card = {_id: 'na', text:"Default massage"};


  attached(){
    // console.log(this.card)
  }

}
