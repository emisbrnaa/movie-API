import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    name: {
        required: [true, "Name is required"],
        type: String,
        unique: [true, "Name must be unique"],
        trim: true,
        minLength: [5, "Name must be at least 5 characters"]
    },

    email: {
        required: [true, "Email is required"],
        type: String,
        unique: [true, "Email must be unique"],
        trim: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"]
    },

    password: {
        required: [true, "Name is required"],
        type: String,
        minLength: [6, "Password must be at least 6 characters"]
    }
})

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


UserSchema.virtual("jobApply", {
  ref: "ApplyJob",
  localField: "_id",   
  foreignField: "user"  
});


const User = mongoose.model('User', UserSchema)
export default User