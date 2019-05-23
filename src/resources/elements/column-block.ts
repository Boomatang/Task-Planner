import {bindable, inject} from "aurelia-framework";
import {Card, User} from "../../services/planner-types";
import {EventAggregator} from 'aurelia-event-aggregator';
import {OrderChange, OrderChangePayload} from "../../services/messages";

@inject(EventAggregator)
export class ColumnBlock {
  @bindable
  user: User;
  @bindable
  cards: Card[];
  total: number = 0;

  constructor(private ea: EventAggregator) {
    this.ea.subscribe(OrderChange, msg => {
      const payload = msg.payload;

      if (msg.user_id == this.user._id) {
        console.log(payload);

        payload.forEach(item => {
          this.user.ranks.set(item.card_id,
            {
              _id: item.card_id,
              position: item.position,
              weight: (1 + item.position) * this.user.multiplier
            });
        })
      }
      // if(payload.user_id == this.user._id) {
      console.log(this.user.ranks);
      //
      this.calculateTotal();
      //
      // }

    })
  }

  calculateTotal() {
    this.total = 0;
    this.user.ranks.forEach(value => {
      this.total = this.total + value.weight
    })
  }

}
