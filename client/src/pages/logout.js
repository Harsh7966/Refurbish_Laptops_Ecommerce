import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UseContext } from "../storage/auth";

export const Logout= () =>{

    const {userLogout}= UseContext()
    const navigation= useNavigate();

        useEffect(()=>{
            userLogout();
        },[userLogout])

        
        navigation("/login");
}