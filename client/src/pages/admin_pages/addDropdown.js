import React, { useEffect, useState, useContext } from "react";
import { UseContext } from "../../storage/auth";
import axios from "axios";
import { toast } from "react-toastify";

export const AddDropdown = () => {
    const { getAllCategory, category, tokenAuthorization } = UseContext();

    const [ddImage, setDdImage] = useState(null);
    const [dd, setDD] = useState({
        ddName: "",
        cName: "",
    });

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDD({
            ...dd,
            [name]: value,
        });
    };

    const handleUpload = (e) => {
        setDdImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ddImage", ddImage);
        formData.append("ddName", dd.ddName);
        formData.append("cName", dd.cName);

        try {
            const result = await axios.post(
                "http://localhost:1000/api/admin/dropdown/addDropdown",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: tokenAuthorization
                    },
                }
            );

            if (result.status === 200) {
                toast.success(result.data.msg);
            } else {
                toast.error(result.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred while submitting the form");
        }
    };

    return (
        <>
        <br />
            <br/>
        <div className="container Table card">
            <h1 className="adminPageHeading">Dropdown Details</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fuel" className="form-label">Select Category</label>
                    <select className="form-control" id="formGroupExampleInput" name="cName" onChange={handleChange} required>
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
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Name" onChange={handleChange} name="ddName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                    <input type="file" className="form-control" id="formGroupExampleInput2" placeholder="Select Image" onChange={handleUpload} name="ddImage" accept="image/*" required />
                </div>
                <br />
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
};
