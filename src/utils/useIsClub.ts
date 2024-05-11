import type { Mode } from "types";

export default function useIsClub<T>(mode: Mode) {
  return (item: unknown): item is T => mode === "club";
}
