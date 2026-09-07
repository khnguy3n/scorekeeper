export interface RoundScore {
  playerId: string;
  score: number;
}

export interface GameRound {
  id: string;
  roundNumber: number;
  scores: RoundScore[];
}
