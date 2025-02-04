const {
    createQuestion,
    addQuestionsFromCSV,
    getAllQuestionList,
    getListOfQuestionOfEachCategory,
    getListOfQuestionOfEachCategoryById,
    deleteQuestionById,
    updateQuestionById } = require("../question.business/question.business")
exports.createQuestion = async (req, res) => await createQuestion(req, res)
exports.addQuestionsFromCSV = async (req, res) => await addQuestionsFromCSV(req, res)
exports.fileUplaod = async (req, res) => await fileUplaod(req, res)
exports.getAllQuestionList = async (req, res) => await getAllQuestionList(req, res)
exports.getListOfQuestionOfEachCategory = async (req, res) => await getListOfQuestionOfEachCategory(req, res)

exports.getListOfQuestionOfEachCategoryById = async (req, res) => await getListOfQuestionOfEachCategoryById(req, res)
exports.deleteQuestionById = async (req, res) => await deleteQuestionById(req, res)
exports.updateQuestionById = async (req, res) => await updateQuestionById(req, res)