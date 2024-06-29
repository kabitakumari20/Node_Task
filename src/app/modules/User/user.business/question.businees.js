const { Question } = require("../user.model/user.model")


const createQuestion = async (req, res) => {
    try {
        console.log("req.body==========>>", req.body);
        let newQuestion = new Question(req.body);
        let data = await newQuestion.save();
        if (!data) throw "Data not saved";

        res.status(200).json({
            msg: "Question created successfully.",
            result: data
        });
    } catch (error) {
        console.log("error=========", error);
        res.status(500).json({
            error: error.toString()
        });
    }
};


const getAllQuestionList = async (req, res) => {
    try {
        let findQuestion = await Question.find();
        if (!findQuestion || findQuestion.length === 0) {
            return res.status(404).json({
                msg: "No categories found"
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


module.exports = { createQuestion,getAllQuestionList }