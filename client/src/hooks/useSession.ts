import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { RootState, useAppDispatch } from "@/store/store";
import { createSession, deleteSession} from "@/store/states";
import { useSelector } from "react-redux";
import { User } from "@/types";


interface ApiResponse {
    user:User;
}

interface UseSessionReturn {
    user: User | null
    isAuthenticated:boolean;
    loading:boolean
}


const ADMIN_URL = import.meta.env.API_ADMIN_URL || "/api/admin";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const URL = `${API_BASE_URL}${ADMIN_URL}`;



const useSession = (): UseSessionReturn => {
const dispatch = useAppDispatch();
const {user, isAuthenticated} = useSelector((state: RootState) => state.auth)
const [loading, setLoading] = useState<boolean>(true)
const {get} = useFetch(URL)




useEffect(() => {
const getSession = async ()=>{
    try {
        setLoading(true)
        const response = await get<ApiResponse>( {
        headers: {
          
        },
        credentials: 'include',
      });

      if(response.error)throw new Error('No session');
      if(response.data) dispatch(createSession(response.data.user))
          
          
    
        setLoading(response.isLoading);
      
    } catch (error) {
        console.error(error);
        dispatch(deleteSession());
        setLoading(false)
    } finally{
        setLoading(false);
    }
}
getSession();
}, []);

    
    return{
        user,
        isAuthenticated,
        loading,
    }
}

export default useSession;