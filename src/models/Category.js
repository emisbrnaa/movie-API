import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        required: [true, "Name is required"],
        type: String,
    },

    description: {
        required: [true, "Description is required"],
        type: String,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: false },
    toObject: { virtuals: false },
}

);

CategorySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'category',
});



const Category = mongoose.model('Category', CategorySchema)
export default Category