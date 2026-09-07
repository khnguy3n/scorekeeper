import type { Player } from "./player";
import type { GameSession, GameStatus } from "./gameSession";
import type { Standing } from "./standing";

export interface GameDefinition<TState> {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;

  createSession(players: Player[]): GameSession<TState>;
  getRoundLabel(session: GameSession<TState>): string;
  calculateStandings(session: GameSession<TState>): Standing[];
  isComplete(session: GameSession<TState>): GameStatus;
}
