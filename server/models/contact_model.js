const mongoose= require("mongoose");

const contactSchama= new mongoose.Schema({
    cName: {
        type: String,
        required: true,
    },
    cEmail: {
        type: String,
        required: true,
    },
    cPhone:{
        type: Number,
        required: true,
    },
    cMessage:{
        type: String,
        required: true,
    }
},
{timestamps:true}
);

const contact= new mongoose.model("contact", contactSchama);

module.exports= contact;