
import { useContext } from "react";
import AuthContext from "../Components/context/AuthContext";

const useAuthContext = () =>{
    return useContext(AuthContext)
}

export default useAuthContext;