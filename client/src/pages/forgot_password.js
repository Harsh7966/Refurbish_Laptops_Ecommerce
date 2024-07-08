import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {

    const navigate= useNavigate();

    const [updatePassword, setupdatePassword] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setupdatePassword({
            ...updatePassword,
            [name]: value
        })
    }


    const handleSubmit= async(e) =>{
        e.preventDefault();
        try{
            const response= await fetch("http://localhost:1000/api/user/forgot-password",{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatePassword)
            })

            if(response.status===200){
                const msg= await response.json();
                toast.success(msg.msg);
                navigate("/login");
            }else if(response.status===404){
                const msg= await response.json();
                toast.error(msg.msg);
            }else{
                const msg= await response.json();
                toast.error(msg);
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Reset Your Password</h2>
                    <p></p>
                    <div className="input-group" >
                        <input
                            type="email"
                            id="username"
                            name="email"
                            placeholder="Enter registered email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Set new password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                </form>
            </div>

        </>
    )
}