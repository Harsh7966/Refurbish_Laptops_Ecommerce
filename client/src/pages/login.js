import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { UseContext } from "../storage/auth";

export const Login = () => {

    const { tokenstoreinLS, emailstoreinLS, userData } = UseContext();
    console.log(userData);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
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

        const response = await fetch("http://localhost:1000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if (response.status === 200) {
            const msg = await response.json();

            toast.success(msg.msg);

            // Here call the function for storing userID in the browser local storage
            emailstoreinLS(msg.userID);

            // Here call the function for storing token in the browser local storage
            tokenstoreinLS(msg.token);

            if (msg.isAdmin === true) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
        else if (response.status === 404) {
            const msg = await response.json();

            toast.error(msg.msg);
        }
    }

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p>Please login to your account</p>
                    <div className="input-group">
                        <input
                            type="email"
                            id="username"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={user.email}
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
                    <button type="submit">Login</button>
                    <div className="bottom-text">
                        <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
                        <p><NavLink to="/forgot-password">Forgot password?</NavLink></p>
                    </div>
                </form>
            </div>

        </>
    )
}