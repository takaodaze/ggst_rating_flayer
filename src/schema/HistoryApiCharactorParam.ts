import { z } from "zod";

export const HistoryApiCharactorParam = z.union([
  z.literal("SO"),
  z.literal("AN"),
]);
