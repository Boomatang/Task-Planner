import {Card, User} from "./services/planner-types";

export class App {
  public message: string = 'Hello World!';

  cardValue: string;
  _id: number = 0;
  cards: Card[] = [{_id: 'Worked', text: "the long way around"}];
  users: User[] = [
    {name: "Peter Carol"},
    {name: "Joan Linch"}

  ];

  itemDropped(item, target, source, sibling, itemVM, siblingVM) {
    //do things in here
    console.log("it was dropped");
    this.showIt(item)
  }

  showIt(element) {
    var parent = element.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, element);
    console.log(index);
  }

  add(){
    // console.log('button pressed');

    this.cards.push({_id: this._id.toString(), text: this.cardValue});

    // console.log(`${this._id} : ${this.cardValue}`);
    this._id ++;
    this.cardValue = undefined;



  }


}
