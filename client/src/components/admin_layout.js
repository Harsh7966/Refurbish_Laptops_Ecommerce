import { useEffect, useState } from "react"; // Importing useState for managing loading state
import { UseContext } from "../storage/auth";
import { SlideBar } from "./slideBar";
import { NavLink, useNavigate } from "react-router-dom";
import { WebLoader } from "./webLoader";
import { FaBoxOpen, FaHome, FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { BiSolidCart } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

export const AdminLayout = () => {

    const navigate = useNavigate();
    const { userData, isLoading } = UseContext();
    // const [isLoading, setIsLoading] = useState(true); // State to manage loading
    // useEffect(() => {
    //     setIsLoading(true); // Set loading to true when component mounts
    //     // Simulate data loading (replace setTimeout with actual data fetching)
    //     setTimeout(() => {
    //         setIsLoading(false); // Set loading to false after data is loaded (replace this with your actual data fetching)
    //     }, 1000); // Simulate 2 seconds of loading time (replace this with your actual data fetching)
    // }, []);

    // If loading, show loading message
    if (isLoading) {
        return <WebLoader />;
    }

    // Once loading is complete, check if the user is not an admin and navigate accordingly
    if (!userData.isAdmin) {
        navigate("*"); // Redirect to home page or any other appropriate page
        return null; // Return null to prevent rendering of the component
    }

    // If user is an admin, render the admin layout
    return (
        <>
        <br />
            <br/>
        <h1><GrUserAdmin /> Admin Dashboard</h1>
            <div className="box ">
                {/* <div className="box1">
                    <SlideBar />
                </div> */}
                
                <div className="card">
                    <NavLink to="/admin/users"><h2><FaUsers /> Users</h2></NavLink><br />
                </div>
                <div className="card">
                    <NavLink to="/admin/products"><h2><FaBoxOpen /> Products</h2></NavLink><br />
                </div>
                <div className="card">
                    <NavLink to="/admin/categories"><h2><BiSolidCategory /> Categories</h2></NavLink><br />
                </div>
                <div className="card">
                    <NavLink to="/admin/dropdown"><h2><IoMdArrowDropdown /> Dropdown Menu</h2></NavLink><br />
                </div>
                <div className="card">
                    <NavLink to="/admin/customer-query"><h2><BiSolidMessageRoundedError /> Customer Queries</h2></NavLink><br />
                </div>
                <div className="card">
                    <NavLink to="/admin/allOrders"><h2><BiSolidCart /> Orders</h2></NavLink><br />
                </div>
            </div>
        </>
    );
}
