import type { GameDefinition } from "./shared/gameDefinition";
import { fiveCrownsDefinition } from "./fiveCrowns/fiveCrowns.ts";

export type RegisteredGame = GameDefinition<unknown>;

export const gameCatalog = new Map<string, RegisteredGame>([
  [fiveCrownsDefinition.id, fiveCrownsDefinition as RegisteredGame],
]);

export function getGameDefinition(gameId: string): RegisteredGame | undefined {
  return gameCatalog.get(gameId);
}
