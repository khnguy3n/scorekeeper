import { createStore, reconcile } from "solid-js/store";

import type { GameSession } from "../games/shared/gameSession";
import type { RoundScore, GameRound } from "../games/shared/round";

export function createSessionStore<TState>(initialSession: GameSession<TState>) {
  const [session, setSession] = createStore(initialSession);

  function startGame() {
    setSession({
      status: "in-progress",
    });
  }

  function replaceSession(next: GameSession<TState>) {
    setSession(reconcile(next));
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
  }

  function completeGame() {
    setSession({
      status: "complete",
    });
  }

  return {
    session,
    startGame,
    replaceSession,
    completeRound,
    completeGame,
  };
}

export type SessionStore<TState> = ReturnType<typeof createSessionStore<TState>>;
