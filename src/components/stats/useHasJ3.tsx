import type { StatsValues } from "types";

function useHasJ3(j3: StatsValues | undefined): j3 is StatsValues {
  if (!j3) return false;
  return typeof j3 === "object";
}

export default useHasJ3;
