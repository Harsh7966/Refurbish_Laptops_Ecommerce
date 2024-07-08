import { useState } from "react";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

export const CorporateEnquiries = () => {

    const { tokenAuthorization, isUserLogin } = UseContext();
    const [message, setMessage] = useState({
        cName: "",
        cEmail: "",
        cPhone: "",
        cMessage: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setMessage({
            ...message,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:1000/api/user/corporate-enquiries", {
                method: "POST",
                headers: {
                    Authorization: tokenAuthorization,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            });

            if (response.status === 200) {
                const msg = await response.json();
                console.log(msg.msg);
                toast.success(msg.msg);
            }
            else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        isUserLogin ?
            (
                <>
                    <div className="login-container">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h1>Get In Touch</h1>
                            <p>If you have any query you can comment us, By filling this form.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="cName"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    required
                                // value={userData.name}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="cEmail"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                // value={userData.email}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="number"
                                    id="phone"
                                    name="cPhone"
                                    placeholder="Phone"
                                    onChange={handleChange}
                                    required
                                // value={userData.phone}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="message"
                                    name="cMessage"
                                    placeholder="Enter Message"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">SEND MESSAGE</button>
                        </form>
                    </div>
                </>
            ) :
            <>
                <h1 className="cartParagraph"><MdOutlineConnectWithoutContact /> Get In Touch</h1>
                <br/>
                <div className="freshArrivalbtn text-center ">
                    <Link to="/login">
                        <button ><h6><MdLogin /> LOGIN</h6></button>
                    </Link>
                </div>
            </>
    )
}


