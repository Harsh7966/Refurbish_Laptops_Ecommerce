import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";

export const EditUsers = () => {
    const{tokenAuthorization}= UseContext();

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Here we use params for get data from the URL.
    const params = useParams();

    const getUsersData = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/users/${params.id}`, {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: tokenAuthorization
                }

            });

            if (response.status === 200) {
                const userData = await response.json();
                setData(userData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsersData();
    }, []);

    console.log(data);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:1000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(data)
            });

            if(response.status===200){
                const msg= await response.json();
                toast.success(msg.msg);
            }
            else{
                const msg= await response.json();
                toast.error(msg.msg);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <br />
            <br/>
            <div className="container Table card">
                <h1 className="adminPageHeading">Update User Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="formGroupExampleInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" required autoFocus onChange={handleChange} name="name" value={data.name} />
                    </div>
                    <div className="mb-3">
                        <label for="formGroupExampleInput" className="form-label">Email</label>
                        <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" required autoFocus onChange={handleChange} name="email" value={data.email} />
                    </div>
                    <div className="mb-3">
                        <label for="formGroupExampleInput" className="form-label">Phone</label>
                        <input type="phone" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" required autoFocus onChange={handleChange} name="phone" value={data.phone} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
};