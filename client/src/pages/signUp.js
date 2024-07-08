import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UseContext } from "../storage/auth";
import { toast } from "react-toastify";

export const SignUp = () => {

    const { tokenstoreinLS } = UseContext();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1000/api/user/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            if (response.status === 200) {
                const msg = await response.json()
                
                toast.success(msg.msg);
                
                // Here call the function for storing token in the browser local storage
                tokenstoreinLS(msg.token);

                navigate("/login");
            }
            else if (response.status === 404) {
                const msg = await response.json()
               
                toast.error(msg.msg);
            }
            else if (response.status === 401) {
                const msg = await response.json()

                toast.error(msg);
            }
        } catch (error) {
            console.log("Error:", error);
        }

    }



    return (
        <>
        
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <p>Create your new account</p>
                    <div className="input-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            value={user.name}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={user.email}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            onChange={handleChange}
                            value={user.phone}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={user.password}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="bottom-text">
                        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                    </div>
                </form>
            </div>

        </>
    )
}
