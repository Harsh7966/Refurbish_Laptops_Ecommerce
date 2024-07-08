const mongoose= require("mongoose");

const cartSchema= new mongoose.Schema({
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
    userEmail: {
        type: String,
        required: true,
    },
    pToken: {
        type: String,
        required: true,
    }

},
{timestamps: true}
);

const cart= new mongoose.model("cart", cartSchema);

module.exports= cart;