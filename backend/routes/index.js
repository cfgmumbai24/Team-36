const express =require("express")
const router = express.Router();

router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))
router.get('/', (req, res)=> {
    res.send('heelo');
})

module.exports=router;

