const mongoose = require('mongoose');

const { Category } = require("../../category/category.model/category.model")
const questionSchema = new mongoose.Schema({
    name: String,
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ["active", "inactive", "archived"],
        default: "active"
    }
}, {
    timestamps: true,
    versionKey: false,
});



const Question = new mongoose.model('Question', questionSchema);

module.exports = {
    Question
}
