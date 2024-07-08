// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import {Link} from "react-router-dom";
// import axios from "axios";
// import { UseContext } from "../../storage/auth";

// export const AllUsers = () => {

//     const {tokenAuthorization}= UseContext();
//     const [data, setData]= useState([]);

//     const getUsersData = async() =>{
//         try{
//             axios.get("http://localhost:1000/api/admin/users", {
//                 method: "GET",
//                 headers: {
//                     Authorization: tokenAuthorization
//                 }
//             })
//                 .then((res) => setData(res.data))
//                 .catch((err) => console.log(err, "It has an error"));
//         }catch(err){
//             console.log(err);
//         }
//     }

//     useEffect(()=>{
//         getUsersData();
//     }, []);

//     console.log(data);

//     // Delete function
//     const deleteData= async(id) =>{
//         const response= await fetch(`http://localhost:1000/api/admin/users/delete/${id}`,{
//             method: "DELETE",
//             headers:{
//                 "Content-Type": "application/json"
//             }
//         })

//         if(response.status===200){
//             const msg= await response.json();

//             // sweetalert code
//             Swal.fire({
//                 title: msg.msg,
//                 text: 'Do you want to continue',
//                 icon: 'success',
//                 confirmButtonText: 'Cool'
//               })

//               getUsersData();
//         }
//     }

//     return (
//         <>
//             <div className="container Table">
//                 <h1>Users Details</h1>
//                 <br />

//                 <table className="responsive-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             data.map((currentProduct, index) => {
//                                 const base64String= btoa(
//                                     String.fromCharCode(...new Uint8Array(currentProduct.image.data.data))
//                                 );
//                                 return <tr key={index}>
//                                     <td>
//                                         <img src={`data: image/png;base64, ${base64String}`} alt="Product Image" width="50px"/>
//                                     </td>                                    
//                                     <td>{currentProduct.name}</td>
//                                     <td>{currentProduct.email}</td>
//                                     <td>{currentProduct.phone}</td>
//                                     <td>
//                                         <Link to={`/admin/product/${currentProduct._id}/editProduct`}>
//                                             <button className="btn btn-success"> <MdEdit /> Edit</button>
//                                         </Link>
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-danger" onClick={() => deleteData(currentProduct._id)}><MdDelete /> Delete</button>
//                                     </td>
//                                 </tr>
//                             })
//                         }
//                     </tbody>
//                 </table>

//             </div>
//         </>
//     )
// }


import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { UseContext } from "../../storage/auth";
import { toast } from "react-toastify";
import { SlideBar } from "../../components/slideBar";
import { WebLoader } from "../../components/webLoader";
import { FaHome } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const AllUsers = () => {
    const { tokenAuthorization, isLoading } = UseContext();
    const [users, setUsers] = useState([]);
    const [filterdata, setFilterdata] = useState(null); // Initialize filterdata as null


    const getUsersData = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const userData = await response.json();
                setUsers(userData);
                console.log(userData);
                setFilterdata(userData);
            }
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };
    useEffect(() => {
        getUsersData();
    }, []);

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
                getUsersData();
            }
            else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Show loading spinner until filter data is fetched
    if (isLoading || filterdata === null) {
        return <WebLoader />;
    }

    return (
        <div className="container Table">
            <br />
            <br/>
            <h1 className="adminPageHeading">Users Details</h1>
            <br />

            <div className="adminHeading">
                <Link to={`/admin`} className="adminHomeBtn">
                    <button className="btn btn-warning "><FaHome /> Admin Home</button>
                </Link> &nbsp; &nbsp;
            </div>

            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {

                            return <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link to={`/admin/users/${user._id}/edit`}>
                                        <button className="btn btn-success"><MdEdit /> </button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteData(user._id)}><RiDeleteBin6Fill /> </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    );
};

