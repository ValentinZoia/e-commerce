import { generate } from "@/data/AI/ai.api";
import { useMutation } from "@tanstack/react-query";

export function useAIMutations() {
  const doGenerate = useMutation({
    mutationFn: (prompt: string) => generate(prompt),
    onSuccess: () => {},
  });

  return {
    doGenerate,
  };
}
