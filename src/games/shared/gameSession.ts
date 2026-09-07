import type { Player } from "./player";
import type { GameRound } from "./round";

export type GameStatus = "setup" | "in-progress" | "complete";

export interface GameSession<TState = unknown> {
  id: string;
  gameId: string;
  status: GameStatus;
  players: Player[];
  rounds: GameRound[];
  currentRound: number;

  state: TState;
}
