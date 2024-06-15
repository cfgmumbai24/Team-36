const Admin =require("../models/admin")

module.exports.checkUser=async function(req,res){
    try {
        const { email, password, role } = req.body; // Extract email, password, and role from the request body

        // Find the user by email, password, and role
        let user = await Admin.findOne({
            email: email,
            password: password,
            role: role
        });

        if (user) {
            // User found
            return res.status(200).json({ message: 'User found successfully', user });
        } else {
            // User not found
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while checking the user." });
    }
}