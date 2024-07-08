import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";

export const EditProduct = () => {
    const params = useParams();
    const [data, setData] = useState({
        pName: "",
        pBrand: "",
        pProcessor: "",
        pUsage: "",
        pDescription: "",
        pPrice: "",
        pStock: "",
        pWarranty: "",
    });
    const { tokenAuthorization } = UseContext();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await fetch(`http://localhost:1000/api/admin/products/${params.id}`, {
                    method: 'GET', // This is the default, could be omitted
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: tokenAuthorization
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData);
                } else {
                    toast.error("Failed to fetch product details");
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch product details");
            }
        };

        getProductById();
    }, [params.id, tokenAuthorization]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:1000/api/admin/products/infoUpdate/${params.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify(data)
            });

            if (response.status===200) {
                const msg= await response.json();
                console.log(msg.msg);
                toast.success(msg.msg);
            } else {
                const msg= await response.json();
                toast.error(msg.msg);
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };


    // const base64String = pImage ? btoa(String.fromCharCode(...new Uint8Array(pImage.data.data))) : "";


    return (
        <>
        <br />
            <br/>
            <div className="container Table card">
                <h1 className="adminPageHeading">Edit Product Details</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter product name" onChange={handleChange} name="pName" value={data.pName} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Brand</label>
                        {/* <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter brand name" onChange={handleChange} name="pBrand" required/> */}

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pBrand" onChange={handleChange} value={data.pBrand}required>
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

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pProcessor" onChange={handleChange} value={data.pProcessor} required>
                            <option value=""> </option>
                            <option value="i3">i3</option>
                            <option value="i5">i5</option>
                            <option value="i7">i7</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Usage</label>
                        {/* <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter usage" onChange={handleChange} name="pUsage" required /> */}

                        <select type="text" className="form-control" id="formGroupExampleInput" name="pUsage" onChange={handleChange} value={data.pUsage}required>
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
                            value={data.pDescription}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Price</label>
                        <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter Price" onChange={handleChange} name="pPrice" value={data.pPrice} required />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                        <input type="file" className="form-control" id="formGroupExampleInput2" placeholder="Select Image" onChange={handleUpload} name="pImage" accept="file/*" required />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Stock</label>
                        <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="Enter Stock" onChange={handleChange} name="pStock" value={data.pStock} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Warranty</label>
                        <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="Product Warranty" onChange={handleChange} name="pWarranty" value={data.pWarranty} required />
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
