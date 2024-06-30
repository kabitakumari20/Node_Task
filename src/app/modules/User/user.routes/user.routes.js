let express = require('express');
const { authenticate } = require("../../../middlewares/jwt.middleware")
const upload = require('../../../helper/import');

const importFileOnLocal = require('../../../helper/import');

let router = express.Router(),
    {
        signup,
        login,
        viewUserProfile,
        editUserProfile,
        getListOfUser,
        deleteUserById,
        fileUplaod

    } = require("../user.controller/user.controller")


// user----------------
router.post("/signup", (signup));
router.post('/upload', importFileOnLocal.single('image'), fileUplaod);

router.post("/login", login)
router.get("/viewUserProfile", authenticate, viewUserProfile)
router.put("/editUserProfile", authenticate, editUserProfile)
router.get("/getListOfUser", getListOfUser)
router.delete("/deleteUserById", authenticate, deleteUserById)
// Category--------------------



module.exports = router;
