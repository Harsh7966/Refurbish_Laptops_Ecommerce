const user = require("../models/signUp_model");
const product = require("../models/product_model");
const cart = require("../models/cart_model");
const query = require("../models/contact_model");
const category = require("../models/category_model");
const dropdown = require("../models/dropdown_model");
const Order = require("../models/order_model");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // uuid dependency use for generate local token
const { connection } = require("mongoose");
const { assert } = require("console");
const stripe= require("stripe")("sk_test_51PRIK1EW5BK3ySIAfU69jpX7tEwmVdAsX7iA9RXfOBWRNw8oWgIk2zNxbAta5CsqOmdJlaPEnvHOe7jgYdH7e2AB00l2d4Ltux");

// Disk storage (upload image code)
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const userAuth = async (req, res) => {
    try {
        const userData = req.userData;
        if (userData) {
            console.log("LoginUserData", userData);
            res.status(200).json(userData);
        } else {
            res.status(404).json({ msg: "Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userExist = await user.findOne({ email: email });
        if (!userExist) {
            const register = await user.create({ name, email, phone, password });
            if (register) {
                res.status(200).json({
                    msg: "Registration Done!",
                    token: await register.generateToken(),
                    userID: register._id.toString()
                });
            } else {
                res.status(404).json({ msg: "Registration Not Done!" });
            }
        } else {
            console.log("User Already Registered!");
            res.status(404).json({ msg: "User Already Registered!" });
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: "Server Error" });
    }
}

const login = async (req, res) => {

    try {
        console.log(req.body);
        const { email, password } = req.body;

        const userExist = await user.findOne({ email: email });

        if (userExist) {
            console.log("User Data", userExist);

            if (password == userExist.password) {
                res.status(200).json({
                    msg: "Login Successfully",
                    userID: userExist._id.toString(),
                    isAdmin: userExist.isAdmin,
                    token: await userExist.generateToken(),
                });
            }
            else {
                res.status(404).json({ msg: "Invalid Password!" });
            }
        }
        else {
            res.status(404).json({ msg: "Invalid Email!" });
        }
    } catch (error) {
        console.log("login", error);
    }
}

const profile = async (req, res) => {
    try {
        const data = req.userData;

        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ msg: "User Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const contact = async (req, res) => {
    try {
        const { cName, cEmail, cPhone, cMessage } = req.body;

        const success = await query.create({ cName, cEmail, cPhone, cMessage });
        if (success) {
            res.status(200).json({ msg: "Message Send Successfully" });
        } else {
            res.status(404).json({ msg: "Message Not Send!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await user.findOne({ email: email });

        if (userExist) {
            const update = await user.updateOne(
                { email: email },
                {
                    $set: {
                        password: password
                    }
                }
            );

            if (update) {
                res.status(200).json({ msg: "Password successfully updated" });
            }
        } else {
            res.status(404).json({ msg: "Invalid User" });
        }

    } catch (err) {
        console.log(err);
    }
}


// Product Controller
const allProducts = async (req, res) => {
    try {
        const productData = await product.find({});

        if (productData) {
            // console.log("All_Products",productData);
            // console.log("totalNumberOfProducts", productData.length);
            res.status(200).json(productData);
        }
        else {
            console.log("Product Data Not Found!");
            res.status(404).json({ msg: "Products Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllProductsInCart = async (req, res) => {
    try {
        const userData = req.userData;
        const data = await cart.find({ userEmail: userData.email });
        if (data) {
            // console.log("Cart_Products", data);
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ msg: "Your cart is currently empty" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteProductInCart = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const done = await cart.deleteOne({ _id: id });
            if (done) {
                res.status(200).json({ msg: "Remove Successfully" });
            } else {
                res.status(400).json({ msg: "Product not remove from cart" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}


const productDetails = async (req, res) => {
    try {
        const pToken = req.params.pToken;

        if (pToken) {
            const details = await product.findOne({ pToken: pToken });

            if (details) {
                res.status(200).json(details);
            } else {
                res.status(404).json({ msg: "Product details not found!" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}


// -------------------------------------------------------------------------------------------
const getFilteredProducts = async (req, res) => {
    try {
        const id= req.params.id;

        const data = await dropdown.findOne({ _id: id });

        if (data.cName == "SHOP BY USAGE") {
            const filterData = await product.find({ pUsage: data.ddName });
            // console.log(filterData);
            res.status(200).json(filterData);
        }
        else if (data.cName == "SHOP BY BRAND") {
            const filterData = await product.find({ pBrand: data.ddName });
            // console.log(filterData);
            res.status(200).json(filterData);
        }
        else if (data.cName == "SHOP BY PROCESSOR") {
            const filterData = await product.find({ pProcessor: data.ddName });
            // console.log(filterData);
            res.status(200).json(filterData);
        }
        else if (data.cName == "SHOP BY PRICE") {
            if (data.ddName == "Above 30000") {
                const filterData = await product.find({ pPrice: { $gt: 30000 } });
                res.status(200).json(filterData);
            } else if (data.ddName == "Under 25000") {
                const filterData = await product.find({ pPrice: { $lt: 25000 } });
                res.status(200).json(filterData);
            } else if (data.ddName == "Under 35000") {
                const filterData = await product.find({ pPrice: { $lt: 35000 } });
                res.status(200).json(filterData);
            } else if (data.ddName == "Above 35000") {
                const filterData = await product.find({ pPrice: { $gt: 35000 } });
                res.status(200).json(filterData);
            }
            else {
                const filterData = await product.find({ pPrice: { $lt: 30000 } });
                res.status(200).json(filterData);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

// const getFilteredProducts = async (req, res) => {
//     try {
//         const data = await dropdown.findOne({ _id: req.params.id });

//         let filterQuery = {};

//         switch (data.cName) {
//             case "SHOP BY USAGE":
//                 filterQuery = { pUsage: data.ddName };
//                 break;
//             case "SHOP BY BRAND":
//                 filterQuery = { pBrand: data.ddName };
//                 break;
//             case "SHOP BY PROCESSOR":
//                 filterQuery = { pProcessor: data.ddName };
//                 break;
//             case "SHOP BY PRICE":
//                 filterQuery = data.ddName === "Above 30,000" ? { pPrice: { $gt: 30000 } } : { pPrice: { $lt: 30000 } };
//                 break;
//         }

//         const filterData = await product.find(filterQuery);
//         res.status(200).json(filterData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
// ------------------------------------------------------------------------------------------------------

// Dropdown controller
const getDropdownDetails = async (req, res) => {
    try {
        const ddDetails = await dropdown.findOne({ _id: req.params.id });

        if (ddDetails) {
            res.status(200).json(ddDetails);
        } else {
            res.status(404).json({ msg: "Details not found" });
        }
    } catch (err) {
        console.log(err);
    }
}

const getDropdownMenu = async (req, res) => {
    try {
        const cToken = req.params.cToken;
        // console.log("categoryToken", cToken);

        const Details = await category.findOne({ cToken: cToken });
        // console.log("categoryDetails", Details);

        const ddDetails = await dropdown.find({ cName: Details.cName });
        // console.log("dropdownDetails", ddDetails);

        if (ddDetails) {
            // console.log("dropdown-details",ddDetails);
            res.status(200).json(ddDetails);
        } else {
            res.status(404).json({ msg: "Details not found" })
        }
    } catch (err) {
        console.log(err);
    }
}

// Category Controllers
const getAllCategory = async (req, res) => {
    try {
        const categoryData = await category.find();

        if (categoryData) {
            res.status(200).json(categoryData);
        }
        else {
            console.log("Category Data Not Found!");
            res.status(404).json({ msg: "Category Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}


// Placed order controller
const orderPlaced = async (req, res) => {
    try {
        const { order, localData } = req.body;
        const userID = req.userId.toString(); // Convert ObjectId to string
        const orderDetails = [];

        for (let i = 0; i < localData.length; i++) {
           
            if (localData[i][4] === userID) {

                // console.log("My Cart data",localData[i]);

                const orderDetail = {
                    oImage: localData[i][1], 
                    oDescription: localData[i][2],
                    oPrice: localData[i][3],
                    oQuantity: localData[i][5],
                    oStatus: "Order Confirmed"
                };
                orderDetails.push(orderDetail);
            } else {
                console.log("If part is not executed");
            }
        }

        // Construct the order object
        const newOrder = new Order({
            oUserID: userID,
            oPhone: order.oPhone,
            oName: order.oName,
            oPincode: order.oPincode,
            oState: order.oState,
            oCity: order.oCity,
            oAddress: order.oAddress,
            oDetails: orderDetails,
            
        });

        // Save the order to the database
        await newOrder.save();
        res.status(200).json({ msg: "Order placed" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const Myorders = async(req, res) =>{
    try{
        const uid= req.userId;

        const myorders= await Order.find({oUserID: uid});

        if(myorders){
            // console.log("My orders data found", myOrders);
            res.status(200).json(myorders);
        }else{
            console.log("My Orders data not found");
        }
    }catch(err){
        console.log(err);
    }
}


const cancleOrder = async (req, res) => {
    try {
        const oID = req.params.oID;
        const pID = req.params.pID;

        if (oID && pID) {
            // Find the order by ID and update the product status to "Cancelled"
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: oID, "oDetails._id": pID },
                { $set: { "oDetails.$.oStatus": "Cancelled" } }
            );

            if (updatedOrder) {
                res.status(200).json({ msg: "Order Cancelled" });
            } else {
                res.status(404).json({ msg: "Order not found or not cancelled" });
            }
        } else {
            res.status(400).json({ msg: "Missing order ID or product ID" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const BuyItNow = async(req, res) =>{
    try {
        const { order, productData } = req.body;
        const userID = req.userId.toString(); // Convert ObjectId to string
        const orderDetails = [];

        // for (let i = 0; i < localData.length; i++) {
           
            // if (localData[i][4] === userID) {

                // console.log("My Cart data",localData[i]);

                const orderDetail = {
                    oImage: productData[1], 
                    oDescription: productData[2],
                    oPrice: productData[3],
                    oQuantity: 1,
                    oStatus: "Order Confirmed"
                };
                orderDetails.push(orderDetail);
            // } else {
            //     console.log("If part is not executed");
            // }
        // }

        // Construct the order object
        const newOrder = new Order({
            oUserID: userID,
            oPhone: order.oPhone,
            oName: order.oName,
            oPincode: order.oPincode,
            oState: order.oState,
            oCity: order.oCity,
            oAddress: order.oAddress,
            oDetails: orderDetails,
            
        });

        // Save the order to the database
        await newOrder.save();
        res.status(200).json({ msg: "Order placed" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


// check out api
const createCheckoutSession= async(req, res)=>{
    try{
        const product = req.body;
        const user= req.userData;
        console.log(product);
        // console.log(user);

        const lineItems = product.map((productItem) => {
            if(user._id == productItem[4]){
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: productItem[2]
                        },
                        unit_amount: productItem[3] * 100 
                    },
                    quantity: productItem[5]
                };
            }
        }).filter(item => item !== undefined);
        
        

        const session= await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
                line_items: lineItems,
                mode:"payment",
                success_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancle"
        })

        res.status(200).json({id: session.id});
    }catch(err){
        console.log(err);
    }
}


module.exports = { signup, login, userAuth, getAllProductsInCart, profile, contact, updatePassword, deleteProductInCart, productDetails, getDropdownMenu, getFilteredProducts, getDropdownDetails, allProducts, getAllCategory, orderPlaced, Myorders, cancleOrder, BuyItNow, createCheckoutSession};