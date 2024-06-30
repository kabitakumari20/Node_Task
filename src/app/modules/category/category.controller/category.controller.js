const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
    bulkAddQuestions,

} = require("../category.business/category.business")

exports.createCategory = async (req, res) => await createCategory(req, res)
exports.bulkAddQuestions = async (req, res) => await bulkAddQuestions(req, res)
exports.getAllCategory = async (req, res) => await getAllCategory(req, res)
exports.getCategoryById = async (req, res) => await getCategoryById(req, res)
exports.updateCategory = async (req, res) => await updateCategory(req, res)
exports.deleteCategoryById = async (req, res) => await deleteCategoryById(req, res)