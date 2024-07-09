import { useEffect, useState } from "react"
import { UseContext } from "../../storage/auth";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRupeeSign } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TbReceiptTax } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { MdLogin } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { toast } from "react-toastify";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { WebLoader } from "../../components/webLoader";

// ... (Your existing imports)

export const Cart = () => {
    const { getProductInCart, getInCart, isUserLogin, userID, removeProductFromLS, decreaseQuantity, increaseQuantity, tokenAuthorization } = UseContext();

    const navigate = useNavigate();

    const length = getInCart.length;

    const [grandTotal, setGrandTotal] = useState(0);
    const [order, setOrder] = useState({
        oPhone: "",
        oName: "",
        oPincode: "",
        oState: "",
        oCity: "",
        oAddress: ""
    })

    useEffect(() => {
        getProductInCart();
        console.log("getInCart", getInCart);
    }, []);


    // Calculate the grand total whenever the cart items change
    useEffect(() => {
        let total = 0;
        getInCart.forEach(currentProduct => {
            if (userID === currentProduct[4]) {
                total += currentProduct[5] * currentProduct[3]; // Quantity * Price
            }
        });
        setGrandTotal(total);
    }, [getInCart, userID]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setOrder({
            ...order,
            [name]: value,
        })
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Check if any products are in the cart
    //         if (getInCart.length === 0) {
    //             toast.error("Your cart is empty");
    //             return;
    //         }

    //         // Validate the order details before proceeding
    //         for (const key in order) {
    //             if (!order[key]) {
    //                 toast.error("Please fill in all the required fields");
    //                 return;
    //             }
    //         }

    //         // Chunk the data and send multiple requests
    //         const chunkSize = 10; // Adjust the chunk size as needed
    //         const chunks = [];
    //         // console.log("chunks",chunks);

    //         for (let i = 0; i < getInCart.length; i += chunkSize) {
    //             chunks.push(getInCart.slice(i, i + chunkSize));
    //         }
    //         for (const chunk of chunks) {
    //             const response = await fetch("http://localhost:1000/api/user/order-placed", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: tokenAuthorization
    //                 },
    //                 body: JSON.stringify({ order, localData: chunk })
    //             });

    //             // Handle response as needed
    //             const data = await response.json();

    //             // Loading effect
    //             if (!response) {
    //                 return <WebLoader />
    //             }

    //             if (response.ok) {
    //                 toast.success(data.msg);

    //                 for(let i=0; i<length; i++){
    //                     if(userID===getInCart[i][4]){
    //                         removeProductFromLS("cart", getInCart[i][4]);
    //                     }
    //                     else{
    //                         toast.error("product not deleted");
    //                     }
    //                 }
    //             } else {
    //                 toast.error(data.msg);
    //             }
    //         }
    //     } catch (err) {
    //         toast.error("Something went wrong");
    //         console.error(err);
    //     }
    // };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if any products are in the cart
            if (getInCart.length === 0) {
                toast.error("Your cart is empty");
                return;
            }

            // Validate the order details before proceeding
            for (const key in order) {
                if (!order[key]) {
                    toast.error("Please fill in all the required fields");
                    return;
                }
            }

            // Chunk the data and send multiple requests
            const chunkSize = 10; // Adjust the chunk size as needed
            const chunks = [];

            for (let i = 0; i < getInCart.length; i += chunkSize) {
                chunks.push(getInCart.slice(i, i + chunkSize));
            }

            for (const chunk of chunks) {
                const response = await fetch("http://localhost:1000/api/user/order-placed", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: tokenAuthorization
                    },
                    body: JSON.stringify({ order, localData: chunk })
                });

                // Handle response as needed
                const data = await response.json();

                // Loading effect
                if (!response) {
                    return <WebLoader />;
                }

                if (response.ok) {
                    toast.success(data.msg);

                    // Remove all cart data of the particular user from local storage
                    const updatedCart = getInCart.filter(item => item[4] !== userID);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));

                    // Refresh cart data after removing items from local storage
                    getProductInCart();
                    navigate("/myorders");
                } else {
                    toast.error(data.msg);
                }
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };


    return (
        <>
            {isUserLogin ? (
                <>

                    {
                        length > 0 ? (
                            <>

                                <h1 className="cartParagraph"><IoIosCart /> CART</h1>
                                <div className="cPara">
                                    <p>You are eligible for free shipping <FcShipped />.</p>
                                </div>
                                <table className="responsive-table container">
                                    {/* <thead>
                            <tr>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Total Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead> */}
                                    <tbody>
                                        {
                                            getInCart.map((currentProduct, index) => {
                                                if (userID === currentProduct[4]) {
                                                    const base64String = btoa(
                                                        String.fromCharCode(...new Uint8Array(currentProduct[1].data.data))
                                                    );

                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <Link to={`/user/product-details/${currentProduct[0]}`}>
                                                                    <img src={`data: image/png;base64, ${base64String}`} alt="Product Image" width="70px" />
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/user/product-details/${currentProduct[0]}`}>
                                                                    {currentProduct[2]}
                                                                </Link>
                                                            </td>

                                                            <td><LiaRupeeSignSolid /> {currentProduct[3]}</td>

                                                            {/* <td><LiaRupeeSignSolid /> {(currentProduct[5] * currentProduct[3])}</td> */}
                                                            <td>
                                                                <button onClick={() => decreaseQuantity(index, currentProduct[3])} className="quantity-btn"><RiSubtractLine /></button>
                                                                <span> {currentProduct[5]} </span>
                                                                <button onClick={() => increaseQuantity(index, currentProduct[0], currentProduct[1], currentProduct[2], currentProduct[3], currentProduct[7])} className="quantity-btn"><IoMdAdd /></button>
                                                            </td>

                                                            <td>
                                                                <button className="removeFromCart" onClick={() => removeProductFromLS(index, currentProduct[0])}>Remove <MdRemoveShoppingCart /></button>
                                                            </td>
                                                            <br />
                                                            <br />
                                                            <br />
                                                        </tr>

                                                    );
                                                } else {
                                                    console.log("data not found");
                                                    return null; // Return null for clarity, you might want to handle this case differently
                                                }

                                            })
                                        }

                                    </tbody>
                                </table>

                                <br />
                                <div className="freshArrivalbtn text-end box container">
                                    <p ><TbReceiptTax /> Taxes and <FaShippingFast /> shipping calculated at checkout</p>
                                </div>

                                {/* Pop up payment page button*/}
                                <div className="freshArrivalbtn box container text-end">
                                    <a className="button " href="#popup1">
                                        <button className="checkout "><h6><BsFillBagCheckFill /> CHECK OUT - <FaRupeeSign /> {grandTotal}</h6></button>
                                    </a>
                                </div>

                                <div id="popup1" className="overlay ">
                                    <div className="popup ">
                                        <h2><img src="/webLogo1.png" width="55px" />Gorefurbo</h2>
                                        <a className="close" href="#">&times;</a>
                                        <div className="content">
                                            <form onSubmit={handleSubmit}>
                                                <h4><span className="icon"><IoMdContact /></span> Contact Details</h4>
                                                <fieldset className="material">
                                                    <input type="number" placeholder="Enter contact phone number" autocomplete="off" required width="500px" name="oPhone" onChange={handleChange} />
                                                    <label for="phone">Phone Number*</label>
                                                </fieldset>

                                                <br />
                                                <br />

                                                <h4><span className="icon"><MdLocationOn /></span> Delivery Location</h4>
                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter you full name" autocomplete="off" required name="oName" onChange={handleChange} />
                                                    <label for="name">Full Name*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="number" placeholder="Enter pincode" autocomplete="off" required name="oPincode" onChange={handleChange} />
                                                    <label for="name">Pincode*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter State" autocomplete="off" required name="oState" onChange={handleChange} />
                                                    <label for="name">State*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter City" autocomplete="off" required name="oCity" onChange={handleChange} />
                                                    <label for="name">City*</label>
                                                </fieldset>

                                                <fieldset className="material">
                                                    <input type="text" placeholder="Enter Address" autocomplete="off" required name="oAddress" onChange={handleChange} />
                                                    <label for="name">Address*</label>
                                                </fieldset>
                                                <br />
                                                <br />

                                                {/* Order summary in checkout popup page */}
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
                                                        {
                                                            getInCart.map((currentProduct, index) => {
                                                                if (userID === currentProduct[4]) {
                                                                    const base64String = btoa(
                                                                        String.fromCharCode(...new Uint8Array(currentProduct[1].data.data))
                                                                    );

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <Link to={`/user/product-details/${currentProduct[0]}`}>
                                                                                    <img src={`data: image/png;base64, ${base64String}`} alt="Product Image" width="70px" />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="dDescriptionPopup">
                                                                                <Link to={`/user/product-details/${currentProduct[0]}`}>
                                                                                    {currentProduct[2]}
                                                                                </Link>
                                                                            </td>

                                                                            <td><LiaRupeeSignSolid /> {currentProduct[3]}</td>

                                                                            <td>
                                                                                <span>Qty: {currentProduct[5]} </span>
                                                                            </td>
                                                                        </tr>

                                                                    );
                                                                } else {
                                                                    console.log("data not found");
                                                                    return null; // Return null for clarity, you might want to handle this case differently
                                                                }

                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                                <hr />

                                                <div className="text-end placeOrderBtn">
                                                    <h6>Total Amount: <FaRupeeSign /> {grandTotal}</h6>
                                                    <button type="submit">Place Order</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                            :
                            (
                                <>
                                    <div className="freshArrivalbtn text-center ">
                                        <div className="column-container">
                                            <div className="column">
                                                <br />
                                                <img src="/empty_cart.webp" width="200px" />
                                            </div>
                                            <div className="column">
                                                <h3>Your cart is empty</h3>
                                                <p>Add some items to your cart and start shopping!</p>
                                            </div>
                                            <div className="column">
                                                <Link to="/">
                                                    <button><HiMiniShoppingBag /> Shop Now</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            )
                    }

                </>
            )
                :
                (
                    <>
                        <div className="freshArrivalbtn text-center ">
                            <Link to="/login">
                                <button ><h6><MdLogin /> LOGIN</h6></button>
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    );
};





















// import { useEffect, useState } from "react"
// import { UseContext } from "../../storage/auth";
// import { MdRemoveShoppingCart } from "react-icons/md";
// import { RiSubtractLine } from "react-icons/ri";
// import { IoMdAdd } from "react-icons/io";
// import { LiaRupeeSignSolid } from "react-icons/lia";
// import { FaRupeeSign } from "react-icons/fa";
// import { IoIosCart } from "react-icons/io";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import { TbReceiptTax } from "react-icons/tb";
// import { FaShippingFast } from "react-icons/fa";
// import { FcShipped } from "react-icons/fc";
// import { MdLogin } from "react-icons/md";
// import { IoMdContact } from "react-icons/io";
// import { MdLocationOn } from "react-icons/md";
// import { BsFillBoxSeamFill } from "react-icons/bs";
// import { HiMiniShoppingBag } from "react-icons/hi2";
// import { toast } from "react-toastify";
// import {loadStripe} from '@stripe/stripe-js';

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { WebLoader } from "../../components/webLoader";

// // ... (Your existing imports)

// export const Cart = () => {
//     const { getProductInCart, getInCart, isUserLogin, userID, removeProductFromLS, decreaseQuantity, increaseQuantity, tokenAuthorization } = UseContext();

//     const navigate = useNavigate();

//     const length = getInCart.length;

//     const [grandTotal, setGrandTotal] = useState(0);
//     const [order, setOrder] = useState({
//         oPhone: "",
//         oName: "",
//         oPincode: "",
//         oState: "",
//         oCity: "",
//         oAddress: ""
//     })

//     useEffect(() => {
//         getProductInCart();
//         console.log("getInCart", getInCart);
//     }, []);


//     // Calculate the grand total whenever the cart items change
//     useEffect(() => {
//         let total = 0;
//         getInCart.forEach(currentProduct => {
//             if (userID === currentProduct[4]) {
//                 total += currentProduct[5] * currentProduct[3]; // Quantity * Price
//             }
//         });
//         setGrandTotal(total);
//     }, [getInCart, userID]);

//     const handleChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;

//         setOrder({
//             ...order,
//             [name]: value,
//         })
//     }


//     const makePayment = async() =>{
//         const stripe = await loadStripe('pk_test_51PRIK1EW5BK3ySIAG6F0fcNZCYPSJmsW5NQIJRZRg6xDfMKNdzTzlN6CxOFQM1fmaCyBbsTUupa5OQoRTPLwTEEQ00zZkYwEO8');

//         const response= await fetch("http://localhost:1000/api/user/create_checkout_session",{
//             method: "POST",
//             headers:{
//                 "Content-Type":"application/json",
//                 Authorization:tokenAuthorization
//             },
//             body: JSON.stringify(getInCart),
//         });

//         const session= await response.json();

//         const result= stripe.redirectToCheckout({
//             sessionId: session.id
//         })

//         if(result.error){
//             console.log(result.error);
//         }
//     }


//     return (
//         <>
//             {isUserLogin ? (
//                 <>

//                     {
//                         length > 0 ? (
//                             <>

//                                 <h1 className="cartParagraph"><IoIosCart /> CART</h1>
//                                 <div className="cPara">
//                                     <p>You are eligible for free shipping <FcShipped />.</p>
//                                 </div>
//                                 <table className="responsive-table container">
                                    
//                                     <tbody>
//                                         {
//                                             getInCart.map((currentProduct, index) => {
//                                                 if (userID === currentProduct[4]) {
//                                                     const base64String = btoa(
//                                                         String.fromCharCode(...new Uint8Array(currentProduct[1].data.data))
//                                                     );

//                                                     return (
//                                                         <tr key={index}>
//                                                             <td>
//                                                                 <Link to={`/user/product-details/${currentProduct[0]}`}>
//                                                                     <img src={`data: image/png;base64, ${base64String}`} alt="Product Image" width="70px" />
//                                                                 </Link>
//                                                             </td>
//                                                             <td>
//                                                                 <Link to={`/user/product-details/${currentProduct[0]}`}>
//                                                                     {currentProduct[2]}
//                                                                 </Link>
//                                                             </td>

//                                                             <td><LiaRupeeSignSolid /> {currentProduct[3]}</td>

//                                                             {/* <td><LiaRupeeSignSolid /> {(currentProduct[5] * currentProduct[3])}</td> */}
//                                                             <td>
//                                                                 <button onClick={() => decreaseQuantity(index, currentProduct[3])} className="quantity-btn"><RiSubtractLine /></button>
//                                                                 <span> {currentProduct[5]} </span>
//                                                                 <button onClick={() => increaseQuantity(index, currentProduct[0], currentProduct[1], currentProduct[2], currentProduct[3], currentProduct[7])} className="quantity-btn"><IoMdAdd /></button>
//                                                             </td>

//                                                             <td>
//                                                                 <button className="removeFromCart" onClick={() => removeProductFromLS(index, currentProduct[0])}>Remove <MdRemoveShoppingCart /></button>
//                                                             </td>
//                                                             <br />
//                                                             <br />
//                                                             <br />
//                                                         </tr>

//                                                     );
//                                                 } else {
//                                                     console.log("data not found");
//                                                     return null; // Return null for clarity, you might want to handle this case differently
//                                                 }

//                                             })
//                                         }

//                                     </tbody>
//                                 </table>

//                                 <br />
//                                 <div className="freshArrivalbtn text-end box container">
//                                     <p ><TbReceiptTax /> Taxes and <FaShippingFast /> shipping calculated at checkout</p>
//                                 </div>

//                                 {/* Pop up payment page button*/}
//                                 <div className="freshArrivalbtn box container text-end">
//                                     <a className="button " href="#popup1">
//                                         <button className="checkout " onClick={makePayment}><h6><BsFillBagCheckFill /> CHECK OUT - <FaRupeeSign /> {grandTotal}</h6></button>
//                                     </a>
//                                 </div>

                               
//                             </>
//                         )
//                             :
//                             (
//                                 <>
//                                     <div className="freshArrivalbtn text-center ">
//                                         <div className="column-container">
//                                             <div className="column">
//                                                 <br />
//                                                 <img src="/empty_cart.webp" width="200px" />
//                                             </div>
//                                             <div className="column">
//                                                 <h3>Your cart is empty</h3>
//                                                 <p>Add some items to your cart and start shopping!</p>
//                                             </div>
//                                             <div className="column">
//                                                 <Link to="/">
//                                                     <button><HiMiniShoppingBag /> Shop Now</button>
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>

//                             )
//                     }

//                 </>
//             )
//                 :
//                 (
//                     <>
//                         <div className="freshArrivalbtn text-center ">
//                             <Link to="/login">
//                                 <button ><h6><MdLogin /> LOGIN</h6></button>
//                             </Link>
//                         </div>
//                     </>
//                 )
//             }
//         </>
//     );
// };

