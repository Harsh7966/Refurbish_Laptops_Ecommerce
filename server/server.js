require("dotenv").config();
const express= require("express");
const bodyParser= require("body-parser");
const connectDB= require("./utils/db");
const userRoute= require("./router/user_router");
const adminRoute= require("./router/admin_router");
const cors= require("cors");
const obj= express();
const multer = require('multer');

//Handling the cors policy
const corsOption= {
    origin: "http://localhost:3000",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
obj.use(cors(corsOption));

// Increase maximum request size limit (e.g., 50MB)
obj.use(bodyParser.json({ limit: '50mb' }));
obj.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static folder access
obj.use("/uploads", express.static("uploads"));

// Routes
obj.use("/api/user", userRoute);
obj.use("/api/admin", adminRoute);

const PORT= process.env.PORT;
connectDB().then(()=>{
    obj.listen(PORT, ()=>{
        console.log(`Server run on port ${PORT}`);
    })
})

