let express = require('express');
const { authenticate } = require("../../../middlewares/jwt.middleware")
const upload = require('../../../helper/import');

let router = express.Router(),
    {
        createQuestion,
        getAllQuestionList,
        addQuestionsFromCSV,
        getListOfQuestionOfEachCategory,
        getListOfQuestionOfEachCategoryById

    } = require("../question.controller/question.controller")

router.post("/createQuestion", createQuestion)

router.post('/addQuestionsFromCSV', upload.single('csvFile'), addQuestionsFromCSV);

router.get("/getAllQuestionList", getAllQuestionList)

router.get("/getListOfQuestionOfEachCategory", getListOfQuestionOfEachCategory)

router.get("/getListOfQuestionOfEachCategoryById", getListOfQuestionOfEachCategoryById)

module.exports = router;
