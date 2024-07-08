import { useState } from "react";
import axios from "axios";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";

export const AddProduct = () => {

    const { tokenAuthorization } = UseContext();

    const [product, setProduct] = useState({
        pName: "",
        pBrand: "",
        pProcessor: "",
        pUsage: "",
        pDescription: "",
        pPrice: 0,
        pStock: 0,
        pWarranty: 0,
    });

    const [pImage, setpImage] = useState(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleUpload = (e) => {
        setpImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(product);

        const formData = new FormData();
        formData.append("pImage", pImage);
        formData.append("pName", product.pName);
        formData.append("pBrand", product.pBrand);
        formData.append("pProcessor", product.pProcessor);
        formData.append("pUsage", product.pUsage);
        formData.append("pDescription", product.pDescription);
        formData.append("pPrice", product.pPrice);
        formData.append("pStock", product.pStock);
        formData.append("pWarranty", product.pWarranty);

        try {
            const response = await axios.post(
                "http://localhost:1000/api/admin/products/addProduct",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: tokenAuthorization,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.msg); // Use response.data.msg
            } else {
                toast.error(response.data.msg); // Use response.data.msg
            }
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <>
        <br />
            <br/>
            <div className="container Table card">
                <h1 className="adminPageHeading">Add Product</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter product name" onChange={handleChange} name="pName" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Brand</label>
                        {/* <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter brand name" onChange={handleChange} name="pBrand" required/> */}

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pBrand" onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Apple">Apple</option>
                            <option value="Dell">Dell</option>
                            <option value="Hp">Hp</option>
                            <option value="Lenovo">Lenovo</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Processor</label>
                        {/* <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter processor name" onChange={handleChange} name="pProcessor" required /> */}

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pProcessor" onChange={handleChange} required>
                            <option value=""></option>
                            <option value="i3">i3</option>
                            <option value="i5">i5</option>
                            <option value="i7">i7</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Usage</label>
                        {/* <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter usage" onChange={handleChange} name="pUsage" required /> */}

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pUsage" onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Basic">Basic</option>
                            <option value="Business">Business</option>
                            <option value="Graphic">Graphic</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                            Description
                        </label>
                        <textarea
                            name="pDescription"
                            cols="30"
                            rows="10"
                            placeholder="Enter Description About Product"
                            className="form-control"
                            id="formGroupExampleInput2"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Price</label>
                        <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter Price" onChange={handleChange} name="pPrice" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                        <input type="file" className="form-control" id="formGroupExampleInput2" placeholder="Select Image" onChange={handleUpload} name="pImage" accept="file/*" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Stock</label>
                        <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="Enter Stock" onChange={handleChange} name="pStock" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Warranty</label>
                        <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="Product Warranty" onChange={handleChange} name="pWarranty" required />
                    </div>
                    <br />
                    <div className="mb-3">
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
