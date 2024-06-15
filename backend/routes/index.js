const express =require("express")
const router = require("express").Router();

const admin=require("../models/admin");

router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))
router.get('/', (req, res)=> {
    res.send('heelo');
})

module.exports=router;

