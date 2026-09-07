export type GameStatus = "setup" | "in-progress" | "done";

export interface Player {
  id: string;
  name: string;
  color: string;
}

export interface RoundScore {
  playerId: string;
  score: number;
}

export interface Round {
  id: string;
  number: number;
}

export interface GameSession<TState = unknown> {
  id: string;

  gameId: string; //Identify which game definition handle this session
  status: GameStatus;
  players: Player[];
  rounds: Round[];

  currentRound: number;

  state: TState; // Extra info specific to the type of game
}
