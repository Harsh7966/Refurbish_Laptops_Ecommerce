import { useEffect } from "react"
import { UseContext } from "../../storage/auth";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { WebLoader } from "../../components/webLoader";
import { FaHome } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const CustomerQuery = () => {

    const { tokenAuthorization } = UseContext();
    const { getAllCustomerQueries, query, isLoading, filterdata } = UseContext();

    const deleteData = async (id) => {
        const response = await fetch(`http://localhost:1000/api/admin/customer-query/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: tokenAuthorization
            }
        })

        if (response.status === 200) {
            const msg = await response.json();
            getAllCustomerQueries();
            toast.success(msg.msg);
        } else {
            const msg = await response.json();
            toast.error(msg.msg);
        }
    }

    useEffect(() => {
        getAllCustomerQueries();
    }, [])


    // Show loading spinner until filter data is fetched
    if (isLoading || filterdata === null) {
        return <WebLoader />;
    }


    return (
        <>
        <br />
            <br/>
            <div className="container Table">
                <h1 className="adminPageHeading">Customer Queries </h1>
                <br />
                <div className="adminHeading">
                <Link to={`/admin`} className="adminHomeBtn">
                        <button className="btn btn-warning "><FaHome /> Admin Home</button>
                    </Link> &nbsp; &nbsp;   
                </div>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            query.map((currentQuery, index) => {

                                return <tr key={index}>
                                    <td>{currentQuery.cName}</td>
                                    <td>{currentQuery.cEmail}</td>
                                    <td>{currentQuery.cPhone}</td>
                                    <td>{currentQuery.cMessage}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteData(currentQuery._id)}><RiDeleteBin6Fill /> </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}