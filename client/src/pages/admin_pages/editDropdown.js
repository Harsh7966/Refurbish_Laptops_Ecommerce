import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";

export const EditDropdown = () => {

    const { tokenAuthorization, getAllCategory, category } = UseContext();
    const [DD, setDD] = useState([]);

    const params = useParams();

    const getDropdownById = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/dropdown/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("DD Data", data);
                setDD(data);
            } else {
                const data = await response.json();
                console.log("Error", data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDropdownById();
        getAllCategory();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setDD({
            ...DD,
            [name]: value
        });
    }

    // const handleUpload = () => {

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:1000/api/admin/ddInfo/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(DD)
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
                <h1 className="adminPageHeading">Edit Dropdown Details</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fuel" className="form-label">Select Category</label>
                        <select className="form-control" id="formGroupExampleInput" name="cName" onChange={handleChange} required value={DD.cName}>
                            <option value="">Select category for the dropdown menu.....</option>
                            {
                                category.map((currentCategory, index) => (
                                    <option value={currentCategory.cName} key={index}>{currentCategory.cName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Name" onChange={handleChange} name="ddName" required value={DD.ddName} />
                    </div>
                    {/* <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                    <input type="file" className="form-control" id="formGroupExampleInput2" placeholder="Select Image" onChange={handleUpload} name="ddImage" accept="image/*" required />
                </div> */}
                    <br />
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

