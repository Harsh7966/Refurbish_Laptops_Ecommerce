import axios from "axios";
import { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link, NavLink, useParams } from "react-router-dom";
import { WebLoader } from "../../components/webLoader";
import { LuListFilter } from "react-icons/lu";
import { BiArrowBack } from "react-icons/bi";

export const Fresharrival = () => {
    const params = useParams();

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

    const [filterdata, setFilterdata] = useState(null);
    // const { isLoading } = UseContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [category, setCategory] = useState([]);
    const [details, setDetails] = useState([]);
    const [selectedSubMenu, setSelectedSubMenu] = useState({}); // State to store selected submenu for each category

    const getFilteredProducts = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/user/category/filterData/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const filterData = await response.json();
                console.log("filteredDATA", filterData);
                setFilterdata(filterData);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    }

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
        getFilteredProducts();
        getAllCategory();
    }, [params.id])

    const handleSubMenuChange = (submenuId) => {
        setSelectedSubMenu(prevState => ({
            ...prevState,
            [selectedCategory]: submenuId // Update selected submenu for the current category
        }));
    };



    const getAllProducts = async () => {
        try {
            const response= await fetch("http://localhost:1000/api/user/products",{
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            });

            const productData= await response.json();

            if(response.status===200){
                console.log("All_Product", productData);
                setProduct(productData);
                                    setIsLoading(false); // Set loading state to false after data is fetched
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // const getAllProducts = () => {
        //     axios
        //         .get("http://localhost:1000/api/user/products")
        //         .then((res) => {
        //             setProduct(res.data);
        //             console.log("fresh_arrival_data", product)
        //             setIsLoading(false); // Set loading state to false after data is fetched
        //         })
        //         .catch((err) => {
        //             console.log(err, "It has an error");
        //             setIsLoading(false); // Set loading state to false in case of error
        //         });
        // };

        getAllProducts();
    }, []);

    // If isLoading is true or product is empty, show the loading spinner
    if (isLoading || product.length === 0) {
        return <WebLoader />;
    }

    return ( 
        <>
            <div className="filter-products-page">
                <div className="mainContent">
                    <div className="toggle-filter-container">
                        <button className="toggle-filter-button nav__link BottomMenutoggle" onClick={toggleSidebar} type="button">
                            <p><LuListFilter /> FILTER AND SORT</p>
                        </button>

                        <div className={`sidebar ${sidebarOpen ? 'filtersidebarshow' : ''}`} id='sidebar'>
                            <div className="menu">
                                <h1>Filters</h1>
                            </div>
                            <hr></hr>
                            <ul className="menu">
                                {category.map((currentCategory, index) => (
                                    <div key={index}>
                                        <div onClick={() => toggleDropdown(currentCategory.cName, currentCategory.cToken)}>
                                            <Link to="#" onClick={() => getDDdetails(currentCategory.cToken)}> {currentCategory.cName}</Link>
                                            {selectedCategory === currentCategory.cName && dropdownOpen && (
                                                <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                                                    {details.map((currentDD, index) => (
                                                        <Link to={`/category/filterData/${currentDD._id}`} key={index} className="filters">
                                                            <p>
                                                                <input
                                                                    type="radio"
                                                                    checked={selectedSubMenu[currentCategory.cName] === currentDD._id}
                                                                    onChange={() => handleSubMenuChange(currentDD._id)}
                                                                />
                                                                {currentDD.ddName}
                                                            </p>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                <button className="close-btn" onClick={toggleSidebar}><BiArrowBack /> Back</button>
                            </ul>
                        </div>
                    </div>


                    <div className={`productFilters card ${sidebarOpen ? 'open' : ''}`}>
                        <h2>Filters</h2>
                        <ul className="menu">
                            {category.map((currentCategory, index) => (
                                <div key={index}>
                                    <div onClick={() => toggleDropdown(currentCategory.cName, currentCategory.cToken)}>
                                        <Link to="#" onClick={() => getDDdetails(currentCategory.cToken)}> {currentCategory.cName}</Link>
                                        {selectedCategory === currentCategory.cName && dropdownOpen && (
                                            <ul className="submenu" onClick={(e) => e.stopPropagation()}>
                                                {details.map((currentDD, index) => (
                                                    <Link to={`/category/filterData/${currentDD._id}`} key={index}>
                                                        <p>
                                                            <input
                                                                type="radio"
                                                                checked={selectedSubMenu[currentCategory.cName] === currentDD._id}
                                                                onChange={() => handleSubMenuChange(currentDD._id)}
                                                            />
                                                            {currentDD.ddName}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </ul>
                    </div>

                    <br />
                    <div className="column Newarrivle">
                    <div className="freshArrivalheading">
                        <h1>Fresh Arrivals</h1>
                    </div>
                    <div className="productsData container">
                        {product.map((currentProduct, index) => {
                            const base64String = btoa(
                                String.fromCharCode(...new Uint8Array(currentProduct.pImage.data.data))
                            );

                            return (
                                <div className="productCard" key={index}>
                                    <NavLink to={`/user/product-details/${currentProduct.pToken}`}>
                                        <div className="card-img">
                                            <img
                                                src={`data: image/png;base64, ${base64String}`}
                                                alt="Product Img"
                                                width="100%"
                                                height="250px"
                                            />
                                        </div>
                                        <div className="card-details">
                                            <div className="product-name">
                                                <h4>{currentProduct.pBrand}</h4>
                                            </div>
                                            <div className="product-price">
                                                <h4>
                                                    <FaIndianRupeeSign /> {currentProduct.pPrice}
                                                </h4>
                                            </div>
                                            <div className="product-description">
                                                <p className="fw-light">{currentProduct.pDescription}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
            </div>

        </>
    );
};
