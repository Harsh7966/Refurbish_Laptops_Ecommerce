const user = require("../models/signUp_model");
const product = require("../models/product_model");
const category = require("../models/category_model");
const dropdown = require("../models/dropdown_model");
const contact = require("../models/contact_model");
const Order = require("../models/order_model");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // uuid dependency use for generate local token


// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// Disk storage (upload image code)
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});


// User Controller
const userdata = async (req, res) => {
    try {
        const userData = await user.find({}, { password: 0 });

        if (userData) {
            console.log(userData);
            res.status(200).json(userData);
        }
        else {
            console.log("Users Data Not Found!");
            res.status(404).json({ msg: "Users Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("user_is", id);

        const singleUserData = await user.findOne({ _id: id });

        if (singleUserData) {
            res.status(200).json(singleUserData);
        } else {
            res.status(404).json({ msg: "Data not found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("idForDelete", id);
        const userData = await user.deleteOne({ _id: id });

        if (userData) {
            res.status(200).json({ msg: "Delete Successfully!" });
        } else {
            res.status(404).json({ msg: "Data Not Deleted!" })
        }
    } catch (err) {
        console.log(err);
    }
}

const updateUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        console.log("idForUpdate", id);

        if (id) {
            const updateData = await user.updateOne(
                { _id: id },
                {
                    $set: newData
                }
            )

            if (updateData) {
                res.status(200).json({ msg: "Update Successfully!" })
            }
            else {
                res.status(404).json({ msg: "Data Not Update!" })
            }
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

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const getData = await product.findOne({ _id: id });

        if (getData) {
            // console.log("Product Data By Id", getData);
            res.status(200).json(getData);
            // console.log(getData);
        } else {
            console.log("Product Data Not Found");
            res.status(404).json({ mag: "Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const addProduct = async (req, res) => {
    const upload = multer({
        storage: Storage
    }).single("pImage");

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(404).json({ msg: "Error uploading file" });
            } else {
                const localToken = uuidv4();
                const pImage = new product({
                    pName: req.body.pName,
                    pBrand: req.body.pBrand,
                    pProcessor: req.body.pProcessor,
                    pUsage: req.body.pUsage,
                    pDescription: req.body.pDescription,
                    pPrice: req.body.pPrice,
                    pImage: {
                        data: fs.readFileSync("uploads/" + req.file.filename),
                        contentType: "image/png"
                    },
                    pStock: req.body.pStock,
                    pWarranty: req.body.pWarranty,
                    pToken: localToken,
                });

                try {
                    const savedProduct = await pImage.save();
                    if (savedProduct) {
                        return res.status(200).json({ msg: "Product Added Successfully!" });
                        console.log("", pImage)
                    } else {
                        return res.status(404).json({ msg: "Product Not Added!" });
                    }
                } catch (error) {
                    console.log(error);

                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteProduct = await product.deleteOne({ _id: id });
        if (deleteProduct) {
            console.log("Product Deleted Successfully!");
            res.status(200).json({ msg: "Product Deleted Successfully!" });
        }
        else {
            console.log("Product Not Deleted!");
            res.status(404).json({ msg: "Product Not Deleted!" });
        }
    } catch (err) {
        console.log(err);
    }
}

// const updateProduct = async (req, res) =>{
//     try{
//         const id= req.params.id;
//         const newData= req.body;
//         console.log("productID", id);
//         console.log("Updated_data", newData);

//         if (id) {
//             const updateData = await product.updateOne(
//                 { _id: id },
//                 {
//                     $set: newData
//                 }
//             )

//             if (updateData) {
//                 console.log("Updated Successfully!");
//                 res.status(200).json({ msg: "Updated Successfully!" });
//             } else {
//                 console.log("Data Not Updated!");
//                 res.status(404).json({ msg: "Data Not Updated!" });
//             }
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

const updateProductInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const updateInfo = req.body;

        // Perform update operation using updateInfo and id
        const updatedProduct = await product.findOneAndUpdate(
            { _id: id },
            { $set: updateInfo },
            { new: true } // To return the updated document
        );

        if (updatedProduct) {
            console.log("Product updated successfully!");
            return res.status(200).json({ msg: "Product updated successfully!", updatedProduct });
        } else {
            console.log("Data Not Updated!");
            return res.status(404).json({ msg: "Data Not Updated!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const updatepImg = async(req, res) =>{
    const upload = multer({
        storage: Storage
    }).single("pImage");

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "Failed to upload image" });
            } else {
                try {
                    const id = req.params.id;

                    const updateImg = await product.findById(id);

                    if (!updateImg) {
                        return res.status(404).json({ msg: "Product not found" });
                    }

                    updateImg.pImage = {
                        data: fs.readFileSync("uploads/" + req.file.filename),
                        contentType: "image/png"
                    };

                    await updateImg.save();

                    res.status(200).json({ msg: "Update Successfully!" });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "Internal server error" });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
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

const addCategory = async (req, res) => {

    try {
        const cToken = uuidv4();
        const { cName, cDescription } = req.body;

        const done = await category.create({ cName, cDescription, cToken });

        if (done) {
            res.status(200).json({ msg: "Category added successfully!" });
        } else {
            res.status(404).json({ msg: "Category not added!" });
        }

    } catch (err) {
        console.log(err);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await category.deleteOne({ _id: id });

        if (deleteData) {
            console.log("Delete Successfully!");
            res.status(200).json({ msg: "Delete Successfully!" });
        }
        else {
            console.log("Data Not Deleted!");
            res.status(200).json({ msg: "Data Not Deleted!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await category.findOne({ _id: id });

        if (data) {
            console.log(data);
            res.status(200).json(data);
        }
        else {
            console.log("Category Data Not Found!");
            res.status(404).json({ msg: "Category Data Not Found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        if (id) {
            const updateData = await category.updateOne(
                { _id: id },
                {
                    $set: newData
                }
            )

            if (updateData) {
                console.log("Updated Successfully!");
                res.status(200).json({ msg: "Updated Successfully!" });
            } else {
                console.log("Data Not Updated!");
                res.status(404).json({ msg: "Data Not Updated!" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// Drop down controllers
const addDropdownDetails = async (req, res) => {
    const upload = multer({
        storage: Storage
    }).single("ddImage");

    try {

        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            } else {
                // const localToken= uuidv4();
                const ddDetails = new dropdown({
                    ddName: req.body.ddName,
                    ddImage: {
                        data: fs.readFileSync("uploads/" + req.file.filename),
                        contentType: "image/png"
                    },
                    cName: req.body.cName,
                })


                if (ddDetails) {
                    ddDetails.save()
                    res.status(200).json({ msg: "Dropdown menu added Successfully!" });
                } else {
                    res.status(404).json({ msg: "Dropdown Not Added!" });
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const getAllDropdown = async (req, res) => {
    try {
        const data = await dropdown.find({});
        if (data) {
            // console.log("allDDdetails", data);
            res.status(200).json(data);
        } else {
            res.status(404).json({ msg: "Data not found" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteDropdown = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const done = await dropdown.deleteOne({ _id: id });
            if (done) {
                res.status(200).json({ msg: "Dropdown deleted successfully" });
            } else {
                res.status(404).json({ msg: "Dropdown not deleted" })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getDropdownById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dropdown.findOne({ _id: id });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ msg: "Data not found!" });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateDDInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const update = await dropdown.updateOne(
            { _id: id },
            { $set: updateData }
        );

        if (update) {
            res.status(200).json({ msg: "Update Successfully!" })
        } else {
            res.status(404).json({ msg: "Not updated" });
        }
    } catch (err) {
        console.log("Server error");
    }
}

const updateDDImg = async (req, res) => {
    const upload = multer({
        storage: Storage
    }).single("ddImage");

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "Failed to upload image" });
            } else {
                try {
                    const id = req.params.id;

                    const updateImg = await dropdown.findById(id);

                    if (!updateImg) {
                        return res.status(404).json({ msg: "Dropdown not found" });
                    }

                    updateImg.ddImage = {
                        data: fs.readFileSync("uploads/" + req.file.filename),
                        contentType: "image/png"
                    };

                    await updateImg.save();

                    res.status(200).json({ msg: "Update Successfully!" });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ msg: "Internal server error" });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const getAllCustomerQuery = async (req, res) => {
    try {
        const data = await contact.find({});
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ msg: "Data not found" });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteCustomerQueryById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const done = await contact.deleteOne({ _id: id });
            if (done) {
                res.status(200).json({ msg: "Contact Deleted Successfully" })
            } else {
                res.status(404).json({ msg: "Contact Not Deleted" })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// orders controller
const allOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});

        if (allOrders) {
            res.status(200).json(allOrders);
        } else {
            res.status(404).json({ msg: "All orders not found!" });
        }
    } catch (err) {
        console.log(err);
    }
}


const orderDelivered = async (req, res) => {
    try {
        const oID = req.params.oID;
        const pID = req.params.pID;

        if (oID && pID) {
            // Find the order by ID and update the product status to "Cancelled"
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: oID, "oDetails._id": pID },
                { $set: { "oDetails.$.oStatus": "Delivered" } }
            );

            if (updatedOrder) {
                res.status(200).json({ msg: "Order Delivered" });
            } else {
                res.status(404).json({ msg: "Order not found or not delivered" });
            }
        } else {
            res.status(400).json({ msg: "Missing order ID or product ID" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


const orderDelete = async (req, res) => {
    try {
        const oID = req.params.oID;
        const pID = req.params.pID;

        if (oID && pID) {
            // Find the order by ID and update the order by removing the product with matching pID
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: oID },
                { $pull: { oDetails: { _id: pID } } },
                { new: true } // To return the updated document
            );

            if (updatedOrder) {
                res.status(200).json({ msg: "Product Deleted from Order" });
            } else {
                res.status(404).json({ msg: "Order not found or product not deleted" });
            }
        } else {
            res.status(400).json({ msg: "Missing order ID or product ID" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = { userdata, deleteUserById, getUserById, updateUserData, addProduct, addCategory, getAllCategory, deleteCategory, getCategoryById, updateCategory, allProducts, deleteProduct, getProductById, updateProductInfo, addDropdownDetails, getAllDropdown, deleteDropdown, getDropdownById, getAllCustomerQuery, deleteCustomerQueryById, allOrders, orderDelivered, orderDelete, updateDDInfo, updateDDImg, updatepImg };


