import { z } from "zod";
import { DuelData } from "./Schema/DuelData";

export const selectNewDuel = (
  curr: z.infer<typeof DuelData>[],
  prev: z.infer<typeof DuelData>[],
) => {
  const newDuel = curr.filter((currentData) => {
    const isNew = prev.every(
      (prevData) =>
        prevData.duelDate.getTime() !== currentData.duelDate.getTime(),
    );
    return isNew;
  });
  return newDuel;
};
