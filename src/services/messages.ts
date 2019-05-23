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
