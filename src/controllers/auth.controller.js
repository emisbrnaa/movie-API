import User from "../models/User.js"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = await User.create({
            name, email, password
        })
        res.status(201).json({
            message: "Register Berhasil",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email

            },
        })
    } catch (error) {
        res.status(400).json({
            message: "Error Validation",
            error: error.message
        })
        console.log(error);

    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({
                message: "User tidak ditemukan"
            })
        }

        const matched = await user.comparePassword(password);

        if (!matched) {
            return res.status(400).json({
                message: "Email dan Password tidak cocok"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getUser = async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate({
            path: "jobApply",
            populate: {
                path: "job",
                select: "title"
            }
        });
    res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            jobApply: user.jobApply ? user.jobApply.length : 0 
        }
    });
}