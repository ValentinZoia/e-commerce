import { z } from "zod";

export const createZodError = () => {
  const schema = z.object({ name: z.string().min(3) });
  const result = schema.safeParse({ name: "a" });
  if (!result.success) return result.error;
  throw new Error("Test Zod error failed");
};
