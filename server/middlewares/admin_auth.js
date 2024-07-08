
// AdminAuth middleware
const AdminAuth = async(req, res, next) => {
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        console.log("This is admin");
        next();
    } else {
        console.log("This is not admin!");
        return res.status(403).json({ msg: "Forbidden" });
    }
}

module.exports = AdminAuth;
