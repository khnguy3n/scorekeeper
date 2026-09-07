import type { GameDefinition } from "../shared/gameDefinition";
import type { GameSession, GameStatus } from "../shared/gameSession";
import type { Player } from "../shared/player";
import { assert } from "../shared/utils";
import { calculateByLowestScore } from "../shared/standing";

export const FIVE_CROWNS_TOTAL_ROUNDS = 11 as const;
export interface FiveCrownsState {
  dealerId: string;
  pendingScores: Record<string, number | undefined>;
}

export type FiveCrownsSession = GameSession<FiveCrownsState>;

function createFiveCrownsSession(players: Player[]): FiveCrownsSession {
  assert(players.length > 2, "This game requires more players");
  //const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    gameId: "FIVE-CROWNS",
    status: "setup",
    players,
    rounds: [],
    currentRound: 1,
    state: {
      dealerId: players[0].id,
      pendingScores: {},
    },
  };
}

export const fiveCrownsDefinition: GameDefinition<FiveCrownsState> = {
  id: "five-crowns",
  name: "Five Crowns",
  description: "Eleven rounds. The lowest score wins.",
  minPlayers: 2,
  maxPlayers: 7,

  createSession: createFiveCrownsSession,

  getRoundLabel(session) {
    const cardCount = session.currentRound + 2;

    return [`Round ${session.currentRound}`, `${cardCount} cards`].join(" · ");
  },

  calculateStandings(session) {
    return calculateByLowestScore(session);
  },

  isComplete(session) {
    return session.rounds.length >= FIVE_CROWNS_TOTAL_ROUNDS ? "complete" : "in-progress";
  },
};
