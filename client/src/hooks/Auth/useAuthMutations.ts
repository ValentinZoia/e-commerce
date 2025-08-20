import { login, logout, deleteAdmin } from "@/data/Auth/auth.api";
import { LoginFormValues } from "@/lib/zod-schemas/loginSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuthMutations() {
  const queryClient = useQueryClient();

  const doLogin = useMutation({
    mutationFn: (credentials: LoginFormValues) => login(credentials),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
  const doLogout = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
  const doDeleteAdmin = useMutation({
    mutationFn: (username: string) => deleteAdmin(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
  return {
    doLogin,
    doLogout,
    doDeleteAdmin,
  };
}
