const express=require("express")
const router=express.Router()
const clusterController=require("../controllers/clusterController")

router.post('/addProduct', clusterController.addProduct);

module.exports=router;