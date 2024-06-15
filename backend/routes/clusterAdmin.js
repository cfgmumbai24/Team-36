const express=require("express")
const router=express.Router()
const clusterController=require("../controllers/clusterController")

router.post('/addProduct', clusterController.addProduct);
router.get('/getProducts', clusterController.getProducts);
module.exports=router;