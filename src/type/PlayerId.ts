import { z } from "zod";

export const PlayerId = z.string().min(1);
