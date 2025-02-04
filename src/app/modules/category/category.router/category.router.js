let express = require('express');
const { authenticate } = require("../../../middlewares/jwt.middleware")
let router = express.Router(),
    {

        createCategory,
        getAllCategory,
        getCategoryById,
        updateCategory,
        deleteCategoryById,


    } = require("../category.controller/category.controller")
router.post("/createCategory", createCategory)
router.get("/getAllCategory", getAllCategory)
router.get("/getCategoryById", getCategoryById)
router.put("/updateCategory", updateCategory)
router.delete("/deleteCategoryById", deleteCategoryById)


module.exports = router;
