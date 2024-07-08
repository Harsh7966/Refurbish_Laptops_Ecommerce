import { useEffect, useState } from "react"
import { UseContext } from "../../storage/auth";
import { MdLiveHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { WebLoader } from "../../components/webLoader";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";


export const AllOrders = () => {
    const { getAllOrdersData, orders, orderDelivered, orderDelete } = UseContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Start loading
                setIsLoading(true);

                await getAllOrdersData();

                // Data fetched, stop loading
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle error if necessary
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    return (
        <>
        <br />
            <br/>
            <div className="container Table">
                <h1 className="adminPageHeading">All Orders</h1>
                <br />

                <div className="adminHeading">
                    <Link to={`/admin`} className="adminHomeBtn">
                        <button className="btn btn-warning "><FaHome /> Admin Home</button>
                    </Link> &nbsp; &nbsp;
                </div>
                <br/>

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
                                <th>Delivered</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, orderIndex) => (
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
                                                <button className="btn btn-success" onClick={() => orderDelivered(order._id, product._id)}><IoMdDoneAll /> </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => orderDelete(order._id, product._id)}><RiDeleteBin6Fill /> </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}