const mongoose= require("mongoose");
const JWT= require("jsonwebtoken");

const signupSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
);

// JWT generation code
signupSchema.methods.generateToken= function(){
    try{
        return JWT.sign(
            {
                //payload
                userID: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            //signature
            process.env.PRIVATE_KEY,
            {                           
                //expires
                expiresIn: "1d"
            }
        )
    }catch(err){
        console.log(err);
    }
}

const user= new mongoose.model("register", signupSchema);

module.exports= user;