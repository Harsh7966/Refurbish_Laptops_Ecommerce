import axios from "axios";
import { useEffect, useState } from "react";
import { MdLogin, MdOutlineLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { UseContext } from "../storage/auth";
import { FaUserTie } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";

export const Profile = () => {

    const { tokenAuthorization, isUserLogin } = UseContext();
    const [data, userData] = useState("");

    const getUserData = async () => {
        try {
            const response= await fetch("http://localhost:1000/api/user/profile",{
                method:"GET",
                headers:{
                    "Authorization":tokenAuthorization,
                }
            });

            if(response.status===200){
                const data= await response.json();
                userData(data);
            }

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        isUserLogin ? (

            <>
                <div className="login-container">
                    <form className="login-form">
                        <h1><FaUserTie /> Profile</h1>
                        <p>View your profile details</p>
                        <div className="input-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={data.name}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={data.phone}
                                required
                            />
                        </div>
                        <NavLink to="/logout">
                            <button className="profile-logout">Logout</button>
                        </NavLink>
                    </form>
                </div>

            </>
        )
            : (

                <>
                    <div className="freshArrivalbtn text-center ">
                        <Link to="/login">
                            <button ><h6><MdLogin /> LOGIN</h6></button>
                        </Link>
                    </div>
                </>
            )
    )
}

