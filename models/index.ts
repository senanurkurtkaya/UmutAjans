import * as z from "zod";

export const Service = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string(),
  icon: z.string(),
  published: z.boolean(),
});