const express =require("express")
const router = express.Router();

const homeController = require("../controllers/homeController")

router.use("/masterAdmin", require("./masterAdmin")); //checked
router.use("/subAdmin", require("./subAdmin")); //checked
router.use('/clusterAdmin', require("./clusterAdmin")); //checked
router.use('/user', require("./user")); //checked
router.get('/getProducts', homeController.getProducts);

router.get('/', (req, res)=> {
    res.send('Home Page');
})

module.exports=router