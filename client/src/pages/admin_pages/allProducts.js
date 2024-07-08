// import { useEffect, useState } from "react";
// import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { UseContext } from "../../storage/auth";
// import { WebLoader } from "../../components/webLoader";
// import { FaHome } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AllProducts = () => {
//     const { tokenAuthorization, isLoading } = UseContext();
//     const [product, setProduct] = useState([]);
//     // const [filterdata, setFilterdata] = useState(null);
//     const [imgpreview, setImgpreview] = useState(null);
//     const [UpdatedImg, setUpdatedImg]= useState(null);
//     const [currentpId, setCurrentpId] = useState(null);

//     useEffect(() => {
//         getAllProducts();
//     }, []);

//     const getAllProducts = async () => {
//         try {
//             const response= await fetch("http://localhost:1000/api/admin/products",{
//                 method: "GET",
//                 headers: {
//                     "Content-Type":"application/json",
//                     Authorization: tokenAuthorization
//                 }
//             });

//             const productData= await response.json();

//             if(response.status===200){
//                 console.log("All_Product", productData);
//                 setProduct(productData);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     const deleteProduct = async (id) => {
//         try {
//             const response = await axios.delete(`http://localhost:1000/api/admin/products/delete/${id}`, {
//                 headers: {
//                     Authorization: tokenAuthorization
//                 }
//             });
//             if (response.status === 200) {
//                 toast.success(response.data.msg);
//                 getAllProducts();
//             } else {
//                 toast.error(response.data.msg);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to delete product");
//         }
//     };

//     const handleImgPreview = (imgPath, pid) => {
//         setImgpreview(imgPath);
//         setCurrentpId(pid);
//     };

//     const handleUpload= (e) =>{
//         setUpdatedImg(e.target.files[0]);
//     }

//     const handleSubmit= async(e) =>{
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("pImage", UpdatedImg);

//         try {
//             const result = await axios.patch(
//                 `http://localhost:1000/api/admin/product/updatepImg/${currentpId}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: tokenAuthorization,
//                     },
//                 }
//             );

//             if (result.status === 200) {
//                 toast.success(result.data.msg);
//                 // Assuming you want to reload data after successful update
//                 getAllProducts();
//             } else {
//                 toast.error(result.data.msg);
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("Error occurred while submitting the form");
//         }
//     }

    
//     if (isLoading || product.length==0 === null) {
//         return <WebLoader />;
//     }

//     return (
//         <>
//         <br />
//             <br/>
//             <div className="container Table">
//                 <h1 className="adminPageHeading">All Products</h1>
//                 <br />
//                 <div className="adminContant adminHeading">
//                     <Link to={`/admin`} className="adminHomeBtn">
//                         <button className="btn btn-warning ">
//                             <FaHome /> Admin Home
//                         </button>
//                     </Link>{" "}
//                     &nbsp; &nbsp;
//                     <Link to={`/admin/products/addProduct`}>
//                         <button className="btn btn-primary">
//                             <MdAdd /> Add Product
//                         </button>
//                     </Link>
//                 </div>
                
//                 <table className="responsive-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Product Name</th>
//                             <th>Brand</th>
//                             <th>Processor</th>
//                             <th>Usage</th>
//                             <th>Description</th>
//                             <th>Price</th>
//                             <th>Stock</th>
//                             <th>Warranty</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {product.map((currentProduct, index) => {
//                             const base64String = btoa(
//                                 String.fromCharCode(
//                                     ...new Uint8Array(currentProduct.pImage.data.data)
//                                 )
//                             );
//                             return (
//                                 <tr key={index}>
//                                     <td>
//                                         <button
//                                             type="button"
//                                             className="Imgbutton"
//                                             onClick={() =>
//                                                 handleImgPreview(
//                                                     `data: image/png;base64, ${base64String}`,
//                                                     currentProduct._id
//                                                 )
//                                             }
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#staticBackdrop"
//                                         >
//                                             <img
//                                                 src={`data: image/png;base64, ${base64String}`}
//                                                 alt="Product Image"
//                                                 width="50px"
//                                             />
//                                         </button>
//                                     </td>
//                                     <td>{currentProduct.pName}</td>
//                                     <td>{currentProduct.pBrand}</td>
//                                     <td>{currentProduct.pProcessor}</td>
//                                     <td>{currentProduct.pUsage}</td>
//                                     <td>{currentProduct.pDescription}</td>
//                                     <td>{currentProduct.pPrice}</td>
//                                     <td>{currentProduct.pStock}</td>
//                                     <td>{currentProduct.pWarranty}</td>
//                                     <td>
//                                         <Link
//                                             to={`/admin/products/${currentProduct._id}/editProduct`}
//                                         >
//                                             <button className="btn btn-success">
//                                                 <MdEdit />
//                                             </button>
//                                         </Link>
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() =>
//                                                 deleteProduct(currentProduct._id)
//                                             }
//                                         >
//                                             <RiDeleteBin6Fill />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             <div
//                 className="modal fade"
//                 id="staticBackdrop"
//                 data-bs-backdrop="static"
//                 data-bs-keyboard="false"
//                 tabIndex="-1"
//                 aria-labelledby="staticBackdropLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-40" id="staticBackdropLabel">
//                                 Image Preview
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             ></button>
//                         </div>
//                         <div className="modal-body">
//                             <img src={imgpreview} alt="Product Image" width="200px" />
//                             <div className="mb-3">
//                                 <br />
//                                 <form onSubmit={handleSubmit}>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="formGroupExampleInput2"
//                                         placeholder="Select Image"
//                                         onChange={handleUpload}
//                                         name="pImage"
//                                         accept="file/*"
//                                         required
//                                     />
//                                     <div className="modal-footer">
//                                         <button
//                                             type="button"
//                                             className="btn btn-secondary"
//                                             data-bs-dismiss="modal"
//                                         >
//                                             Close
//                                         </button>
//                                         <button type="submit" className="btn btn-primary">
//                                             Update
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };






import { useEffect, useState } from "react";
import { MdAdd, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { WebLoader } from "../../components/webLoader";
import { FaHome } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

export const AllProducts = () => {
    const { tokenAuthorization, isLoading } = UseContext();
    const [products, setProducts] = useState([]);
    const [imgPreview, setImgPreview] = useState(null);
    const [updatedImg, setUpdatedImg] = useState(null);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            const productData = await response.json();

            if (response.status === 200) {
                console.log("All_Product", productData);
                setProducts(productData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:1000/api/admin/products/delete/${id}`, {
                headers: {
                    Authorization: tokenAuthorization
                }
            });
            if (response.status === 200) {
                toast.success(response.data.msg);
                getAllProducts();
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete product");
        }
    };

    const handleImgPreview = (imgData, pid) => {
        const blob = new Blob([new Uint8Array(imgData)], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImgPreview(url);
        setCurrentProductId(pid);
    };

    const handleUpload = (e) => {
        setUpdatedImg(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("pImage", updatedImg);

        try {
            const result = await axios.patch(
                `http://localhost:1000/api/admin/product/updatepImg/${currentProductId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: tokenAuthorization,
                    },
                }
            );

            if (result.status === 200) {
                toast.success(result.data.msg);
                getAllProducts();
            } else {
                toast.error(result.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred while submitting the form");
        }
    };

    if (isLoading || products.length === 0) {
        return <WebLoader />;
    }

    return (
        <>
            <br />
            <br />
            <div className="container Table">
                <h1 className="adminPageHeading">All Products</h1>
                <br />
                <div className="adminContant adminHeading">
                    <Link to={`/admin`} className="adminHomeBtn">
                        <button className="btn btn-warning ">
                            <FaHome /> Admin Home
                        </button>
                    </Link>{" "}
                    &nbsp; &nbsp;
                    <Link to={`/admin/products/addProduct`}>
                        <button className="btn btn-primary">
                            <MdAdd /> Add Product
                        </button>
                    </Link>
                </div>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Processor</th>
                            <th>Usage</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Warranty</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <button
                                            type="button"
                                            className="Imgbutton"
                                            onClick={() =>
                                                handleImgPreview(
                                                    product.pImage.data.data,
                                                    product._id
                                                )
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            {/* This is the main change */}
                                            <img
                                                src={URL.createObjectURL(new Blob([new Uint8Array(product.pImage.data.data)], { type: 'image/png' }))}
                                                alt="Product Image"
                                                width="50px"
                                            />
                                        </button>
                                    </td>
                                    <td>{product.pName}</td>
                                    <td>{product.pBrand}</td>
                                    <td>{product.pProcessor}</td>
                                    <td>{product.pUsage}</td>
                                    <td>{product.pDescription}</td>
                                    <td>{product.pPrice}</td>
                                    <td>{product.pStock}</td>
                                    <td>{product.pWarranty}</td>
                                    <td>
                                        <Link
                                            to={`/admin/products/${product._id}/editProduct`}
                                        >
                                            <button className="btn btn-success">
                                                <MdEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteProduct(product._id)
                                            }
                                        >
                                            <RiDeleteBin6Fill />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-40" id="staticBackdropLabel">
                                Image Preview
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <img src={imgPreview} alt="Product Image" width="200px" />
                            <div className="mb-3">
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="formGroupExampleInput2"
                                        placeholder="Select Image"
                                        onChange={handleUpload}
                                        name="pImage"
                                        accept="file/*"
                                        required
                                    />
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


