import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const emailstoreinLS = (userID) => {
        setuserID(userID);
        localStorage.setItem("userID", userID);
    };

    const tokenstoreinLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const [userID, setuserID] = useState(localStorage.getItem("userID"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setuserData] = useState("");
    const [category, setCategory] = useState([]);
    const [cartItems, setcartItems] = useState([]);
    const [getInCart, setgetInCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [DD, setDD] = useState([]);
    const [query, setQuery] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading
    const [filterdata, setFilterdata] = useState(null); // Initialize filterdata as null
    const [myorders, setMyorders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productData, setProductData] = useState([]);
    const [currentPP, setcurrentPP]= useState();

    const tokenAuthorization = `Bearer ${token}`;
    const isUserLogin = !!token;

    const userLogout = () => {
        setToken("");
        console.log("After_logout", userData);
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/user/userAuth", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: tokenAuthorization
                },
                body: JSON.stringify()
            });

            if (response.status === 200) {
                const userData = await response.json();
                setuserData(userData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        userAuthentication();
        setIsLoading(true); // Set loading to true when component mounts
        // Simulate data loading (replace setTimeout with actual data fetching)
        setTimeout(() => {
            setIsLoading(false); // Set loading to false after data is loaded (replace this with your actual data fetching)
        }, 1000); // Simulate 2 seconds of loading time (replace this with your actual data fetching)
    }, [userID]);

    const getAllCategory = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/category", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const categoryData = await response.json();
                setCategory(categoryData);
            }
        } catch (err) {
            console.log(err);
        }
    };


    // Add product in localstorage
    const addToCart = (pToken, pImage, pDescription, pPrice, pStock) => {
        if (isUserLogin && userID) {
            // Retrieve cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the item is already in the cart
            const existingItemIndex = cartItems.findIndex(item => item[0] === pToken && item[4] === userID);

            if (existingItemIndex !== -1) {
                console.log("existing_product_index", existingItemIndex);
                // Item already exists, update quantity
                cartItems[existingItemIndex][5]++;
                cartItems[existingItemIndex][6] = cartItems[existingItemIndex][5] * pPrice; // Update total price
            } else {
                console.log("product_not_exist_so_it_return", existingItemIndex);
                // Item doesn't exist, add new item to the cart with initial quantity 1
                const total = pPrice; // Initial total price
                cartItems.push([pToken, pImage, pDescription, pPrice, userID, 1, total, pStock]);
            }

            // Update the cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            toast.success("Added to cart successfully");
            getProductInCart();
        } else {
            toast.warning("Please login first!");
        }
    };

    // // Buy It Now
    // const buyItNow = (pToken, pImage, pDescription, pPrice, pStock) =>{
    //     try{
    //         if(isUserLogin && userID){
    //             const data= [pToken, pImage, pDescription, pPrice, pStock];
    //             setProductData(data);
    //             console.log("hhh", productData);
    //         }else{
    //             console.log("currentProduct data not found");
    //         }

    //     }catch(err){
    //         console.log(err);
    //     }
    // }


    // Assuming buyItNow is defined in the context API
    const buyItNow = (pToken, pImage, pDescription, pPrice, pStock) => {
        try {
            if (isUserLogin && userID) {
                const data = [pToken, pImage, pDescription, pPrice, pStock];
                setProductData(data); // This updates productData asynchronously
            } else {
                console.log("User not logged in or data not found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Use useEffect to perform actions after productData has been updated
    useEffect(() => {
        console.log("Updated Product Data:", productData);
    }, [productData]);



    // Get product from localstorage
    const getProductInCart = () => {
        if (isUserLogin) {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            setgetInCart(cartItems);
        }
    };

    // Remove product from localstorage
    const removeProductFromLS = (index) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setgetInCart(cartItems);

        const updatedItems = getInCart.filter((_, i) => i !== index);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setgetInCart(updatedItems);

        toast.success("Product remove successfully")
    };

    // Increase product quantity
    const increaseQuantity = (index, pToken, pImage, pDescription, pPrice, pStock) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems[index][5] < cartItems[index][7]) {
            cartItems[index][5]++; // Increase quantity for the specific product
            cartItems[index][6] = cartItems[index][5] * pPrice; // Update total price
            localStorage.setItem('cart', JSON.stringify(cartItems));
            getProductInCart();
        } else {
            toast.error(`You can only add ${cartItems[index][7]} of this item to your cart.`);
        }
    };

    // Decrease product quantity
    const decreaseQuantity = (index, pPrice) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems[index][5] > 1) {
            cartItems[index][5]--; // Decrease quantity for the specific product
            cartItems[index][6] = cartItems[index][5] * pPrice; // Update total price based on new quantity
            localStorage.setItem('cart', JSON.stringify(cartItems));
            getProductInCart();
        }
    };

    // Get all dropdown details
    const getAllDD = async (req, res) => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/getAllDD", {
                method: "GET",
                headers: {
                    "Authorization": tokenAuthorization,
                }
            })

            if (response.status === 200) {
                const data = await response.json();
                setDD(data);
                setFilterdata(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteDropdown = async (id) => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/dropdown/deleteDropdown/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: tokenAuthorization
                }

            })

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
                getAllDD();
            } else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCustomerQueries = async (req, res) => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/customer-query", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setQuery(data);
                setFilterdata(data);
            } else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getallmyOrders = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/user/Myorders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                },
            })

            if (response.status === 200) {
                const myorders = await response.json();
                console.log("myorder", myorders);
                setMyorders(myorders);
                setIsLoading(false);
            } else {
                console.log("MyOrders data not found")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cancleOrder = async (oID, pID) => {
        try {
            const response = await fetch(`http://localhost:1000/api/user/Myorders/cancle/${oID}/${pID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
                getallmyOrders();
            } else {
                const msg = await response.json();
                toast.error(msg.msg);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getAllOrdersData = async () => {
        try {
            const response = await fetch("http://localhost:1000/api/admin/allOrders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            })

            if (response.status === 200) {
                const allOrders = await response.json();
                setOrders(allOrders);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const orderDelivered = async (oID, pID) => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/allOrders/delivered/${oID}/${pID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
                getAllOrdersData();
            } else if (response.status === 404) {
                const msg = await response.json();
                toast.error(msg.msg);
            } else if (response.status === 400) {
                const msg = await response.json();
                toast.error(msg.msg);
            } else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const orderDelete = async (oID, pID) => {
        try {
            const response = await fetch(`http://localhost:1000/api/admin/allOrders/delete/${oID}/${pID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenAuthorization
                }
            });

            if (response.status === 200) {
                const msg = await response.json();
                toast.success(msg.msg);
                getAllOrdersData();
            } else if (response.status === 404) {
                const msg = await response.json();
                toast.error(msg.msg);
            } else if (response.status === 400) {
                const msg = await response.json();
                toast.error(msg.msg);
            } else {
                const msg = await response.json();
                toast.error(msg.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <AuthContext.Provider value={{
            tokenstoreinLS,
            emailstoreinLS,
            userData,
            isUserLogin,
            userLogout,
            tokenAuthorization,
            getAllCategory,
            category,
            addToCart,
            cartItems,
            getProductInCart,
            getInCart,
            userID,
            removeProductFromLS,
            increaseQuantity,
            decreaseQuantity,
            quantity,
            getAllDD,
            DD,
            deleteDropdown,
            getAllCustomerQueries,
            query,
            isLoading,
            filterdata,
            myorders,
            getallmyOrders,
            cancleOrder,
            getAllOrdersData,
            orders,
            orderDelivered,
            orderDelete,
            buyItNow,
            productData,
            currentPP
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseContext = () => {
    return useContext(AuthContext);
};

