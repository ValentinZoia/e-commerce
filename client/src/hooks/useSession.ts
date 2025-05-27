import { useState, useEffect } from "react";
import useFetch from "./useFetch";

interface User {
    id:string;
    username:string;
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
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(true)
const {get} = useFetch(URL)



useEffect(() => {
const getSession = async ()=>{
    try {
        setLoading(true)
        const response = await get<User>( {
        headers: {
          
        },
        credentials: 'include',
      });

      if(response.error)throw new Error('No session');
      if(response.data) setUser(response.data)
        setLoading(response.isLoading);
      
    } catch (error) {
        console.error(error);
        setUser(null);
        setLoading(false)
    } finally{
        setLoading(false);
    }
}
getSession();
}, []);

    
    return{
        user,
        isAuthenticated: !!user,
        loading,
    }
}

export default useSession;