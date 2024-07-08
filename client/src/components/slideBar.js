import { NavLink, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";

export const SlideBar = () => {
    return (
        <>

            <aside>
                <h3>Admin Panel</h3>
                <NavLink to="/admin"><FaHome /> Home</NavLink><br />
                <NavLink to="/admin/users"><FaUsers /> Users</NavLink><br />
                <NavLink to="/admin/products"><FaBoxOpen /> Products</NavLink><br />
                <NavLink to="/admin/categories"><BiSolidCategory /> Categories</NavLink><br />
                <NavLink to="/admin/dropdown"><IoMdArrowDropdown /> Dropdown</NavLink><br />
                <NavLink to="/admin/customer-query"><FaMessage /> Customer Queries</NavLink><br />
                <NavLink to="/admin/orders"><MdOutlineProductionQuantityLimits /> Orders</NavLink><br />
                <NavLink to="/logout"><button className="btn btn-dark logoutBtn"><MdLogout /> Logout</button></NavLink>
            </aside> 

            

            <Outlet />
        </>
    )
}