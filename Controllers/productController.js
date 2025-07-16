const { default: mongoose } = require('mongoose');
const addProduct = require('../Models/Product')
const xlsx=require('xlsx')
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
        const portfolio_files=req.files
        const productId = new mongoose.Types.ObjectId(product_id)
        const cycleId=new mongoose.Types.ObjectId(cycle_id)
        if (!productId) {
            return res.status(404).json({message:"Product not found"})
        }
        if (!portfolio_name || !portfolio_files) {
            return res.status(400).json({ message: "Please provide the required fields" });
        }
        const product = await addProduct.findOne({
            _id: productId,
            "cycles._id":cycleId
        })
        const requestedCycle = product.cycles.find(c => c._id.equals(cycleId))
      
        const fileInfos = portfolio_files.map(file => ({
            filename: file.filename,
            path: file.path,
            uploadedAt: new Date()
        }))
       requestedCycle.portfolios.push({ portfolio_name: portfolio_name,portfolio_file_details:fileInfos})
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        await product.save()
       
        return res.status(200).json({ message: "Required Cycle", product, portfolio_name, requestedCycle, portfolios:requestedCycle.portfolios })
    } catch (err) {
        console.log("Error adding portfolio: ",err);
        return res.status(500).json({message:"Something went wrong ",details:err})
        
    }
}

const extractData = async (req, res) => {
    try {
        const { product_id, cycle_id, portfolio_id } = req.body
        const productId = new mongoose.Types.ObjectId(product_id)
        const cycleId = new mongoose.Types.ObjectId(cycle_id)
        const portfolioId = new mongoose.Types.ObjectId(portfolio_id)
        const product = await addProduct.findOne({
            _id: productId,
            "cycles._id": cycleId,
            "cycles.portfolios._id":portfolioId
        })
        const requestedCycle = product.cycles.find(c => c._id.equals(cycleId))
        const portfolios = requestedCycle.portfolios.find(p => p._id.equals(portfolioId))
        const files = portfolios.portfolio_file_details
        
        
        
        return res.status(200).json({message:"Data extracted successfully! ",product,portfolio_details:portfolios,file_details:files})
} catch (err) {
        console.log("Error extracting data: ",err);
        return res.status(500).json({ message:"Error extracting data ",details:err})
    }
}
module.exports = {
    createProduct,
    newCycle,
    createPortfolio,
    extractData
}