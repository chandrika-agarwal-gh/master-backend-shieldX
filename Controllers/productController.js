const { default: mongoose } = require('mongoose');
const addProduct = require('../Models/Product')
const createProduct = async (req,res) => {
    try {
        console.log(req.body);
        
        const { product_name } = req.body       
        if (!product_name) {
            return res.status(400).json({ message: "Please select a product" });
        }
        let existingProduct = await addProduct.findOne({ product_name })
        if (existingProduct) {
            return res.status(500).json({message:"Product already present"})
        }
        const newProduct = new addProduct({
            product_name
        })
        await newProduct.save()
        return res.status(200).json({
            message: "Product created successfully",newProduct          
        })

        
    } catch (err) {
        console.log("error: ",err);
        
        return res.status(500).json({message:"Something went wrong! ",details:err})
    }
}

const newCycle = async (req, res) => {
    try {
        let { dueDate, product_id } = req.body
        const productId=new mongoose.Types.ObjectId(product_id)
        if (!dueDate) {
            return res.status(400).json({ message: "Please select a date" });
        }
        const product = await addProduct.findById(productId)
        if (product.cycles.length <= 28) {
            product.cycles.push({ dueDate: new Date(dueDate) })
        } else {
            return res.status(500).json({ message: "Maximum cycles limit reached ", details: err })
        }
        await product.save()
        if (product_id) {
            return res.status(200).json({
                message: "Cycle created successfully",
                product
            })
        }
        await product.save()
        
    } catch (err) {
        console.log("error: ", err);
        return res.status(500).json({ message: "Something went wrong! ", details: err })
    }
}

const createPortfolio = async (req, res) => {
    try {
        const { product_id, cycle_id, portfolio_name } = req.body
        const productId = new mongoose.Types.ObjectId(product_id)
        const cycleId=new mongoose.Types.ObjectId(cycle_id)
        if (!productId) {
            return res.status(404).json({message:"Product not found"})
        }
        if (!portfolio_name) {
            return res.status(400).json({ message: "Please select a portfolio" });
        }
        const product = await addProduct.findOne({
            _id: productId,
            "cycles._id":cycleId
        })
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
       
        return res.status(200).json({message:"Required Cycle", product,cycle,portfolio_name})
        // await product.cycles.portfolio_name
    } catch (err) {
        console.log("Error adding portfolio: ",err);
        return res.status(500).json({message:"Something went wrong ",details:err})
        
    }
}
module.exports = {
    createProduct,
    newCycle,
    createPortfolio
}