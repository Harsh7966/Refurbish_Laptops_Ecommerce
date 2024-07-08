const mongoose= require("mongoose");

const dropdownSchema= new mongoose.Schema({
    ddName: {
        type: String,
        required: true,
    },
    ddImage:{
        data: Buffer,
        contentType: String,
    },
    cName:{
        type: String,
        required: true,
    },
},
{timestamps: true}
);

const dropdown= new mongoose.model("dropdown", dropdownSchema);

module.exports= dropdown;