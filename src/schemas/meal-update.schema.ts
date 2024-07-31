import { z } from "zod";

export const updateMealBodySchema = z.object({
  name: z.string().optional().optional(),
  description: z.string().optional(),
  date_time: z.string().optional(),
  is_diet: z.boolean().optional(),
});
