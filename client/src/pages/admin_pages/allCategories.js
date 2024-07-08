import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";
import { WebLoader } from "../../components/webLoader";
import { FaHome } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const Categories = () => {

    const { tokenAuthorization, isLoading } = UseContext();
    const [category, setCategory] = useState([]);
    const [filterdata, setFilterdata] = useState(null);

    const getAllCategory = async () => {
        const response = await fetch("http://localhost:1000/api/admin/category", {
            method: "GET",
            headers: {
                Authorization: tokenAuthorization
            }
        });

        if (response.status === 200) {
            const categoryData = await response.json();
            console.log("Data get", categoryData);
            setCategory(categoryData)
            setFilterdata(categoryData);
        }
        else {
            const categoryData = await response.json();
            console.log(categoryData);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/category/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
            })

            if (response.status === 200) {
                const msg = await response.json();

                toast.success(msg.msg);
                getAllCategory();

            }
            else {
                const msg = await response.json();
                toast.error(msg.msg);
            }

        } catch (err) {
            console.log(err);
        }
    }

    // Show loading spinner until filter data is fetched
    if (isLoading || filterdata === null) {
        return <WebLoader />;
    }

    return (
        <>
        <br />
            <br/>
            <div className="container Table">
                <h1 className="adminPageHeading">All Categories</h1>
                <br />
                <div className="adminContant adminHeading">
                <Link to={`/admin`} className="adminHomeBtn">
                        <button className="btn btn-warning "><FaHome /> Admin Home</button>
                    </Link> &nbsp; &nbsp;   
                    <Link to={`/admin/categories/addCategories`}>
                        <button className="btn btn-primary"><MdAdd /> Add Categories</button>
                    </Link>
                </div>


                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((currentCategory, index) => {
                                return <tr key={index}>
                                    <td>{currentCategory.cName}</td>
                                    <td>{currentCategory.cDescription}</td>
                                    <td>
                                        <Link to={`/admin/category/${currentCategory._id}/editCategory`}>
                                            <button className="btn btn-success"> <MdEdit /> </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteData(currentCategory._id)}><RiDeleteBin6Fill /> </button>
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


