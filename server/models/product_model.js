const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    pName: {
        type: String,
        required: true,
    },
    pBrand: {
        type: String,
        required: true,
    },
    pProcessor: {
        type: String,
        required: true,
    },
    pUsage: {
        type: String,
        required: true,
    },
    pDescription: {
        type: String,
        required: true,
    },
    pPrice: {
        type: Number,
        required: true,
    },
    pImage: {
        data: Buffer,
        contentType: String,
    },
    pStock: {
        type: Number,
        required: true,
    },
    pWarranty:{
        type: Number,
        required: true,
    },
    pToken:{
        type: String,
        required: true,
    }

},
{timestamps: true}
);

const product= new mongoose.model("product", productSchema);

module.exports= product;