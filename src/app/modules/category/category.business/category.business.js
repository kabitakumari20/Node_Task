const { models } = require("mongoose")
const { Category } = require("../category.model/category.model")
const mongoose = require('mongoose');
const createCategory = async (req, res) => {
    try {
        let newCategory = new Category(req.body);
        let data = await newCategory.save();
        if (!data) throw "Data not saved";

        res.status(200).json({
            msg: "Category created successfully.",
            result: data
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const findCategory = await Category.find();

        if (!findCategory) {
            return res.status(404).json({
                msg: "Category not found"
            });
        }

        return res.status(200).json({
            msg: "ok",
            count: findCategory.length,
            result: findCategory
        });
    } catch (error) {
        console.error("Error in getAllCategory function:", error);
        return res.status(500).json({
            msg: "An error occurred",
            error: error.toString()
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        let id = req.query.id;
        console.log("id=======>>", id)
        const findCategory = await Category.findById(id);

        if (!findCategory) {
            return res.status(404).json({
                msg: "Category not found"
            });
        }

        return res.status(200).json({
            msg: "ok",
            count: findCategory.length,
            result: findCategory
        });
    } catch (error) {
        console.error("Error in getAllCategory function:", error);
        return res.status(500).json({
            msg: "An error occurred",
            error: error.toString()
        });
    }
};



const updateCategory = async (req, res) => {
    let id = req.query.id
    let findCategory = await Category.findByIdAndUpdate(id, { $set: body }, { new: true })
    if (!findCategory) throw "category not found"
    res.send(200).json({
        msg: "category updated successfully",
        result: findCategory
    })
}


const deleteCategoryById = async (req, res) => {
    let id = req.query.id
    let findData = await Category.findByIdAndDelete(id)
    if (!findData) throw "category delete successfully"
    res.send(200).json({
        msg: "category deleted successfully"
    })
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById
}