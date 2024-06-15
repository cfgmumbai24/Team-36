const express=require("express")
const router=express.Router()
const masterAdminController=require("../controllers/masterAdminController")

router.post('/addAdmin', masterAdminController.addAdmin);
router.post('/masterApproval', masterAdminController.masterApproval);
router.post('/deleteProduct', masterAdminController.deleteProduct);

module.exports=router;