import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Remove Navigate from import statement
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiTimerFlashLine } from "react-icons/ri";
import { IoMdCheckboxOutline, IoMdContact } from "react-icons/io";
import { IoPricetagsSharp } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdLocationOn, MdShoppingCart } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { WebLoader } from "../../components/webLoader";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { UseContext } from "../../storage/auth";

export const ProductDetails = () => {
    const { addToCart, getProductInCart, getInCart, buyItNow, isUserLogin, userID, removeProductFromLS, decreaseQuantity, increaseQuantity, tokenAuthorization, productData } = UseContext();
    const navigate= useNavigate();
    const params = useParams();
    const [details, setDetails] = useState(null);
    const [grandTotal, setGrandTotal] = useState(1);
    const [order, setOrder] = useState({
        oPhone: "",
        oName: "",
        oPincode: "",
        oState: "",
        oCity: "",
        oAddress: ""
    });

    const productDetails = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/user/product-details/${params.pToken}`, {
                method: "GET"
            });

            if (response.ok) {
                const detailsData = await response.json();
                setDetails(detailsData);
            } else {
                throw new Error("Failed to fetch product details");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        productDetails();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productData) {
                toast.error("Your cart is empty");
                return;
            }
    
            for (const key in order) {
                if (!order[key]) {
                    toast.error("Please fill in all the required fields");
                    return;
                }
            }
    
            const response = await fetch("http://localhost:1000/api/user/order-placed/buyItNow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify({ order, productData })
            });
    
            if (response.status===200) {
                const data = await response.json();
                toast.success(data.msg);
                navigate("/myorders");
            }else{
                const errorData = await response.json(); // Parse error response
                throw new Error(errorData.msg); // Throw error with message from server
            }
    
        } catch (err) {
            console.error("Error in handleSubmit:", err); // Log detailed error
            toast.error("Something went wrong. Please try again."); // Notify user of generic error
        }
    };
    
    if (!details) {
        return <WebLoader />;
    }

    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(details.pImage?.data?.data || []))
    );

    const productBase64String = btoa(
        String.fromCharCode(...new Uint8Array(productData[1]?.data?.data || []))
    );

    return (
        <>
            <br />
            <section className="content">
                <article className="demo-area">
                    <div className="productDetails ">
                        <div className="pImg col-lg-6 col-md-6">
                            <img src={`data:image/png;base64,${base64String}`} alt="Product Img" width="100%" height="550px" />
                        </div>
                        <div className="pInfo col-lg-6 col-md-6">
                            <div className="pDetailsTopData">
                                <Link to="/"><p >HOME  &nbsp;</p></Link> / <Link to="/category/filterData/fresharrival"><p> &nbsp; NEWARRIVALS</p></Link>
                            </div>

                            <p >{details.pBrand}</p>
                            <h2>{details.pDescription}</h2>
                            <br />
                            <h3><FaIndianRupeeSign /> {details.pPrice}</h3>
                            <h6>Shipping calculated at checkout</h6>
                            <br />
                            <p><RiTimerFlashLine /> Warranty Upto {details.pWarranty} Years</p>
                            <p><IoPricetagsSharp /> <LiaRupeeSignSolid />300 Off On Prepaid Order</p>
                            <p><IoMdCheckboxOutline /> On Site Support</p>
                            <p><IoPricetagsSharp /> EMI Available At 0 Down Payment</p>
                            <br />

                            <div>
                                <button className="addtocart btn btn-dark button button-2" onClick={() => addToCart(details.pToken, details.pImage, details.pDescription, details.pPrice, details.pStock)}><MdShoppingCart /> ADD TO CART</button>
                            </div>
                            <div>
                                {isUserLogin ? (
                                    <a className="button " href="#popup1">
                                        <button className="addtocart btn btn-warning" onClick={() => buyItNow(details.pToken, details.pImage, details.pDescription, details.pPrice, details.pStock)}><AiFillThunderbolt /> BUY IT NOW</button>
                                    </a>
                                ) : (
                                    <button className="addtocart btn btn-warning" onClick={() => toast.error("Please log in to place an order.")}><AiFillThunderbolt /> BUY IT NOW</button>
                                )}
                            </div>

                            {isUserLogin && (
                                <div id="popup1" className="overlay ">
                                    <div className="popup ">
                                        <h2><img src="/webLogo1.png" width="55px" />Gorefurbo</h2>
                                        <a className="close" href="#">&times;</a>
                                        <div className="content">
                                            <form onSubmit={handleSubmit}>
                                                <h4><span className="icon"><IoMdContact /></span> Contact Details</h4>
                                                <fieldset className="material">
                                                    <input type="number" placeholder="Enter contact phone number" autoComplete="off" required width="500px" name="oPhone" onChange={handleChange} />
                                                    <label htmlFor="phone">Phone Number*</label>
                                                </fieldset>

                                                <br />
                                                <br />

                                                <h4><span className="icon"><MdLocationOn /></span> Delivery Location</h4>
                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter your full name" autoComplete="off" required name="oName" onChange={handleChange} />
                                                    <label htmlFor="name">Full Name*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="number" placeholder="Enter pincode" autoComplete="off" required name="oPincode" onChange={handleChange} />
                                                    <label htmlFor="pincode">Pincode*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter State" autoComplete="off" required name="oState" onChange={handleChange} />
                                                    <label htmlFor="state">State*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter City" autoComplete="off" required name="oCity" onChange={handleChange} />
                                                    <label htmlFor="city">City*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter Address" autoComplete="off" required name="oAddress" onChange={handleChange} />
                                                    <label htmlFor="address">Address*</label>
                                                </fieldset>
                                                <br />
                                                <br />

                                                <h4><span className="icon"><BsFillBoxSeamFill /> </span> Order Summary</h4>
                                                <table className="responsive-table container">
                                                    <thead>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Description</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Link to={`/user/product-details/${productData[0]}`}>
                                                                    <img src={`data:image/png;base64, ${productBase64String}`} alt="Product Image" width="70px" />
                                                                </Link>
                                                            </td>
                                                            <td className="dDescriptionPopup">
                                                                <Link to={`/user/product-details/${productData[0]}`}>
                                                                    {productData[2]}
                                                                </Link>
                                                            </td>
                                                            <td><LiaRupeeSignSolid /> {productData[3]}</td>
                                                            <td>
                                                                <td>
                                                                    <span>Qty: {grandTotal}</span>
                                                                </td>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <hr />

                                                <div className="text-end placeOrderBtn">
                                                    <h6>Total Amount: <FaRupeeSign /> {productData[3]}</h6>
                                                    <button type="submit">Place Order</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </article>
            </section>
            <ToastContainer /> {/* Toast container */}
        </>
    );
};

export default ProductDetails;


