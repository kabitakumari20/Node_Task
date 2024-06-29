let express = require('express');
// let { upload } = require("../../../util/multer-s3");
const { authenticate } = require("../../../middlewares/jwt.middleware")
const multer = require('multer');
const path = require('path');
let router = express.Router(),
    {
        signupUser,
        userlogin,
        viewUserProfile,
        editUserProfile,
        getListOfUser,
        deleteUserById,
        //-----------------------
        createCategory,
        getAllCategory,
        getCategoryById,
        updateCategory,
        deleteCategoryById,
        // ---------------
        createQuestion,
        getAllQuestionList

    } = require("../user.controller/user.controller")


// user----------------
router.post("/signupUser", (signupUser));
router.post("/userlogin", userlogin)
router.get("/viewUserProfile", authenticate, viewUserProfile)
router.put("/editUserProfile", authenticate, editUserProfile)
router.get("/getListOfUser", getListOfUser)
router.delete("/deleteUserById", authenticate, deleteUserById)
// Category--------------------
router.post("/createCategory", createCategory)
router.get("/getAllCategory", getAllCategory)
router.get("/getCategoryById", getCategoryById)
router.put("/updateCategory", updateCategory)
router.delete("/deleteCategoryById", deleteCategoryById)


router.post("/createQuestion", createQuestion)
router.get("/getAllQuestionList", getAllQuestionList)
module.exports = router;
