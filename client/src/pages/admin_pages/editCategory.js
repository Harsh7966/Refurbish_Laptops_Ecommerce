import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";

export const EditCategory = () => {

    const {tokenAuthorization}= UseContext();
    const [category, setCategory] = useState({
        cName: "",
        cDescription: "",
    });

    const params = useParams();

    const getCategoryById = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/category/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("Category Data", data);
                setCategory(data);
            } else {
                const data = await response.json();
                console.log("Error", data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCategoryById();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCategory({
            ...category,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:1000/api/admin/category/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(category)
            });

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
            }
            else {
                const msg = await response.json();
                toast.error(msg.msg);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <br />
            <br/>
            <div className="container Table card">
                <h1 className="adminPageHeading">Edit Category Details</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Category Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" required autoFocus onChange={handleChange} name="cName" value={category.cName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
                        <textarea name="cDescription" cols="30" rows="10" placeholder="Enter Description" className="form-control" id="formGroupExampleInput2" onChange={handleChange} required value={category.cDescription}></textarea>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

