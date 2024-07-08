import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

export const Category = () => {

    const [details, setDetails] = useState([]);
    const [category, setCategory] = useState([]);


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
                getAllCategory();
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

    const getCategoryDetails = async (cToken) => {
        console.log("categoryToken", cToken);
        try {
            const response = await fetch(`http://localhost:1000/api/user/category/${cToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Handle response as needed
            if (response.status === 200) {
                const ddDetails = await response.json();
                console.log("ddDetails", ddDetails);
                setDetails(ddDetails);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <ul className="navbar-links">
                <div className=" categoryCard ">
                    <div className="category row text-center nav__food">
                        {
                            category.map((currentCategory, index) => (
                                <div className="categoryName col-lg-2 col-md-6 pb-3" key={index}>
                                    <li className="navbar-dropdown">
                                        <NavLink to="#" onMouseOver={() => getCategoryDetails(currentCategory.cToken)}>{currentCategory.cName}</NavLink>

                                        {/* Dropdown Logic */}
                                        <div className="dropdown"  >
                                            {
                                                details.map((currentDetails, index) => {
                                                    const base64String = btoa(
                                                        String.fromCharCode(...new Uint8Array(currentDetails.ddImage.data.data))
                                                    );
                                                    return (
                                                        <Link to={`/category/filterData/${currentDetails._id}`} key={index}>
                                                            <img src={`data: image/png;base64, ${base64String}`} alt="Product Img" width="100%" height="150px" />
                                                            <h6>{currentDetails.ddName}</h6>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>

                                    </li>
                                </div>
                            ))
                        }
                        <div className="categoryName col-lg-2 col-md-6 pb-3">
                            <li className="navbar-dropdown">
                                <NavLink to="/clearance-sale">CLEARANCE SALE</NavLink>
                            </li>
                        </div>
                        <div className="categoryName col-lg-2 col-md-6 pb-3">
                            <li className="navbar-dropdown">
                                <NavLink to="/corporate-enquiries">CORPORATE ENQUIRIES</NavLink>
                            </li>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    )
}


