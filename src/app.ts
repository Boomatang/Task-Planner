import {Card, CardRank, User} from "./services/planner-types";
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {OrderChange, OrderChangePayload} from "./services/messages";

@inject(EventAggregator)
export class App {
  public message: string = 'Hello World!';

  cardValue: string;
  _id: number = 0;
  cards: Card[] = [
    {_id: '0', text: "Task A"},
    {_id: '1', text: "Task B"},
    {_id: '2', text: "Task C"},
    {_id: '3', text: "Task D"},
    {_id: '4', text: "Task E"},
  ];
  // cards: Card[] = [];
  users: User[] = [
    {_id: "PC1", name: "Peter Carol", multiplier: 1.1, ranks: new Map<string, CardRank>()},
    {_id: "JL1", name: "Joan Linch", multiplier: 0.9, ranks: new Map<string, CardRank>()}

  ];

  constructor(private ea: EventAggregator) {
  }

  static showIt(element) {
    const items = [];
    let i = 0;
    var parent = element.parentNode;
    parent.children.forEach(item => {
      console.log(item.parentElement.children.length);
      console.log("Value above");

      items.push({index: i, id: item.id});
      i++;

    });
    var index = Array.prototype.indexOf.call(parent.children, element);
    console.log(index);
    return items;
  }

  itemDropped(item, target, source, sibling, itemVM, siblingVM) {
    //do things in here
    console.log("it was dropped");
    App.showIt(item);


    const payload = [];
    const values = App.showIt(item);

    values.forEach((value, i, a) => {
      const entry = new OrderChangePayload();
      entry.card_id = value.id;
      entry.position = value.index;

      payload.push(entry);
    });

    this.ea.publish(new OrderChange(target.id, payload))
  }

  add(){
    // console.log('button pressed');

    this.cards.push({_id: this._id.toString(), text: this.cardValue});

    // console.log(`${this._id} : ${this.cardValue}`);
    this._id ++;
    this.cardValue = undefined;


  }


}
