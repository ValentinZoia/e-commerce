import { RootState, useAppDispatch } from "@/store/store";
import { createSession, deleteSession } from "@/store/states";
import { useSelector } from "react-redux";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { verifySession } from "@/data/Auth/auth.api";

interface UseSessionReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useSession = (): UseSessionReturn => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const { data, isLoading, isError, isSuccess, isFetching, isPending } =
    useQuery({
      queryKey: ["session"],
      queryFn: () => verifySession(),
    });

  if (isSuccess) {
    dispatch(createSession(data.user));
  }

  if (isError) {
    dispatch(deleteSession());
  }

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isFetching || isPending,
  };
};

export default useSession;
