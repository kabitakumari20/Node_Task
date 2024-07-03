const { User } = require("../user.model/user.model")
const crypto = require("crypto-js")
let secret_key = "kabita12345"
const { generateAuthToken } = require("../../../../../generateToken");
const fs = require('fs');
const path = require('path')

const signup = async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;

        const encryptedPassword = crypto.AES.encrypt(password, secret_key).toString();

        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
            profilePicture
        });

        const result = await newUser.save();
        console.log("User created successfully:", result);

        return res.status(200).json({
            msg: "User created successfully",
            result
        });
    } catch (err) {
        console.error("Error in signupUser function:", err);
        return res.status(500).json({ error: err.message });
    }
};



const fileUplaod = async (req, res) => {
    try {
        let uploadedFile = req.file;
        let urlPath = `/uploads/${uploadedFile.filename}`;

        console.log("File URL Path:", urlPath);

        return res.send({ url: urlPath });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Error uploading file" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const decryptedPassword = crypto.AES.decrypt(user.password, secret_key).toString(crypto.enc.Utf8);
        console.log("Decrypted password:", decryptedPassword);
        if (decryptedPassword == password) {
            const token = await generateAuthToken(user);
            return res.status(200).json({
                msg: "User logged in successfully",
                user: user,
                token: token,
            });
        } else throw "incorrect password"
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: 'Login failed. Please check your credentials.' });
    }
};



const viewUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const findUser = await User.findById(userId);

        if (!findUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'User found successfully',
            result: findUser
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const editUserProfile = async (req, res) => {
    try {
        const { username, profilePicture } = req.body;
        const userId = req.user._id;
        console.log("userId=========>>", userId)

        const updateData = {};
        if (username) updateData.username = username;

        if (profilePicture) updateData.profilePicture = profilePicture;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User updated successfully:", updatedUser);
        return res.status(200).json({
            msg: "User updated successfully",
            result: updatedUser
        });
    } catch (err) {
        console.error("Error in updateUser function:", err);
        return res.status(500).json({ error: err.message });
    }
};


const getListOfUser = async (req, res) => {
    try {

        const findUser = await User.find();

        if (!findUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'User found successfully',
            count: findUser.length,
            result: findUser
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
const deleteUserById = async (req, res) => {
    try {
        console.log("req.user======>>>>>:", req.user);
        const userId = req.user._id;

        const findUser = await User.findByIdAndDelete(userId);

        if (!findUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'User deleted successfully',
            result: findUser
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    signup,
    fileUplaod,
    login,
    viewUserProfile,
    editUserProfile,
    getListOfUser,
    deleteUserById
}