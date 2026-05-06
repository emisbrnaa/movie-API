import Job from "../models/Job.js"
import Category from "../models/Category.js"
import User from "../models/User.js"

export const createJob = async (req, res) => {
    const { title, category, description, remote, salary, jobType,
        requirements, benefits, city, address, phone } = req.body
    try {

        const checkCategory = await Category.findById(category)
        if (!checkCategory) {
            return res.status(400).json({ message: "Category tidak ditemukan" })
        }

        const Jobs = await Job.create({
            title, category, description, remote, salary, jobType,
            requirements, benefits, city, address, phone, owner: req.user._id
        })
        res.status(201).json({
            message: "Berhasil Buat Pekerjaan Baru",
            job: Jobs
        })
    } catch (error) {
        res.status(400).json({
            message: "Error Validation",
            error: error.message
        })
        console.log(error);
    }
}

export const updateJob = async (req, res) => {
    const idParam = req.params.id;

    try {
        const updateData = await Job.findOneAndUpdate(
            { _id: idParam, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updateData) {
            return res.status(404).json({
                message: "Job tidak ditemukan atau bukan milik Anda"
            });
        }

        res.status(200).json({
            job: updateData
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validasi gagal",
                error: error.errors
            });
        }
        res.status(500).json({
            message: "Server error", error: error.message
        });
    }
};


export const allJobs = async (req, res) => {
    try {
        const dataJob = await Job.find()
            .populate("category", "_id name");

        res.status(200).json({
            message: "Tampil List Pekerjaan",
            data: dataJob
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const singleJob = async (req, res) => {
    const idParam = req.params.id
    try {
        const dataJob = await Job.findById(idParam)
            .populate("category", "_id name")
            .populate("owner", "_id name email");

        if (!dataJob) {
            return res.status(404).json({
                message: "Pekerjaan Tidak Ditemukan"
            })
        }
        else {
            res.status(200).json({
                message: "Detail Pekerjaan",
                data: dataJob
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const deleteJob = async (req, res) => {
    let idParam = req.params.id
    try {
        let dataJob = await Job.findOneAndDelete({
            _id: idParam,
            owner: req.user._id
        });

        if (!dataJob) {
            return res.status(404).json({
                message: "Pekerjaan Tidak Ditemukan"
            })
        }

        res.json({
            message: "Berhasil Hapus Pekerjaan"
        })
    } catch (error) {
        res.status(404).json({
            message: "data tidak ditemukan"
        })
    }
}

export const getJobsByOwner = async (req, res) => {
    const ownerId = req.user._id
    try {
        const dataJob = await Job.find({ owner: ownerId })


        if (!dataJob) {
            return res.status(404).json({
                message: "Pekerjaan Tidak Ditemukan"
            })
        }
        else {
            res.status(200).json({
                message: "List Job Owner",
                job: dataJob
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const detailJobsByOwner = async (req, res) => {
    const ownerId = req.user._id
    const idParam = req.params.id
    try {
        const dataJob = await Job.findOne({ _id: idParam, owner: ownerId })
            .populate({
                path: "listApply",
                populate: {
                    path: "user",
                    select: "name email"
                },
                select: "user job fullname resumeUrl contactPhone"
            });
        if (!dataJob) {
            return res.status(404).json({
                message: "Pekerjaan Tidak Ditemukan"
            })
        }
        else {
            res.status(200).json({
                message: "Detail Job Owner",
                job: dataJob
            })
        }
    } catch (error) {

    }
}