
// userAuthentication middleware
const JWT = require("jsonwebtoken");
const user = require("../models/signUp_model");

const userAuthentication = async (req, res, next) => {
    const token = req.header("Authorization");
    try {
        if (!token) {
            console.log("Token not found");
            return res.status(401).json({ msg: "Token not found" });
        }

        const jwtToken = token.replace("Bearer", "").trim();

        try {
            const jwtVerify = JWT.verify(jwtToken, process.env.PRIVATE_KEY);
            if (jwtVerify) {
                console.log("JWT_Token", jwtVerify);
                const userData = await user.findOne({ email: jwtVerify.email });

                req.userData = userData;
                req.userToken = token;
                req.userId = userData._id;
                req.isAdmin = userData.isAdmin; // Set isAdmin property based on user's role

                console.log("Login_User_Data_Found", userData);
                next();
            } else {
                console.log("Invalid Token!");
                return res.status(401).json({ msg: "Invalid Token" });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = userAuthentication;
