

exports.createProduct = async (req,res) => {
    try {
        const { product_name } = req.body
        const product_file = req.file;
        if (!product_name || !product_file) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
        
        return res.status(200).json({
            message: "Product created successfully",
            product_name: product_name,
            product_details:product_file
        })
        
    } catch (err) {
        console.log("error: ",err);
        
        return res.status(500).json({message:"Something went wrong! ",details:err})
    }
}