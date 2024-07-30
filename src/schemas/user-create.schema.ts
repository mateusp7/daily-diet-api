import { z } from "zod";

export const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});