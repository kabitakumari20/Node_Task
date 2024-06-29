const { User } = require("../modules/User/user.model/user.model")
const jwt = require('jsonwebtoken');
let secret_key = "kabita12345"

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log("authHeader========>>", authHeader)
        if (!authHeader) {
            return res.status(401).json({ error: message.unauthorisedRequest });
        }
        const token = authHeader.split(' ')[1];
        console.log("token=========>>", token)
        if (!token) {
            return res.status(401).json({ error: message.unauthorisedRequest });
        }
        const decoded = jwt.verify(token, secret_key);
        console.log("decoded=======>>", decoded)
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ error: message.unauthorisedRequest });
        }

        req.user = user;
        next();
    } catch (error) {
        res.send(500).json({ error: error })
    }


};