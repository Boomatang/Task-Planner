import {bindable, inject} from "aurelia-framework";
import {Card, Results, User} from "../../services/planner-types";
import {EventAggregator} from 'aurelia-event-aggregator';
import {WeightChange} from "../../services/messages";

@inject(EventAggregator)
export class ResultsBlock {
  @bindable
  cards: Card[];
  @bindable
  users: User[];
  results: Map<string, Results> = new Map<string, Results>();

  ranks: Map<number, string> = new Map<number, string>();

  display_cards: Card[];


  constructor(private ea: EventAggregator) {
    this.subscribe();
  }

  async calc() {
    console.log("Creating the ranking");
    await this.createRankings();


    let scores = [];
    this.ranks.forEach((value, key) => {
      scores.push(key);
    });
    scores.sort(function (a, b) {
      return a - b;
    });
    console.log(scores);

    this.display_cards = [];
    const cards = this.mapCards();

    scores.forEach(value => {
      const card_id = this.ranks.get(value);
      const card = cards.get(card_id);
      this.display_cards.push(card);

    })


  }

  subscribe() {
    this.ea.subscribe(WeightChange, msg => {
      const weights = msg.weights;
      const user_id = msg.user_id;

      // console.log(user_id);
      // console.log(weights);

      weights.forEach(value => {
        // console.log(value);

        if (!this.results.has(value.card_id)) {
          const data = [user_id, value.weight];

          this.results.set(value.card_id, {card: value.card_id, weights: new Map<string, number>()});
          const item = this.results.get(value.card_id);
          item.weights.set(user_id, value.weight);

          this.results.set(value.card_id, item)

        } else {
          const item = this.results.get(value.card_id);
          item.weights.set(user_id, value.weight);

          this.results.set(value.card_id, item)

        }
      });

      this.calc();

    });

  }

  createRankings() {
    // console.log("Results : " + this.results);
    // console.log(this.results);

    this.ranks = new Map<number, string>();

    const local: Map<string, number> = new Map<string, number>();

    this.results.forEach(result => {
      const card_id = result.card;

      let score = 0;

      if (local.has(card_id)) {
        score = local.get(card_id);
      }

      result.weights.forEach(value => {
        score = score + value;
      });

      local.set(card_id, score);

    });

    local.forEach((value, key) => {
      this.ranks.set(value, key);

    });

    // console.log("Ranks : " + this.ranks);
    // console.log(this.ranks);
  }

  mapCards() {
    const card: Map<string, Card> = new Map<string, Card>();

    this.cards.forEach(value => {
      card.set(value._id, value);
    });

    return card

  }

}
