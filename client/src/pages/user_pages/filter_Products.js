import { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link, NavLink, useParams } from "react-router-dom";
import { WebLoader } from "../../components/webLoader";
import { UseContext } from "../../storage/auth";
import { BiArrowBack, BiSolidDownArrow } from "react-icons/bi";
import { LuListFilter } from "react-icons/lu";

export const FilterProducts = () => {
    const params = useParams();

    const [filterdata, setFilterdata] = useState(null);
    const { isLoading } = UseContext();
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

    if (isLoading || filterdata === null) {
        return <WebLoader />;
    }

    return (
        <>
            <div className="filter-products-page">
                <br />

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
                                                                    type="checkbox"
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

                    <div className="column">
                        <div className="freshArrivalheading">
                            <br />
                            {/* Page Heading */}
                            {
                                params.id === "65cbab2747f3a0198a40b577" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Apple Laptops</h1>
                                    </div>
                                ) : params.id === "65cbab3447f3a0198a40b59a" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished HP Laptops</h1>
                                    </div>
                                ) : params.id === "65cc8866264789916da18bd4" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Dell Laptops</h1>
                                    </div>
                                ) : params.id === "65cc8888264789916da18e0f" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Lenovo Laptops</h1>
                                    </div>
                                ) : params.id === "65cbab7b47f3a0198a40b64c" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished i3 Laptops</h1>
                                    </div>
                                ) : params.id === "65cc88e2264789916da1949a" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished i5 Laptops</h1>
                                    </div>
                                ) : params.id === "65cdb8f44ca7054e6a9190cc" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished i7 Laptops</h1>
                                    </div>
                                ) : params.id === "65cbaab247f3a0198a40b458" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Basic Renewed Laptop</h1>
                                    </div>
                                ) : params.id === "65cbab1147f3a0198a40b543" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Business Refurbished Laptops</h1>
                                    </div>
                                ) : params.id === "65cc8831264789916da18898" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Gaming Laptops</h1>
                                    </div>
                                ) : params.id === "65cbab5547f3a0198a40b5f0" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Laptops Under 30000</h1>
                                    </div>
                                ) : params.id === "65cc88ba264789916da191af" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Laptops Above 30000</h1>
                                    </div>
                                ) : params.id === "65dc3b8b824878c6039d0229" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Laptops Under 25000</h1>
                                    </div>
                                ) : params.id === "65dc3bbb824878c6039d04b2" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Laptops Under 35000</h1>
                                    </div>
                                ) : params.id === "65dc3bd0824878c6039d05c9" ? (
                                    <div className="freshArrivalheading ">
                                        <h1>Refurbished Laptops Above 35000</h1>
                                    </div>
                                ) : null
                            }

                        </div>
                        <div className="productsData container">
                            {filterdata.map((currentProduct, index) => {
                                const base64String = btoa(
                                    String.fromCharCode(...new Uint8Array(currentProduct.pImage.data.data))
                                );

                                return (
                                    <div className="productCard" key={index}>
                                        <NavLink to={`/user/product-details/${currentProduct.pToken}`}>
                                            <div className="card-img">
                                                <img src={`data: image/png;base64, ${base64String}`} alt="Product Img" width="100%" height="250px" />
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
                            })}
                        </div>
                    </div>
                </div>
            </div>



            {/* Page Info */}
            {
                params.id === "65cbab2747f3a0198a40b577" ? (
                    // Apple brand Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished Apple Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Best Refurbished Apple MacBook Laptops in India</h2>
                            <br />
                            <p >Are you looking for a top-quality refurbished Apple laptop at an affordable price? If so, contact GoRefurbo–India's leading provider of refurbished Apple laptops.</p>
                            <p >At GoRefurbo, we pride ourselves on offering our customers only the best in refurbished technology. Our team of experts carefully inspects and refurbishes every device that comes through our doors to ensure that it is in perfect working condition before we offer it to our customers. And with a wide selection of refurbished Apple laptops available – including MacBook Airs, MacBook Pros, and more – you're sure to find just what you need at GoRefurbo.</p>
                            <br />

                            <h2>High-Quality Refurbished Apple Laptops</h2>
                            <br />
                            <p >One of the biggest advantages of shopping with us is that we offer high-quality refurbished Apple laptops at prices that anyone can afford. Whether you're looking for a budget-friendly refurbished MacBook for everyday use or something more powerful for professional applications, we have options that fit your needs and budget alike.</p>
                            <p >Not only do we offer competitive pricing on all our refurbished Apple laptops, but we also provide fast delivery and great customer service. We understand how important your purchase is to you, so we take steps to ensure every transaction goes smoothly from start to finish.</p>
                            <br />

                            <h2>Certified Refurbished MacBook</h2>
                            <br />
                            <p >When shopping online for any tech gadgets or electronics, it's essential always to buy from someone who has been doing this long enough; otherwise, frustration would follow if anything went wrong after placing an order. </p>
                            <p >With nearly years of sourcing expertise under its belt and thousands of happy, satisfied customers, GoRefurbo Refurbished Apple Laptops stand out as premium quality certified preloved laptops.</p>
                            <p>So don't settle when it comes time to purchase your next Refurbished MacBook. Instead, choose GoRefurbo and experience the difference quality makes! </p>
                            <br />

                            <h2>Battery Life of Our Refurbished Apple Laptops</h2>
                            <br />
                            <p >The battery life of our range of refurbished MacBooks is one of its key selling points. A full charge can last up to hours, so you can easily get through a workday or a day of travel without worrying about your battery running out.</p>
                            <br />

                            <h2>Why Choose a Refurbished Apple MacBook Laptop</h2>
                            <br />
                            <p >Are refurbished laptops good, especially in terms of data security? This question may be</p>
                            <p >wondering in your mind. With a MacBook, you can rest easy knowing that your data is as secure as possible due to the various security measures taken to protect it.</p>
                            <p>The Apple T2 security chip protects your data with advanced encryption levels and prevents certain macOS features from loading until their integrity can be verified. Additionally, all MacBooks now have Touch ID, a built-in fingerprint sensor for added protection. MacBooks also have a Secure Boot feature that requires software to be signed using an Apple certificate. </p>
                            <p>
                                MacBooks have a lot to offer when it comes to making the switch. You get a thin, light design, long battery life, the latest ports, and a great trackpad and keyboard. Plus, with macOS, you get a powerful and intuitive operating system that's easy to use and learn. All in all, there are many reasons to choose a refurbished MacBook, and you'll love all it has to offer.
                            </p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cbab3447f3a0198a40b59a" ? (
                    // Hp brand Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished HP Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Best HP Refurbished Laptops in India</h2>
                            <br />
                            <p >Looking to buy HP Refurbished Laptops? Contact GoRefurbo to purchase the best quality HP Refurbished Laptops in India. GoRefurbo is one of the leading merchants that provide some of the best quality Refurbished HP Laptops in India for those who want top-notch performance within their budget. </p>
                            <p >Our range includes models suitable for both personal and professional computing requirements. All our refurbished HP laptops come with a warranty period to ensure complete satisfaction and assurance.</p>
                            <br />

                            <h2>Why choose GoRefurbo for Refurbished HP laptops?</h2>
                            <br />
                            <p >At GoRefurbo, we have developed extensive experience over many years of refurbishing and selling refurbished HP laptops so that our customers can rely on us to deliver the best quality products available in the market. Unlike others, we take pride in providing our clients with precisely what they're looking for; therefore, you'll always find customized solutions from us based on your needs.</p>
                            <p >Our team thoroughly tests each and every unit before making it available for sale – during which time any defects found are repaired or replaced as needed - without charging additional fees or expenses related to these repairs if necessary!</p>
                            <p>
                                Ultimately - whether you need an HP Refurbished Laptop designed specifically around gaming or office work - all models offered by GoRefurbo come equipped with upgradability features, ensuring maximum compatibility across different software systems and applications.
                            </p>
                            <p>So if you're looking to buy refurbished HP laptops at competitive rates while still obtaining top-of-the-line processing power suited explicitly to your exact requirements – simply contact GoRefurbo!</p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cc8866264789916da18bd4" ? (
                    // Dell brand Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished Dell Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Best Dell Refurbished Laptops in India</h2>
                            <br />
                            <p >We have a wide range of Dell refurbished laptops to fit your every need, and we're confident that one is perfect for you. Dell is a standout brand for many reasons. Their user-friendly design, high-definition displays, backlit keyboards, and a range of ports and plugs make them perfect for business or personal use. Plus, they're lightweight and easy to carry around, which is a big plus for people on the go.</p>
                            <p >But the real clincher is our customer support service. We provide excellent support service, so if you ever have problems with your laptop, you know you can get help quickly and easily.</p>
                            <br />

                            <h2>Unboxing the Benefits of Our Dell Refurbished Laptops</h2>
                            <br />
                            <p >Our range of refurbished Dell laptops is great at reliability and durability. We can also configure your refurbished laptop to meet your specific needs and requirements. With a wide range of features from powerful processors to vibrant displays, Dell laptops come packed with features that will make your computing experience more enjoyable.</p>
                            <p >For your peace of mind, we assure you, our best refurbished laptops come with a host of warranty and support options. </p>
                            <br />

                            <h2>Exploring Powerful Components - Dell Refurbished Laptops</h2>
                            <br />
                            <p >Dell laptops are built with the best components in the industry, so you know you're getting a machine that can handle whatever you throw. From powerful processors to stunning displays, Dell laptops are designed to help you work and play harder. </p>
                            <br />

                            <h2>Superior Design & Aesthetics</h2>
                            <br />
                            <p >When it comes to design and aesthetics, Dell laptops have always been one of the most visually appealing choices on the market. With options like a sleek aluminium body, a modern hinge design, and sleek edges, they are designed to look as good as they perform.</p>
                            <p >Moreover, Dell laptops come with various features designed to make them even more attractive and user-friendly. For instance, you can customize your laptop with your choice of colours and materials, ensuring that you have something truly unique. </p>
                            <p>Additionally, Dell laptops may feature backlit keyboards and an illuminated logo on the lid – both ideal for low-light environments making it easier to stay productive regardless of the lighting conditions.</p>
                            <p>
                                Whether you're looking for hard-working performance or modern esthetics, buy our used laptops undoubtedly. With their attention to detail on both fronts, it's easy to see why they remain one of the most popular laptop brands today.
                            </p>
                            <p>
                                All in all, there are several benefits to buying a refurbished laptop of Dell. Whether you are looking for a powerful laptop that can handle heavy workloads or a machine that is lightweight and easy to carry with you on the go, Dell has a laptop that will suit your every need. In addition, Dell laptops have various features that can make your computing experience more enjoyable and productive, such as powerful processors, large storage capacities, and long battery life. So if you are looking for a second hand laptop, you can consider Dell refurbished laptops.
                            </p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cc8888264789916da18e0f" ? (
                    // Lenovo brand Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished Lenovo Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Best Refurbished Lenovo Laptop in India</h2>
                            <br />
                            <p >If you want a powerful, reliable, and affordable refurbished laptop. Our range of refurbished Lenovo laptops has just what you're looking for. Lenovo laptops are designed with your needs in mind. They're powerful enough to handle the most demanding tasks yet affordable enough to fit any budget. Plus, our renewed laptops are backed by a warranty that guarantees your satisfaction.</p>
                            <br />

                            <h2>Why choose a Renewed Lenovo Laptop?</h2>
                            <br />
                            <p >Lenovo is a company that has been in the computer business for a very long time. It has always been a leader in innovation and technology. The company has continued to be a top player in the computer industry, with laptops known for their quality and durability.</p>
                            <br />

                            <h2>The Features and Benefits of Second hand Lenovo Laptops</h2>
                            <br />
                            <p >When it comes to refurbished laptops, Lenovo is a name you can trust. Lenovo laptops offer the best of both worlds: high-quality performance and features combined with an affordable price.</p>
                            <p >Choosing a Lenovo laptop is the smart choice. First, Lenovo laptops are designed with your needs in mind. They come with various features and options, so you can choose the one that's perfect for you.</p>
                            <p>Second, Lenovo laptops are built to last. They come with high-quality materials and construction, so you can count on them to perform well for years.</p>
                            <p>
                                Third, our best refurbished laptops are backed by outstanding customer service. If you ever have a problem with your laptop, you can count on us to help you fix it quickly and efficiently.
                            </p>
                            <br />

                            <h2>Battery Life of Our Refurbished Apple Laptops</h2>
                            <br />
                            <p >The battery life of our range of refurbished MacBooks is one of its key selling points. A full charge can last up to hours, so you can easily get through a workday or a day of travel without worrying about your battery running out.</p>
                            <br />

                            <h2>The Different Types of Refurbished Lenovo Laptops</h2>
                            <br />
                            <p >Lenovo offers a wide range of laptops to suit your conditions. Whether you're looking for business series laptops or affordable laptops for students, there's a Lenovo laptop for you.</p>
                            <p >You can buy used laptops from Lenovo; the best part is that they come in all shapes and sizes so that you can find the perfect one for your lifestyle. There are laptops with large screens for people who need more screens, and there are also laptops with smaller screens that are perfect for on-the-go professionals.</p>
                            <p>We also provide you with Lenovo gaming laptops, 2-in-1 laptops and Chromebooks to choose from. So no matter what your requirements are, our range of the best refurbished laptops has you covered.</p>
                            <br />

                            <h2>Lenovo ThinkPad laptop: Best Refurbished Business Laptop</h2>
                            <br />
                            <p >What's more? You can also consider the popular Lenovo ThinkPad laptop. It is designed for business professionals and comes with features like security software, long battery life and the latest Intel processors. Our collection of recertified laptops also includes the best gaming laptops from Lenovo. </p>
                            <p >We provide affordable laptops of Lenovo for anyone looking for a powerful, durable computer that doesn't sacrifice on style. With a wide variety of models to choose from, there's a Lenovo laptop perfect for any budget or need. So why not make the smart choice and choose a refurbished Lenovo laptop today.</p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cbab7b47f3a0198a40b64c" ? (
                    // i3 Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished i3 Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Refurbished i3 Laptops</h2>
                            <br />
                            <p >We provide an extensive range of refurbished i3 laptops. You can choose a refurbished i3 Laptop that is budget-friendly. GoRefurbo has developed a transparent grading system that considers both the appearance and technical condition of our renewed devices. "Technical condition" refers to our renewed laptops' durability based on their refurbishing operations and historical quality data. Each of our renewed laptops, regardless of grade (fair, good, or excellent), is guaranteed to be fully functional.</p>
                            <br />

                            <h2>Benefits of Refurbished i3 Laptops</h2>
                            <br />
                            <p >If you are considering Refurbished i3 Laptops, you are on the right path. Core i3 processors provide excellent value for money. The Intel Core i3 is a noticeable processor suitable for casual gamers and is popularly known as the best budget gaming laptop. The Processor is ideal for light processing tasks, including word processing, web browsing, and many more. There are five models in the i3 line. Each has a specific role to play. The processors with the lowest power ratings are denoted by at (T), while the over-lockable models are denoted by a. (K). </p>
                            <br />

                            <h2>Why Choose GoRefurbo For Refurbished i3 Laptops</h2>
                            <br />
                            <p >We have a team of experts on hand to assist you in choosing the best refurbished laptop for your specific needs. Our expert team reviews each order to ensure your chosen device is correctly matched. If we have any special offers or alternatives that would be better suited, we'll contact you to discuss your options.</p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cc88e2264789916da1949a" ? (
                    // i5 Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished i5 Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Refurbished i5 Laptops</h2>
                            <br />
                            <p >We have a huge range of refurbished i5 laptops. Our renewed i5 processor laptops come from renowned brands like Dell, Lenovo, HP, and many more. Moreover, if you can’t find what you are looking for, our team will gratefully help you to consider the product with your required specification. In addition to low prices, extended warranties, and excellent customer service, GoRefurbo offers refurbished laptops with the Processor of your choice to ensure the best user experience possible. </p>
                            <p>Our refurbished laptops have undergone 40 comprehensive tests, confirming that we guarantee premium quality and extended life at low and affordable prices. We provide free shipping and a free warranty cover to all our customers. We pride ourselves on delivering outstanding customer service, so feel free to contact us.</p>
                            <br />

                            <h2>Benefits of Using Refurbished i5 Laptops</h2>
                            <br />
                            <p >The Intel Core i5 processor is mostly popular for gaming and general usage. The Processor provides a wide range of capabilities at various price points. The 12th generation Intel Core i5 processors all have at least four cores. Four cores are suitable for creating a perfect balance for general use if you don't do much multitasking. </p>
                            <p>You may be thinking about why you should consider an i5. Well, they are generally less expensive and one of the most popular processors on the market. The i5 is ideal for general computer users browsing the web or operating unusually light applications.</p>
                            <br />

                            <h2>Why Buy Refurbished i5 Laptops from GoRefurbo</h2>
                            <br />
                            <p >Refurbished laptops are inspected, cleaned internally, tested, repaired, and then made ready for sale. Any components that are no longer functional are replaced, and fully operational parts are cleaned. Eventually, our recertified laptops look and function exactly as they did when they were new. They may have outdated components and performance compared to brand-new models, but they work as well as they did when they were built. So what are you waiting for? Choose from our extensive range of i5 refurbished laptops. </p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cdb8f44ca7054e6a9190cc" ? (
                    // i7 Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished i7 Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Refurbished i7 Laptops</h2>
                            <br />
                            <p >We offer refurbished i7 laptops from various reputed brands, including Dell, Lenovo, HP, and many more. Each of our renewed laptops goes through an extensive testing and cleaning process, where parts that don't meet our quality standards are replaced. All our refurbished laptops are rigorously tested to confirm their functionality and performance meet the level of new laptops. </p>
                            <br />

                            <h2>Refurbished i7 Laptops in Budget </h2>
                            <br />
                            <p >Finding a refurbished i7 laptop on a budget can be challenging. At GoRefurbo, we make it easier to find the right solution for you. If you are looking for the best quality refurbished laptops at an affordable price, we have them, including Dell, HP, Lenovo, and many more! We carry the best options for whatever unique requirements you have! We are a trusted company that uses innovative ideas to promote our sustainable process, improve reliability, emphasize affordability, and extend the life of second-hand laptops. </p>
                            <br />

                            <h2>Benefits of choosing refurbished i7 laptops</h2>
                            <br />
                            <p >Compared to i3 and i5 core processors, core i7 processors have more abilities. Because of their faster performance, larger cache, integrated graphics and Hyper-Threading technology, i7 processors are perfect for multitasking, high-end gaming, scientific work and complex tasks. Our range of refurbished laptops with i7 processors can be the best option for those looking for faster systems. </p>
                            <p>
                                Core i7 processors are designed for complex repetitive gaming or video editing tasks. They provide slightly better performance than i5 processors. However, they are costlier than i5 and i3 processors. Choosing between a Core i5 and a Core i7 processor ultimately depends on your requirement and budget. If you require the highest level of performance, a Core i7 processor is the way to go.
                            </p>
                            <br />

                            <h2>Why Choose GoRefurbo for refurbished i7 laptops</h2>
                            <p>In today's advanced technological world, a laptop is one of the most versatile and empowering tools you can own. It allows users to take their work wherever they go, offering them the luxury of maximizing productivity. We believe finding the best-refurbished laptop for students, business, gaming, design, or day-to-day tasks should be simple, convenient, and stress-free.  </p>
                            <p>So GoRefurbo has come with high-quality refurbished laptops from all the most popular brands, including Dell, HP, Lenovo, and others. Our used laptops are expertly restored to the manufacturer's original standards to ensure quality. </p>
                        </div>

                    </div>
                ) : params.id === "65cbaab247f3a0198a40b458" ? (
                    // Basic Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Basic Renewed Laptop</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Basic Renewed Laptops</h2>
                            <br />
                            <p >Looking for basic renewed laptops on a budget? Now you don’t need to search for anywhere. GoRefurbo provides a great opportunity for those who are in need of a renewed laptop but are on a budget. Our basic renewed laptops offer high-quality performance at an affordable price, starting from INR 15K only, which is perfect for daily use, such as browsing the internet, sending emails, or using simple applications.

                                At GoRefurbo, we understand that buying a renewed laptop might be problematic and risky. That's why we make sure to run each device through our strict, comprehensive testing process to ensure its proper functionality before putting them up for sale. We have top-notch quality standards for the laptops we sell, and you can trust us fully with your purchase needs.

                                With GoRefurbo’s warranty cover included on every basic renewed laptop sold, customers can be happy knowing they're getting both quality assurances as well as providing peace of mind. Shipping available anywhere within India allows our clients further convenience when purchasing from us.</p>
                            <br />

                            <h2>Get High- Quality Basic Renewed Laptops </h2>
                            <br />
                            <p >
                                At GoRefurbo, we take pride in providing tech-savvy buyers with high-quality renewed laptops that are as good as new. With the rapidly evolving nature of technology, spending a large sum on brand-new devices is often unnecessary. Our fully functional and rigorously tested renewed laptops can easily meet all your computing needs whether you're working remotely or just surfing the web from home.

                                We believe that everyone deserves access to affordable yet dependable renewed laptops, which is why we make it our priority to provide top-performing products at pocket-friendly prices. We carefully maintain and inspect each device before reselling them, ensuring they meet our high standards for quality and reliability.
                            </p>
                            <br />

                            <h2>Best Budget Renewed Laptops</h2>
                            <br />
                            <p >Whatever device you consider at GoRefurbo, you will have a rigorously examined, well-tested, refurbished laptop at an extremely low price. Visit our website for a wide range of renewed laptop inventory, a quick and reliable service support team, and, most importantly, the best deals available on our renewed laptops. Go and grab the best basic renewed laptop in your budget. Moreover, you can also look at our range of business and graphic laptops collection.</p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cbab1147f3a0198a40b543" ? (
                    // Business Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Business Refurbished Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Refurbished Business Laptops</h2>
                            <br />
                            <p >Need a refurbished business laptop without compromising the speed and quality? Look no further; we have got you covered. We have a wide range of refurbished business laptops that have been rigorously tested, repaired and matched with their original condition. So why spend money on a brand new business laptop when you can get your required specifications on a budget?</p>
                            <br />

                            <h2>Refurbished Laptops with Warranty </h2>
                            <br />
                            <p >
                                At GoRefurbo, we have a business series of used laptops from popular brands like Apple, Lenovo, Dell, HP and many more. And what's more? You may be thinking that refurbished laptops don't have warranty coverage. For your peace of mind, let us tell you that our recertified laptops include free warranty coverage for all our customers. If any issue arises while using our second hand laptops, you can easily get in touch with our expert technicians. Giving you the confidence to buy our product, our professional technicians are available anytime to resolve your problem.
                            </p>
                            <br />

                            <h2>High-Quality Recertified Laptops</h2>
                            <br />
                            <p >Our diverse range of renewed business laptops from various brands has options for anyone looking to purchase a second hand laptop. Since we never compromise quality and functionality with our second hand laptops, you will get a device with excellent performance. We provide refurbished business laptops with Intel core processors. Our business laptops are equipped with Intel i5 and i7 processors for complex computing tasks. You may be wondering what's more with your renewed laptop. Well, it will depend on the operating system you choose. To run high-intensity apps, such as video editing and gaming, we enable you to customize RAM and boost the device's overall performance.</p>
                            <br />

                            <h2>Wide Range of Options Available</h2>
                            <br />
                            <p >If you are confused about choosing the right laptop for you, no worries; our dedicated team will assist you in deciding which renewed laptop is suitable for you. At GoRefurbo, we have options ranging from different brands, processors, and operating systems. Whichever device you choose, you will get a product that has been thoroughly tested to perform like a new laptop. </p>
                            <br />
                        </div>

                    </div>
                ) : params.id === "65cc8831264789916da18898" ? (
                    // Gaming Laptop info
                    <div className="BrandLaptopsInfo">
                        <div className="freshArrivalheading ">
                            <h1>Refurbished Gaming Laptops</h1>
                        </div>

                        <div className="brandInfo">
                            <h2>Buy Refurbished Gaming Laptops at GoRefurbo </h2>
                            <br />
                            <p >Need a high-speed refurbished gaming laptop? Contact GoRefurbo, as we offer refurbished gaming laptops that are powerful enough to handle even the most demanding games and provide gamers with a smooth and responsive gaming experience. They come equipped with powerful processors, dedicated graphics cards, high-resolution displays, and large storage capacities to ensure that you get the best possible performance at all times.</p>
                            <p>
                                One of the major advantages of purchasing refurbished gaming laptops from us is that they are backed by our warranty. We understand that buying used devices can be risky, which is why all our refurbished gaming laptops undergo rigorous testing before they are put up for sale. Our team of experts ensures that every component in the laptop functions like it did when it was new, so you don't have to worry about any defects or issues with your device.
                            </p>
                            <br />

                            <h2>Refurbished Gaming Laptop in Budget</h2>
                            <br />
                            <p >
                                Refurbished gaming laptops not only help you save money but also contribute towards reducing electronic waste as they extend the lifespan of older devices. When you purchase a refurbished gaming laptop from us, you're doing your bit for the environment by keeping these perfectly usable machines out of landfills!
                            </p>
                            <p>
                                At GoRefurbo, we believe in providing our customers with top-quality products at prices that won't break their budget. That's why we offer great deals on refurbished gaming laptops throughout the year. So if you're on a tight budget but still want to enjoy uninterrupted hours of gaming fun without any lags or glitches, explore our range now and find your perfect machine today!
                            </p>
                            <br />

                            <h2>Benefits of buying refurbished gaming laptops from GoRefurbo:</h2>
                            <br />
                            <p >Condition: Make sure the laptop is in good working condition, with no major cosmetic or functional defects.</p>
                            <p>
                                Warranty: Look for a refurbished gaming laptop with a warranty, as this will provide peace of mind and protection against any potential issues.
                            </p>
                            <p>
                                Price: Refurbished gaming laptops can be purchased at a significant discount compared to brand-new devices, but be cautious of prices that seem too good to be true.
                            </p>
                            <p>
                                Seller reputation: It's important to buy from a reputable seller, such as a manufacturer or a trusted reseller, to ensure that you get a high-quality product.
                            </p>
                            <br />

                            <h2>Refurbished gaming laptops from Leading Brands</h2>
                            <br />
                            <p >Whether you're an avid gamer who needs a high-fidelity machine for immersive gameplay experiences or someone who just wants reliable computing power without breaking their bank account, we have something in store for everyone!  </p>
                            <p>With our comprehensive collection of refurbished gaming laptops from some leading brands worldwide, we always bring quality products right into your home while helping reduce electronic waste significantly! Explore our vast selection today and grab one before stocks run out!</p>
                            <br />

                            <h2>Refurbished Gaming Laptop: An Eco-Friendly Initiative</h2>
                            <br />
                            <p >
                                Buying a refurbished gaming laptop help reduce e-waste, as you keep it from ending up in a landfill and contributing to the growing e-waste problem. The production of new electronics requires a significant amount of energy and natural resources. By buying refurbished, you are conserving resources and reducing the carbon footprint associated with producing new electronics.
                            </p>
                            <p>
                                Furthermore, the production and transportation of electronics are major contributors to greenhouse gas emissions. Buying a used laptop reduces the emissions associated with the production and transportation of new electronics.
                            </p>
                            <p>
                                Refurbished laptops are an example of a circular economy, where products are reused and recycled instead of being discarded after a single use. By supporting the refurbished market, you are encouraging this sustainable economic model.
                            </p>
                            <br />
                        </div>

                    </div>
                ) : null
            }
        </>
    )
}

export default FilterProducts;
