const mongoose= require("mongoose");
 
const orderSchema= new mongoose.Schema({
    oUserID: {
        type: String,
        required: true,
    },
    oPhone:{
        type: Number,
        required: true,
    },
    oName:{
        type: String,
        required: true,
    },
    oPincode:{
        type: Number,
        required: true,
    },
    oState:{
        type: String,
        required: true,
    },
    oCity:{
        type: String,
        required: true,
    },
    oAddress:{
        type: String,
        required: true,
    },
    oDetails: [{
        oImage: {
            data: Buffer,
            contentType: String
        },
        oDescription: {
            type: String,
            required: true
        },
        oPrice: {
            type: Number,
            required: true
        },
        oQuantity: {
            type: Number,
            required: true
        },
        oStatus: {
            type: String,
            required: true,
        }
    }],

},
{timestamps: true});

const order= new mongoose.model("order",orderSchema);

module.exports= order;

