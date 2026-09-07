import type { GameSession } from "../shared/gameSession";

export interface FiveCrownsState {
  totalRounds: 11;
  dealerId: string;
  pendingScores: Record<string, number | undefined>;
}

export type FiveCrownSession = GameSession<FiveCrownsState>;
