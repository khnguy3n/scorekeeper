import type { GameSession } from "./gameSession";
import type { Player } from "./player";
import type { GameRound } from "./round";

export interface Standing {
  playerId: string;
  rank: number;
  totalScore: number;
  isTied: boolean;
}

const buildTotals = (players: Player[], rounds: GameRound[]) => {
  const totals = new Map(players.map((player) => [player.id, 0]));

  for (const round of rounds) {
    for (const entry of round.scores) {
      const { playerId, score } = entry;
      totals.set(playerId, (totals.get(playerId) ?? 0) + score);
    }
  }

  return totals;
};

const sorting = (players: Player[], totals: Map<string, number>, isLowToHigh: boolean) => {
  return players
    .map((player) => ({
      playerId: player.id,
      playerName: player.name,
      totalScore: totals.get(player.id) ?? 0,
    }))
    .sort((a, b) => (isLowToHigh ? a.totalScore - b.totalScore : b.totalScore - a.totalScore));
};

const buildStandings = (sorted: { playerId: string; playerName: string; totalScore: number }[]) => {
  return sorted.map((standing, index, all) => {
    const previous = all[index - 1];

    const rank = previous && previous.totalScore === standing.totalScore ? index : index + 1;

    return {
      ...standing,
      rank,
      isTied: all.some(
        (other) => other.playerId !== standing.playerId && other.totalScore === standing.totalScore,
      ),
    };
  });
};

export function calculateByLowestScore(session: GameSession): Standing[] {
  const { players, rounds } = session;
  const totals = buildTotals(players, rounds);
  const sorted = sorting(players, totals, true);

  return buildStandings(sorted);
}

export function calculateByHighestScore(session: GameSession): Standing[] {
  const { players, rounds } = session;
  const totals = buildTotals(players, rounds);
  const sorted = sorting(players, totals, false);

  return buildStandings(sorted);
}
