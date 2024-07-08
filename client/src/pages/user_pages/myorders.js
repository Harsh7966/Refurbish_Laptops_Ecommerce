import React, { useEffect, useState } from "react";
import { UseContext } from "../../storage/auth";
import { BsFillBoxFill } from "react-icons/bs";
import { MdCancel, MdLogin } from "react-icons/md";
import { WebLoader } from "../../components/webLoader";
import { MdLiveHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const MyOrders = () => {
    const { getallmyOrders, myorders, cancleOrder, isUserLogin } = UseContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Start loading
                setIsLoading(true);

                // Fetch data
                await getallmyOrders();

                // Data fetched, stop loading
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle error if necessary
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <br />
            <h1><BsFillBoxFill /> My Orders</h1>
            <br />
            {
                isUserLogin ?
                    (<>

                        {isLoading ? (
                            // Display loading spinner if data is still loading
                            <WebLoader />
                        ) : (
                            <table className="responsive-table container">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myorders.map((order, orderIndex) => (
                                        order.oDetails.map((product, productIndex) => {
                                            const base64String = btoa(
                                                String.fromCharCode(...new Uint8Array(product.oImage.data.data))
                                            );

                                            const status = product.oStatus;
                                            return (
                                                <tr key={`${orderIndex}-${productIndex}`}>
                                                    <td>
                                                        <img src={`data:image/png;base64,${base64String}`} alt="Product Image" width="70px" />
                                                    </td>
                                                    <td>{product.oDescription}</td>
                                                    <td><LiaRupeeSignSolid /> {product.oPrice}</td>
                                                    <td>{product.oQuantity}</td>
                                                    <td>{product.oStatus}</td>
                                                    <td>
                                                        {
                                                            status === "Order Confirmed" ?

                                                                <button onClick={() => cancleOrder(order._id, product._id)}><MdCancel /> Cancel</button>
                                                                :
                                                                <Link to="/corporate-enquiries"><button> Help <MdLiveHelp /></button></Link>
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>)
                    :
                    (<>
                        <div className="freshArrivalbtn text-center ">
                            <Link to="/login">
                                <button ><h6><MdLogin /> LOGIN</h6></button>
                            </Link>
                        </div>
                    </>)
            }

        </>
    );
};

export default MyOrders;

