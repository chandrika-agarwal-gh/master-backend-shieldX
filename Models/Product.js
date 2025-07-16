const mongoose=require('mongoose')
const Schema = mongoose.Schema
const cycleSchema = new Schema({
    dueDate: {
        type: Date,
        required: true
    },
    portfolios: {
        type: [{
            portfolio_name: String,
            portfolio_file_details: [{
                filename: String,
                path: String,
                uploadedAt:{type: Date, default: Date.now}
            } ]
        }],
        default:[]
    }
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

