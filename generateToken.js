const jwt = require("jsonwebtoken");
let secret_token = "thisissecretkeyofchatapp"
let secret_key = "kabita12345"

// For generating jwt auth token
exports.generateAuthToken = user => {
    console.log("user=========>>", user)
    return new Promise((resolve, reject) => {
        let token = jwt.sign({ _id: user._id.toString() }, secret_key);
        resolve(token);
    });
};
