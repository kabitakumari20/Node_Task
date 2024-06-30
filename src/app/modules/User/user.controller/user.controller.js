const {
    signup,
    login,
    viewUserProfile,
    editUserProfile,
    getListOfUser,
    deleteUserById, fileUplaod } = require("../user.business/user.business")






// user
exports.signup = async (req, res) => await signup(req, res)
exports.fileUplaod = async (req, res) => await fileUplaod(req, res)
exports.login = async (req, res) => await login(req, res)
exports.viewUserProfile = async (req, res) => await viewUserProfile(req, res)
exports.editUserProfile = async (req, res) => await editUserProfile(req, res)
exports.getListOfUser = async (req, res) => await getListOfUser(req, res)
exports.deleteUserById = async (req, res) => await deleteUserById(req, res)

//==========================



// question

