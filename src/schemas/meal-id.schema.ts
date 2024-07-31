import { z } from "zod";

export const getMealByIdSchema = z.object({
  id: z.string().uuid(),
});
