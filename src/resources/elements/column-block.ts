import {bindable, inject} from "aurelia-framework";
import {Card, User} from "../../services/planner-types";
import {EventAggregator} from 'aurelia-event-aggregator';
import {OrderChange, OrderChangePayload, Weight, WeightChange} from "../../services/messages";

@inject(EventAggregator)
export class ColumnBlock {
  @bindable
  user: User;
  @bindable
  cards: Card[];
  total: number = 0;

  constructor(private ea: EventAggregator) {
    this.subscribe()
  }

  calculateTotal() {
    this.total = 0;
    this.user.ranks.forEach(value => {
      this.total = this.total + value.weight;
      console.log(this.total);
    })
  }

  publishWeights() {
    const weights: Weight[] = [];

    this.user.ranks.forEach(value => {
      // this.total = this.total + value.weight;
      const msg: Weight = {card_id: value._id, weight: value.weight};
      weights.push(msg);
    });

    this.ea.publish(new WeightChange(this.user._id, weights));
    // console.log("Published weights : " + this.user.name);
    // console.log(weights);
  }

  subscribe() {
    this.ea.subscribe(OrderChange, msg => {
      const payload = msg.payload;
      console.log("here we are subscribed to a message");
      console.log(msg.user_id == this.user._id);
      if (msg.user_id == this.user._id) {
        // console.log("The payload value is");
        // console.log(payload);
        // console.log(`${this.user.name} is working on the ranks`);
        payload.forEach(item => {
          console.log("working on card id : " + item.card_id);
          this.user.ranks.set(item.card_id,
            {
              _id: item.card_id,
              position: item.position,
              weight: (1 + item.position) * this.user.multiplier
            });
        })
      }
      if (msg.user_id == this.user._id) {
        // console.log("Ranks of user : " + this.user.name);
        // console.log(this.user.ranks);
      }


      this.calculateTotal();
      this.publishWeights();
      console.log(this.total);
      //
      // }

    })
  }

}
