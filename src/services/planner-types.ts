export interface Card {
  _id: string;
  text: string;
}

export interface User {
  _id: string;
  name: string;
  multiplier: number;
  ranks: Map<string, CardRank>
}

export interface CardRank {
  _id: string;
  position: number;
  weight: number;
}
