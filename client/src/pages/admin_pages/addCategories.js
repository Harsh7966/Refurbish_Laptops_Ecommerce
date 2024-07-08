
import React, { useState } from "react";
import {toast} from "react-toastify";
import { UseContext } from "../../storage/auth";

export const AddCategories = () => {

    const{tokenAuthorization}= UseContext();
    const [category, setCategory] = useState({
        cName: "",
        cDescription:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response= await fetch("http://localhost:1000/api/admin/category/addCategory",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(category)
            })

            if(response.status===200){
                const msg= await response.json();
                toast.success(msg.msg);
            }else{
                const msg= await response.json();
                toast.error(msg.msg);
            }
        }catch(err){
            console.log(err);
        }
    };

    return (
        <>
        <br />
            <br/>
        <div className="container Table card">
            <h1 className="adminPageHeading">Add Categories</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        Category Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Enter Category Name"
                        onChange={handleChange}
                        name="cName"
                    />
                </div>
                <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                            Description
                        </label>
                        <textarea
                            name="cDescription"
                            cols="30"
                            rows="10"
                            placeholder="Enter Description About Category"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};
