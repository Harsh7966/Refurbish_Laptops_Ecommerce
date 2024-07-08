import { useEffect } from "react"

export const Success= () =>{

    // const handleSubmit = async (e) => {
    //     console.log("Orders", order);
    //     e.preventDefault();
    //     try {
    //         // Check if any products are in the cart
    //         if (getInCart.length === 0) {
    //             toast.error("Your cart is empty");
    //             return;
    //         }

    //         // Validate the order details before proceeding
    //         for (const key in order) {
    //             if (!order[key]) {
    //                 toast.error("Please fill in all the required fields");
    //                 return;
    //             }
    //         }

    //         // Chunk the data and send multiple requests
    //         const chunkSize = 10; // Adjust the chunk size as needed
    //         const chunks = [];

    //         for (let i = 0; i < getInCart.length; i += chunkSize) {
    //             chunks.push(getInCart.slice(i, i + chunkSize));
    //         }

    //         for (const chunk of chunks) {
    //             const response = await fetch("http://localhost:1000/api/user/order-placed", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: tokenAuthorization
    //                 },
    //                 body: JSON.stringify({ order, localData: chunk })
    //             });

    //             // Handle response as needed
    //             const data = await response.json();

    //             // Loading effect
    //             if (!response) {
    //                 return <WebLoader />;
    //             }

    //             if (response.ok) {
    //                 toast.success(data.msg);

    //                 // Remove all cart data of the particular user from local storage
    //                 const updatedCart = getInCart.filter(item => item[4] !== userID);
    //                 localStorage.setItem("cart", JSON.stringify(updatedCart));

    //                 // Refresh cart data after removing items from local storage
    //                 getProductInCart();
                     
    //                 navigate("/myorders");
    //             } else {
    //                 toast.error(data.msg);
    //             }
    //         }
    //     } catch (err) {
    //         toast.error("Something went wrong");
    //         console.error(err);
    //     }
    // };
    
    // useEffect(()=>{
    //     handleSubmit();
    // })

    return(
        <>
        <h1>Order Placed</h1>
        </>
    )
}