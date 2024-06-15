const express =require("express")
const router = express.Router();

router.use("/masterAdmin", require("./masterAdmin")); //checked
router.use("/subAdmin", require("./subAdmin")); //checked
router.use('/clusterAdmin', require("./clusterAdmin")); //checked
router.use('/user', require("./user")); //checked

router.get('/', (req, res)=> {
    res.send('Home Page');
})

module.exports=router