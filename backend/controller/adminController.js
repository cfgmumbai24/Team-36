const Admin =require("../models/admin")

module.exports.addClusterAdmin=async function(req,res){
    try{
            var name= req.body.name
            var email =req.body.email
            var phone_no= req.body.phone_no
            var password =req.body.password
            var role= req.body.role

            let clusterAdmin=await Admin.create({
                name:name,
                email:email,
                phone_no:phone_no,
                password:password,
                role:role
            })
            res.status(200).json(clusterAdmin);
    }
    catch(err){
        console.log(err)
    }
}