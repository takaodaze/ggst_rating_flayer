import { z } from "zod";
import { CharactorCode } from "./CharactorCode";

export const Subscribe = z.object({
  playerId: z.string().min(1),
  character: CharactorCode,
});
