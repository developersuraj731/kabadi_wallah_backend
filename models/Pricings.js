import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    minPrice: {
        type: Number,
        required: true,
        min: 0
    },
    maxPrice: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function(value) {
                return value >= this.minPrice;
            },
            message: 'maxPrice must be greater than or equal to minPrice'
        }
    }
}, { timestamps: true, collection: 'Pricing' });

const Pricing = mongoose.model("Pricing", pricingSchema);

export default Pricing;
