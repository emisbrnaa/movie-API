import mongoose from 'mongoose';
const { Schema } = mongoose;

const ApplyJobSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",  
        required: true,
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    }

});


const ApplyJob = mongoose.model('ApplyJob', ApplyJobSchema)
export default ApplyJob