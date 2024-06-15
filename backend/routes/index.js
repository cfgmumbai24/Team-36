const express =require("express")
const router = require("express").Router();

const admin=require("../models/admin");

router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))
// router.use("/masterAdmin",require("./admin"))


module.exports=router;

