import React, { useEffect, useState } from "react";
import { BiCategory, BiSearch, BiSolidCart, BiSolidDownArrow, BiSolidUser } from "react-icons/bi";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export const BottomMenuBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [category, setCategory] = useState([]);
    const [details, setDetails] = useState([]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDropdown = (category) => {
        if (selectedCategory === category) {
            setDropdownOpen(!dropdownOpen);
        } else {
            setSelectedCategory(category);
            setDropdownOpen(true);
        }
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
        setSelectedCategory('');
    };

    const getDDdetails = async (cToken) => {
        console.log("categoryToken", cToken);
        try {
            const response = await fetch(`http://localhost:1000/api/user/category/${cToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const ddDetails = await response.json();
                console.log("ddDetails", ddDetails);
                setDetails(ddDetails);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/user/category", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const categoryData = await response.json();
                setCategory(categoryData);
                console.log(categoryData);
            } else {
                const msg = await response.json();
                console.log(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <nav className="nav bottomNavBar">
            <Link to="/" className="nav__link">
                <i className="material-icons nav__icon"><FaHome /></i>
                <span className="nav__text">Home</span>
            </Link>
            <Link to="/profile" className="nav__link">
                <i className="material-icons nav__icon"><BiSolidUser /></i>
                <span className="nav__text">Profile</span>
            </Link>
            <Link to="/search" className="nav__link">
                <i className="material-icons nav__icon"><BiSearch /></i>
                <span className="nav__text">Search</span>
            </Link>
            <Link to="/cart" className="nav__link">
                <i className="material-icons nav__icon"><BiSolidCart /></i>
                <span className="nav__text">Cart</span>
            </Link>
            <button type="button" className="nav__link BottomMenutoggle" onClick={toggleSidebar}>
                <i className="material-icons nav__icon"><CgMenuLeftAlt /></i> Menu
            </button>
            <div className={`sidebar ${sidebarOpen ? 'sidebarshow' : ''}`} id='sidebar'>

                <div className="menu">
                    <h1>MENU</h1>
                </div>
                <hr></hr>
                <ul className="menu">
                    {category.map((currentCategory, index) => (
                        <div key={index}>
                            <li onClick={() => toggleDropdown(currentCategory.cName, currentCategory.cToken)}>
                                <Link to="#" onClick={() => getDDdetails(currentCategory.cToken)}>  {currentCategory.cName}</Link>
                                {selectedCategory === currentCategory.cName && dropdownOpen && (
                                    <ul className="submenu">
                                        {
                                            details.map((currentDD, index) => (
                                                <Link to={`/category/filterData/${currentDD._id}`} key={index}>
                                                    <li>{currentDD.ddName}</li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                )}
                            </li>
                            <hr></hr>
                        </div>
                    ))}
                    <li><Link to="/clearance-sale">Clearance Sale</Link></li>
                    <hr></hr>
                    <li><Link to="/corporate-enquiries">Corporate Enquiries</Link></li>
                    <hr></hr>
                    <button className="close-btn" onClick={toggleSidebar}><BiArrowBack /> Back</button>
                </ul>
            </div>
            
            <Link to="/category/filterData/fresharrival" className="nav__link">
                <i className="material-icons nav__icon"><BiCategory /></i>
                <span className="nav__text">Shope</span>
            </Link>
        </nav>
    );
};

export default BottomMenuBar;



