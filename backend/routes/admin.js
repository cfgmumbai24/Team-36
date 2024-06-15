const express=require("express")
const router=express.Router()
const controller=require("../controller/adminController")

router.post('/addClusterAdmin',
    controller.addClusterAdmin
);

module.exports=router;