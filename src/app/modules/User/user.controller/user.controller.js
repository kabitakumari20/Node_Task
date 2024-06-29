const {
    signupUser,
    userlogin,
    viewUserProfile,
    editUserProfile,
    getListOfUser,
    deleteUserById } = require("../user.business/user.business")


const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById
} = require("../user.business/category.business")



const { createQuestion, getAllQuestionList } = require("../user.business/question.businees")
// user
exports.signupUser = async (req, res) => await signupUser(req, res)
exports.userlogin = async (req, res) => await userlogin(req, res)
exports.viewUserProfile = async (req, res) => await viewUserProfile(req, res)
exports.editUserProfile = async (req, res) => await editUserProfile(req, res)
exports.getListOfUser = async (req, res) => await getListOfUser(req, res)
exports.deleteUserById = async (req, res) => await deleteUserById(req, res)
//==========================
exports.createCategory = async (req, res) => await createCategory(req, res)
exports.getAllCategory = async (req, res) => await getAllCategory(req, res)
exports.getCategoryById = async (req, res) => await getCategoryById(req, res)
exports.updateCategory = async (req, res) => await updateCategory(req, res)
exports.deleteCategoryById = async (req, res) => await deleteCategoryById(req, res)



// question

exports.createQuestion = async (req, res) => await createQuestion(req, res)
exports.getAllQuestionList = async (req, res) => await getAllQuestionList(req, res)