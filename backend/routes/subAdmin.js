const express=require("express")
const router=express.Router()
const subAdminController=require("../controllers/subAdminController")

router.post('/updateProduct', subAdminController.updateProduct);
router.post('/updateQuantity', subAdminController.updateQuantity);
router.post('/deleteProduct', subAdminController.deleteProduct);

module.exports=router;