import { RootState } from "@/store/store"
import { capitalizeFirstLetter } from "@/utilities";
import { useSelector } from "react-redux"

const AdminPage = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  
    return (
    <div>Bienvenido {capitalizeFirstLetter(user?.username as string)}</div>
  )
}
export default AdminPage