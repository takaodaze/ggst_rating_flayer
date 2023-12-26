import { z } from "zod";

export const PlayerName = z.string().min(1);
