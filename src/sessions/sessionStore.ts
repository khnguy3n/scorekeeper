import { createStore, reconcile, unwrap } from "solid-js/store";

import type { GameSession } from "../games/shared/gameSession";
import type { RoundScore, GameRound } from "../games/shared/round";
import { saveSession } from "./sessionRepository";

export function createSessionStore<TState>(initialSession: GameSession<TState>) {
  const [session, setSession] = createStore(initialSession);
  let writeQueue = Promise.resolve();

  function persist() {
    const snapshot = structuredClone(unwrap(session)) as GameSession<TState>;
    const write = writeQueue.then(() => saveSession(snapshot));

    writeQueue = write.catch(() => undefined);
    return write;
  }

  function startGame() {
    setSession({
      status: "in-progress",
    });

    return persist();
  }

  function replaceSession(next: GameSession<TState>) {
    setSession(reconcile(next));

    return persist();
  }

  function completeRound(scores: RoundScore[]) {
    const completedRound: GameRound = {
      id: crypto.randomUUID(),
      roundNumber: session.currentRound,
      scores,
    };

    setSession("rounds", (rounds) => [...rounds, completedRound]);

    setSession({
      currentRound: session.currentRound + 1,
    });

    return persist();
  }

  function completeGame() {
    setSession({
      status: "complete",
    });

    return persist();
  }

  return {
    session,
    startGame,
    replaceSession,
    completeRound,
    completeGame,
    save: persist,
  };
}

export type SessionStore<TState> = ReturnType<typeof createSessionStore<TState>>;
