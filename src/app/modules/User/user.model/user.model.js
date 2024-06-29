const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret_key = "kabita12345";

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: {
            type: String,
            // required: true,
            unique: true,
            trim: true
        },
        profilePicture: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,

        ref: "Question"
    }]

}, {
    timestamps: true,
    versionKey: false,
});

const questionSchema = new mongoose.Schema({
    text: String,
    // categories: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // }]
}, {
    timestamps: true,
    versionKey: false,
});


userSchema.statics.findByToken = function (token, res) {
    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, secret_key);
    } catch (e) {
        throw e.message || "Unauthorised request";
    }
    return User.findOne({
        _id: decoded._id,
    })
        .then((user) => {
            if (!user) {
                return Promise.reject({ message: msg.unauthorisedRequest });
            } else {
                return Promise.resolve(user);
            }
        })
        .catch((e) => {
            throw msg.unauthorisedRequest;
        });
};




const User = new mongoose.model("User", userSchema);//

const Category = new mongoose.model('Category', categorySchema);
const Question = new mongoose.model('Question', questionSchema);

module.exports = {
    User,
    Category,
    Question
}
