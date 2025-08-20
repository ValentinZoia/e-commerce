import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuthMutations } from "@/hooks/Auth/useAuthMutations";
import { LoaderCircle, LogOut } from "lucide-react";

function LogoutButton() {
  const { doLogout } = useAuthMutations();

  const LogoutHanlder = async () => {
    try {
      await doLogout.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SidebarMenuButton
      tooltip="Logout"
      className="text-red-500 font-bold cursor-pointer hover:bg-transparent hover:text-red-400"
      onClick={LogoutHanlder}
    >
      {doLogout.isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut />
      )}

      <span>Logout</span>
    </SidebarMenuButton>
  );
}
export default LogoutButton;
