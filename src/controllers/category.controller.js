import Category from "../models/Category.js"
export const createCategory = async (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        })
    }
    else {
        try {
            let category = await Category.create({
                name, description
            })
            res.status(201).json(category);

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export const allCategory = async (req, res) => {
    try {
        const dataCategory = await Category.find()

        res.status(200).json({
            message: "Tampil Semua Category",
            categories: dataCategory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const singleCategory = async (req, res) => {
    const idParam = req.params.id
    try {
        const dataCategory = await Category.findById(idParam)

        if (!dataCategory) {
            return res.status(404).json({
                message: "kategori tidak ditemukan"
            })
        }
        res.status(200).json({
            message: "Detail data category",
            category: dataCategory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateCategory = async (req, res) => {
    const idParam = req.params.id
    const { name, description } = req.body

    if (!name || !description) {
        return res.status(400).json({
            message: "Semua field harus diisi"
        })
    }
    else {
        try {
            let category = await Category.findById(idParam)

            if (!category) {
                return res.status(404).json({
                    message: "kategori tidak ditemukan"
                })
            }

            category.name = name
            category.description = description
            await category.save()

            res.status(200).json({
                category: category,
            })
        } catch (err) {
            if (err.errors) {
                res.status(500).json(err.errors)
            } else {
                res.status(404).json({ message: "data tidak ditemukan" })
            }
        }
    }
}

export const deleteCategory = async (req, res) => {
    const idParam = req.params.id
    try {
        let category = await Category.findById(idParam)
        if (!category) {
            return res.status(404).json({
                message: "kategori tidak ditemukan"
            })
        }
        await category.deleteOne()

        res.json({ message: "Berhasil Hapus" })
    } catch (err) {
        res.status(404).json({ message: "data tidak ditemukan" })
    }
}