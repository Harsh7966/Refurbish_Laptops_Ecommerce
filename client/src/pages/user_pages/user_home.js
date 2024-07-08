import { Link, NavLink } from "react-router-dom"
// import axios from "axios";
import { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { ContinousSlider } from "../../components/continousSlider";
import { Slider } from "../../components/homeTopSlider";
import { BrandBudget } from "../../components/brand&budget";
import { Testimonials } from "../../components/testimonial_slider";

export const UserHome = () => {

    const [product, setProduct] = useState([]);
    const [dell, setDell] = useState([]);
    const [hp, setHp] = useState([]);


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
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getDellLaptops = async () => {
        const response = await fetch(`http://localhost:1000/api/user/category/filterData/65cc8866264789916da18bd4`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const filterData = await response.json();

        if (response.status === 200) {
            console.log("AllDellLaptops", filterData);
            setDell(filterData);
        }
    }

    const getHpLaptops = async () => {
        const response = await fetch(`http://localhost:1000/api/user/category/filterData/65cbab3447f3a0198a40b59a`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const filterData = await response.json();

        if (response.status === 200) {
            console.log("AllHPLaptops", filterData);
            setHp(filterData);
        }
    }

    useEffect(() => {
        getAllProducts();
        getDellLaptops();
        getHpLaptops();
    }, [])



    return (
        <>
            {/* Home Top Slider */}
            <Slider />

            {/* Brand & Budget */}
            <BrandBudget />
            <br />

            {/* Fresh Arrivals */}
            <div className="freshArrivalheading">
                <h1>Fresh Arrivals</h1>
            </div>
            <div className=" productsData container-grid ">
                {
                    product.slice(0, 4).map((currentProduct, index) => {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(currentProduct.pImage.data.data))
                        );

                        return (
                            <div className=" productCard " key={index}>
                                <NavLink to={`/user/product-details/${currentProduct.pToken}`}>
                                    <div className="card-img">
                                        <img src={`data: image/png;base64, ${base64String}`} alt="Product Img" width="250px" height="250px" />
                                    </div>
                                    <div className="card-details">
                                        <div className="product-name">
                                            <h4>{currentProduct.pBrand}</h4>
                                        </div>
                                        <div className="product-price">
                                            <h4><FaIndianRupeeSign /> {currentProduct.pPrice}</h4>
                                        </div>
                                        <div className="product-description">
                                            <p className="fw-light">{currentProduct.pDescription}</p>
                                        </div>

                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div >
            <div className="freshArrivalbtn text-center ">
                <Link to="/category/filterData/fresharrival">
                    <button ><h6>VIEW ALL</h6></button>
                </Link>
            </div>
            <br />
            <br />
            <br />

            {/* Shop by Usage */}
            <div className="freshArrivalheading">
                <h1>Shop By Usage</h1>
            </div>
            <div className="usageCards productsData">
                <NavLink to="/category/filterData/65cbaab247f3a0198a40b458">
                    <img src="basic.webp" alt="basicCard" width="290px" />
                </NavLink>
                <NavLink to="/category/filterData/65cbab1147f3a0198a40b543">
                    <img src="business.webp" alt="basicCard" width="290px" />
                </NavLink>
                <NavLink to="/category/filterData/65cc8831264789916da18898">
                    <img src="gaming.webp" alt="basicCard" width="290px" />
                </NavLink>
            </div>
            <br />
            <br />
            <br />

            {/* Daily Usage Refurbished Laptops */}
            <div className="freshArrivalheading">
                <h1>Daily Usage Refurbished Laptops</h1>
            </div>

            <div className=" productsData container-grid">
                {
                    dell.slice(0, 8).map((currentProduct, index) => {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(currentProduct.pImage.data.data))
                        );

                        return (
                            <div className=" productCard " key={index}>
                                <NavLink to={`/user/product-details/${currentProduct.pToken}`}>
                                    <div className="card-img">
                                        <img src={`data: image/png;base64, ${base64String}`} alt="Product Img" width="250px" height="250px" />
                                    </div>
                                    <div className="card-details">
                                        <div className="product-name">
                                            <h4>{currentProduct.pBrand}</h4>
                                        </div>
                                        <div className="product-price">
                                            <h4><FaIndianRupeeSign /> {currentProduct.pPrice}</h4>
                                        </div>
                                        <div className="product-description">
                                            <p className="fw-light">{currentProduct.pDescription}</p>
                                        </div>

                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div >
            <div className="freshArrivalbtn text-center">
                <Link to="category/filterData/65cc8866264789916da18bd4">
                    <button ><h6>VIEW ALL</h6></button>
                </Link>
            </div>
            <br />
            <br />
            <br />

            {/* Hp Laptops */}
            <div className="freshArrivalheading">
                <h1>Refurbished HP Laptops</h1>
            </div>

            <div className=" productsData container-grid">
                {
                    hp.slice(0, 8).map((currentProduct, index) => {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(currentProduct.pImage.data.data))
                        );

                        return (
                            <div className=" productCard " key={index}>
                                <NavLink to={`/user/product-details/${currentProduct.pToken}`}>
                                    <div className="card-img">
                                        <img src={`data: image/png;base64, ${base64String}`} alt="Product Img" width="250px" height="250px" />
                                    </div>
                                    <div className="card-details">
                                        <div className="product-name">
                                            <h4>{currentProduct.pBrand}</h4>
                                        </div>
                                        <div className="product-price">
                                            <h4><FaIndianRupeeSign /> {currentProduct.pPrice}</h4>
                                        </div>
                                        <div className="product-description">
                                            <p className="fw-light">{currentProduct.pDescription}</p>
                                        </div>

                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div >
            <div className="freshArrivalbtn text-center">
                <Link to="category/filterData/65cbab3447f3a0198a40b59a">
                    <button ><h6>VIEW ALL</h6></button>
                </Link>
            </div>
            <br />
            <br />
            <ContinousSlider />
            <br />
            <br />

            <Testimonials />

            {/* <br/> */}
            <br />
            <div className="basicWebInfo">
                <h1>
                    Why Buy Refurbished Laptops From GoRefurbo?
                </h1>
                <p>
                    There are lots of advantages to purchasing refurbished gadgets from us. GoRefurbo provides the most extensive range of quality refurbished laptops.
                </p>
                <br />

                <h2>
                    Range
                </h2>
                <p>
                    Browse our extensive range of refurbished laptops suitable for various uses and budgets with confidence. We have all the leading brands, including, Lenovo, Dell, HP, Acer, Apple and many more.
                </p>
                <br />

                <h2>
                    Warranty on All Products
                </h2>
                <p>
                    To ensure you have a piece of mind and confidence when buying from us, we provide a 6 Months WARRANTY on every refurbished laptop. Extended warranty options are also available for your convenience.
                </p>
                <br />

                <h2>
                    Quality Control
                </h2>
                <p>
                    Our entire range of laptops has been professionally refurbished, tested, repackaged and approved for resale to the manufacturer's standards.
                </p>
                <br />

                <h2>
                    Flexibility
                </h2>
                <p>
                    Do you need to upgrade the RAM or hard drive on your new computer or laptop? No problem; simply tell us, and our on-site technical experts will fully customize your order to your exact specifications.
                </p>
                <br />

                <h2>
                    Convenience
                </h2>
                <p>
                    We have a large comprehensive online store dedicated to providing the best service to our customers. You can call us anytime to learn more about the benefits of our services.
                </p>
                <br />

                <h2>
                    Great prices
                </h2>
                <p>
                    Our competitors' purchasing power is unmatched, allowing us to pass on the savings to you through our everyday discount offers on a vast range of used desktop laptops.
                </p>
                <br />
            </div>

        </>
    )
}









