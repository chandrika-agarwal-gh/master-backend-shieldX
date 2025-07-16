const express=require('express')
const router=express.Router()
const prodController = require('../Controllers/productController')
const upload=require('../middlewares/multer')
router.post("/add-product", prodController.createProduct)
router.post('/add-cycles', prodController.newCycle)
router.post('/add-portfolio', upload.array('portfolio_files'), prodController.createPortfolio)
router.post('/extract-data',prodController.extractData)
module.exports = router;