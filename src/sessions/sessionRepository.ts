import Dexie, { type Table } from "dexie";

import type { GameSession } from "../games/shared/gameSession";

type StoredSession = GameSession<unknown>;

class ScorekeeperDatabase extends Dexie {
  declare sessions: Table<StoredSession, string>;

  constructor() {
    super("scorekeeper");
    this.version(1).stores({
      sessions: "id, gameId, status",
    });
  }
}

const database = new ScorekeeperDatabase();

export async function saveSession<TState>(session: GameSession<TState>): Promise<void> {
  await database.sessions.put(session as StoredSession);
}

export async function getSession<TState = unknown>(
  sessionId: string,
): Promise<GameSession<TState> | undefined> {
  return (await database.sessions.get(sessionId)) as GameSession<TState> | undefined;
}

export async function listSessions(): Promise<StoredSession[]> {
  return database.sessions.toArray();
}

export async function deleteSession(sessionId: string): Promise<void> {
  await database.sessions.delete(sessionId);
}
