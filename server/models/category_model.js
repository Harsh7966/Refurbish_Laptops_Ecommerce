const mongoose= require("mongoose");

const categorySchema= new mongoose.Schema({
    cName: {
        type: String,
        required: true,
    },
    cDescription:{
        type: String,
        required: true,
    },
    cToken:{
        type: String,
        required: true,
    }
},
{timestamps: true}
);

const category= new mongoose.model("category", categorySchema);

module.exports= category;