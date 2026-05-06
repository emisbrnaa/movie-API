import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobSchema = new Schema({
    title: {
        required: [true, "Title is required"],
        type: String,
    },

    category: {
        required: [true, "Category is required"],
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    description: {
        required: [true, "Description is required"],
        type: String,
    },

    remote: {
        required: [true, "Remote is required"],
        type: Boolean,
    },

    salary: {
        required: [true, "Salary is required"],
        type: Number,
    },

    jobType: {
        type: String,
        required: [true, "Job Type is required"],
        enum: ["fulltime", "parttime", "contract"],
        default: "fulltime",
    },

    requirements: {
        required: [true, "Requirements is required"],
        type: String,
    },

    benefits: {
        required: [true, "Benefits is required"],
        type: String,
    },

    city: {
        required: [true, "City is required"],
        type: String,
    },

    address: {
        required: [true, "Address is required"],
        type: String,
    },

    phone: {
        required: [true, "Phone is required"],
        type: String,
    },

    owner: {
        required: [true, "Owner is required"],
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    toJSON: { virtuals: false },
    toObject: { virtuals: false },
}
);

JobSchema.virtual("listApply", {
    ref: "ApplyJob",
    localField: "_id",
    foreignField: "job"
});



const Job = mongoose.model('Job', JobSchema)
export default Job