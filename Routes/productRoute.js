const express=require('express')
const router=express.Router()
const prodController = require('../Controllers/productController')
router.post("/add-product", prodController.createProduct)
router.post('/add-cycles', prodController.newCycle)
router.post('/add-portfolio',prodController.createPortfolio)
module.exports = router;