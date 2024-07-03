const { Question } = require("../question.model/question.model")
const csv = require('csv-parser');
const path = require('path')
const fs = require('fs');
const mongoose = require('mongoose');

const { csvToJson } = require("../../../helper/helper")
const createQuestion = async (req, res) => {
    try {
        let newQuestion = new Question(req.body);
        let data = await newQuestion.save();
        if (!data) throw "Data not saved";

        res.status(200).json({
            msg: "Question created successfully.",
            result: data
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};


const addQuestionsFromCSV = async (req, res) => {
    try {
        console.log("req.file===========>>", req.file)
        if (!req.file || !req.file) {
            return res.status(400).json({ error: 'No CSV file uploaded' });
        }
        const csvFile = req.file;
        console.log("csvFile========>>", csvFile)
        const results = [];
        let csvData = await csvToJson(csvFile.path)

        console.log("csvData=========>>", csvData)
        for (const item of csvData) {
            let obj = {
                name: item.name,
                categories: item.categories
            }
            results.push(obj)
        }

        let resdata = await Question.create(results);

        return res.send(resdata);


    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.toString() });
    }
};




const getAllQuestionList = async (req, res) => {
    try {
        const findQuestion = await Question.aggregate([
            {
                $lookup: {
                    from: 'categories', // Name of the Category collection
                    localField: 'categories', // Field in Question that references Category
                    foreignField: '_id',
                    as: 'categoryDetails' // Alias for the joined data
                }
            }
        ]);

        if (!findQuestion || findQuestion.length === 0) {
            return res.status(404).json({
                msg: "No questions found"
            });
        }

        res.status(200).json({
            msg: "Found Question list",
            count: findQuestion.length,
            result: findQuestion
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getListOfQuestionOfEachCategory = async (req, res) => {
    try {
        const result = await Question.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $group: {
                    _id: '$categoryDetails._id',
                    categoryName: { $first: '$categoryDetails.name' },
                    questions: {
                        $push: {
                            _id: '$_id',
                            name: '$name',
                            status: '$status',
                            createdAt: '$createdAt',
                            updatedAt: '$updatedAt'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: '$_id',
                    categoryName: 1,
                    questions: 1
                }
            }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({
                msg: "No categories with questions found"
            });
        }

        res.status(200).json({
            msg: "Found categories with questions",
            count: result.length,
            result: result
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getListOfQuestionOfEachCategoryById = async (req, res) => {
    try {
        let matchStage = {};
        if (req.query.categoriesId) {
            matchStage = { $match: { 'categories': new mongoose.Types.ObjectId(req.query.categoriesId) } };
        }

        const result = await Question.aggregate([
            matchStage,
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $group: {
                    _id: '$categoryDetails._id',
                    categoryName: { $first: '$categoryDetails.name' },
                    questions: {
                        $push: {
                            _id: '$_id',
                            name: '$name',
                            status: '$status',
                            createdAt: '$createdAt',
                            updatedAt: '$updatedAt'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: '$_id',
                    categoryName: 1,
                    questions: 1
                }
            }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({
                msg: "No categories with questions found"
            });
        }

        res.status(200).json({
            msg: "Found categories with questions",
            count: result.length,
            result: result
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const deleteQuestionById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) throw "ID required";
        const findQuestion = await Question.findByIdAndDelete(id);
        if (!findQuestion) throw "Question not found";
        return res.status(200).json({ msg: "Data deleted successfully", result: findQuestion });
    } catch (error) {

        return res.status(500).json({ error: error });
    }
};

const updateQuestionById = async (req, res) => {
    try {
        let { id } = req.params
        if (!id) throw "id required"
        let findData = await Question.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (!findData) throw "data not found"
        return res.status(200).json({
            msg: "success",
            result: findData
        })
    } catch (error) {
        throw error
    }

}

module.exports = {
    createQuestion,
    addQuestionsFromCSV,
    getAllQuestionList,
    getListOfQuestionOfEachCategory,
    getListOfQuestionOfEachCategoryById,
    deleteQuestionById,
    updateQuestionById
}