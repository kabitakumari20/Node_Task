const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
const Category = new mongoose.model('Category', categorySchema);
module.exports = {
    Category,
}
