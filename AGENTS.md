# Scorekeeper

## Commands

- Use npm; `package-lock.json` is authoritative. Install with `npm ci`.
- Run the app with `npm run dev`; run the production/typecheck gate with `npm run build` (`tsc -b` before `vite build`).
- There are currently no test, lint, or formatter scripts.

## Architecture

- This is a single-package SolidJS + TypeScript + Vite app. The browser entrypoint is `src/index.tsx`; `src/App.tsx` is the UI root.
- Put generic session types and reusable game primitives in `src/games/shared`. Put each game's state, rules, and definition in `src/games/<game-id>`, then register it in `src/games/catalog.ts`.
- Keep `src/sessions/sessionStore.ts` game-agnostic: it owns session lifecycle and round recording, not scoring, standings, round-count, or winner rules.
- Persist sessions through the Dexie repository in `src/sessions/sessionRepository.ts`; do not substitute `localStorage`.
- `createSessionStore` persists lifecycle mutations but not its initial value. After form submission creates a session store, await `store.save()` once; also await mutation methods so write failures reach the UI.
- UI pages must not invent placeholder players or create a session during page initialization. Create the session from submitted new-game form data only.
- Use `import type` for TypeScript-only imports; `verbatimModuleSyntax` is enabled.

## Five Crowns

- Five Crowns has exactly 11 rounds and lowest total score wins. Keep these rules in its game module, not in generic stores or UI pages.
- Its registered catalog ID is `five-crowns`; resolve games through `src/games/catalog.ts` rather than duplicating game metadata in the UI.
