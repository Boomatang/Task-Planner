import { bindable, customElement } from "aurelia-framework";
import {User} from "../../services/planner-types";

export class ColumnBlock {
  @bindable
  user: User;


  itemDroppedHere(item, target, source, sibling, itemVM, siblingVM) {
    //do things in here
    console.log("it was dropped");
    this.showIt(item)
  }

  showIt(element) {
    var parent = element.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, element);
    console.log(index);

  }
}
