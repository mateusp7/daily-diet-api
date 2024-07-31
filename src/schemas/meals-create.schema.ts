import { z } from "zod";

export const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date_time: z.string(),
  is_diet: z.boolean(),
});
