const express=require('express')
const router=express.Router()
const prodController = require('../Controllers/productController')
const upload=require('../middlewares/multer')
router.post("/add-product", upload.single('product_file') ,prodController.createProduct)

module.exports = router;