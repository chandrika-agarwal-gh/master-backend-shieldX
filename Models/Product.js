const mongoose=require('mongoose')
const Schema = mongoose.Schema
const cycleSchema = new Schema({
    dueDate: {
        type: Date,
        required: true
    },
    portfolios: [{
        portfolio_name: String,
        portfolio_files: [String]
    }]
},{timestamps:true})
const addProduct = new Schema({
    product_name: {
        type: String,
        required:true
    },
    totalOutstanding: {
        type: Number,
        default:0
    },
    totalAccounts: {
        type: Number,
        default:0
    },
    cycles: {
        type: [cycleSchema],
        default:[]
    }
    
}, { timestamps: true })

module.exports=mongoose.model('Products',addProduct)

