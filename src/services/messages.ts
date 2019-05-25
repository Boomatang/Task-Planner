export class OrderChangePayload {
  card_id: string;
  position: number;
}

export class OrderChange {
  payload: OrderChangePayload[];
  user_id: string;

  constructor(user_id: string, payload: OrderChangePayload[]) {
    this.user_id = user_id;
    this.payload = payload;

  }
}

export class Weight {
  card_id: string;
  weight: number;

  constructor(card_id: string, weight: number) {
    this.card_id = card_id;
    this.weight = weight;
  }
}

export class WeightChange {
  weights: Weight[];
  user_id: string;

  constructor(user_id: string, weights: Weight[]) {
    this.user_id = user_id;
    this.weights = weights;
  }
}
