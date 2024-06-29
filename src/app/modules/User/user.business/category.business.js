const { models } = require("mongoose")
const { Category } = require("../user.model/user.model")

const createCategory = async (req, res) => {
    try {
        console.log("req.body==========>>", req.body);
        let newCategory = new Category(req.body);
        let data = await newCategory.save();
        if (!data) throw "Data not saved";

        res.status(200).json({
            msg: "Category created successfully.",
            result: data
        });
    } catch (error) {
        console.log("error=========", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getAllCategory1 = async (req, res) => {
    try {
        let findCategory = await Category.find();
        if (!findCategory || findCategory.length === 0) {
            return res.status(404).json({
                msg: "No categories found"
            });
        }
        res.status(200).json({
            msg: "Found category list",
            count: findCategory.length,
            result: findCategory
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getAllCategory = async (req, res) => {
    try {
        let categoriesWithQuestions = await Category.aggregate([
            {
                $lookup: {
                    from: 'questions', 
                    localField: 'question',
                    foreignField: '_id',
                    as: 'questions'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    questions: { $push: '$questions' }
                }
            }
        ]);

        if (!categoriesWithQuestions || categoriesWithQuestions.length === 0) {
            return res.status(404).json({
                msg: "No categories found with questions"
            });
        }

        res.status(200).json({
            msg: "Found categories with questions",
            count: categoriesWithQuestions.length,
            result: categoriesWithQuestions
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getCategoryById = async (req, res) => {
    let id = req.query.id
    let findCategoryById = await Category.findById(id)
    if (!findCategoryById) throw "this is not exits"
    res.send(200).json({
        msg: "found successfully",
        result: findCategoryById
    })
}


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