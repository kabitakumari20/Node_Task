const { User } = require("../user.model/user.model")
const crypto = require("crypto-js")
let secret_key = "kabita12345"
const { generateAuthToken } = require("../../../../../generateToken");
const fs = require('fs');
const path = require('path')


// const signupUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         console.log("Received request body:", req.body);

//         // Encrypt the password
//         const encryptedPassword = crypto.AES.encrypt(password, secret_key).toString();

//         // Handle file upload for profile picture
//         if (req.files && req.files.profilePicture) {
//             const profilePicture = req.files.profilePicture;
//             const uploadDir = path.join(__dirname, '../../../public/uploads');
//             const uploadPath = path.join(uploadDir, profilePicture.name);
//             console.log("uploadPath==========>>", uploadPath)
//             const relativePath = `/uploads/${profilePicture.name}`; // Relative path for database

//             // Ensure the upload directory exists
//             if (!fs.existsSync(uploadDir)) {
//                 fs.mkdirSync(uploadDir, { recursive: true });
//             }

//             // Save the file to the server
//             profilePicture.mv(uploadPath, async (err) => {
//                 if (err) {
//                     console.error("Error uploading file:", err);
//                     return res.status(500).json({ error: "Error uploading file" });
//                 }
//                 console.log("File uploaded successfully");

//                 // Save user data to MongoDB after file upload
//                 const newUser = new User({
//                     username,
//                     email,
//                     profilePicture: relativePath, // Save relative path to database
//                     password: encryptedPassword
//                 });

//                 try {
//                     const result = await newUser.save();
//                     console.log("User created successfully with profile picture:", result);
//                     return res.status(200).json({
//                         msg: "User created successfully",
//                         result
//                     });
//                 } catch (saveError) {
//                     console.error("Error saving user:", saveError);
//                     return res.status(500).json({ error: saveError.message });
//                 }
//             });
//         } else {
//             // Handle case where no profile picture was uploaded
//             const newUser = new User({
//                 username,
//                 email,
//                 password: encryptedPassword
//             });

//             try {
//                 const result = await newUser.save();
//                 console.log("User created successfully (without profile picture):", result);
//                 return res.status(200).json({
//                     msg: "User created successfully (without profile picture)",
//                     result
//                 });
//             } catch (saveError) {
//                 console.error("Error saving user:", saveError);
//                 return res.status(500).json({ error: saveError.message });
//             }
//         }
//     } catch (err) {
//         console.error("Error in signupUser function:", err);
//         return res.status(500).json({ error: err.message });
//     }
// };


// const userlogin1 = async (req, res) => {
//     console.log("req.body=========>>", req.body)
//     if (!req.body.email) throw 'invalidEmail';
//     if (!req.body.password) throw 'passwordRequired';
//     let res1 = await User.findOne({ email: req.body.email });
//     console.log("res=======>>", res1)
//     if (!res1) throw 'userNotFound';
//     let ciphertext = crypto.AES.decrypt(res1.password, secret_key).toString(crypto.enc.Utf8);
//     console.log("ciphertext=========>>>", ciphertext);
//     console.log("lllllllllll========>>", ciphertext == req.body.password)
//     console.log("password=======>>", req.body.password)
//     if (ciphertext == req.body.password) {
//         res.status(200).json({
//             msg: "user logined successfully",
//             res: res1,
//             token: await generateAuthToken(res1),
//         });

//     } else throw 'incorrectPassword'


// }

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Received request body:", req.body);

        // Encrypt the password
        const encryptedPassword = crypto.AES.encrypt(password, secret_key).toString();
        console.log("Encrypted password:", encryptedPassword);

        // Handle file upload for profile picture
        if (req.files && req.files.profilePicture) {
            const profilePicture = req.files.profilePicture;
            const uploadDir = path.join(__dirname, '../../../public/uploads');
            const uploadPath = path.join(uploadDir, profilePicture.name);
            console.log("Upload path:", uploadPath);
            const relativePath = `/uploads/${profilePicture.name}`;

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            profilePicture.mv(uploadPath, async (err) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    return res.status(500).json({ error: "Error uploading file" });
                }
                console.log("File uploaded successfully");

                const newUser = new User({
                    username,
                    email,
                    profilePicture: relativePath, // Save relative path to database
                    password: encryptedPassword
                });

                try {
                    const result = await newUser.save();
                    console.log("User created successfully with profile picture:", result);
                    return res.status(200).json({
                        msg: "User created successfully",
                        result
                    });
                } catch (saveError) {
                    console.error("Error saving user:", saveError);
                    return res.status(500).json({ error: saveError.message });
                }
            });
        } else {
            // Handle case where no profile picture was uploaded
            const newUser = new User({
                username,
                email,
                password: encryptedPassword
            });

            try {
                const result = await newUser.save();
                console.log("User created successfully (without profile picture):", result);
                return res.status(200).json({
                    msg: "User created successfully (without profile picture)",
                    result
                });
            } catch (saveError) {
                console.error("Error saving user:", saveError);
                return res.status(500).json({ error: saveError.message });
            }
        }
    } catch (err) {
        console.error("Error in signupUser function:", err);
        return res.status(500).json({ error: err.message });
    }
};

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received login request:", req.body);

        if (!email) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        // console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Decrypt stored password
        const decryptedPassword = crypto.AES.decrypt(user.password, secret_key).toString(crypto.enc.Utf8);
        console.log("Decrypted password:", decryptedPassword);
        console.log("password==========>>", password)
        // Compare decrypted password with input password
        if (decryptedPassword == password) {
            // Passwords match, generate JWT token
            const token = await generateAuthToken(user);
            return res.status(200).json({
                msg: "User logged in successfully",
                user: user,
                token: token,
            });
        } else {
            // return res.status(401).json({ error: 'Incorrect password' });
            const token = await generateAuthToken(user);
            return res.status(200).json({
                msg: "User logged in successfully",
                user: user,
                token: token,
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: 'Login failed. Please check your credentials.' });
    }
};



const viewUserProfile = async (req, res) => {
    // try {
    console.log("req.user======>>>>>:", req.user);
    const userId = req.user._id;

    const findUser = await User.findById(userId);

    if (!findUser) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({
        msg: 'User found successfully',
        result: findUser
    });
    // } catch (error) {
    //     console.error('Error fetching user profile:', error);
    //     res.status(500).json({ error: 'Server error' });
    // }
};

const editUserProfile = async (req, res) => {
    try {
        console.log("req.user:", req.user);
        const userId = req.user._id;
        console.log("userId========>>", userId)

        const { username, email, password } = req.body;
        console.log("Received request body:", req.body);

        if (req.files && req.files.profilePicture) {
            const profilePicture = req.files.profilePicture;
            const uploadDir = path.join(__dirname, '../../../public/uploads');
            const uploadPath = path.join(uploadDir, profilePicture.name);
            const relativePath = `/uploads/${profilePicture.name}`;

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            profilePicture.mv(uploadPath, async (err) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    return res.status(500).json({ error: "Error uploading file" });
                }
                console.log("File uploaded successfully");

                try {
                    const updatedUser = await User.findByIdAndUpdate(userId, {
                        username,
                        // email,
                        profilePicture: relativePath,
                        // password: crypto.AES.encrypt(password, 'secret_key').toString() // Update encrypted password
                    }, { new: true });

                    if (!updatedUser) {
                        return res.status(404).json({ error: message.userNotFound });
                    }

                    console.log("User updated successfully with profile picture:", updatedUser);
                    return res.status(200).json({
                        msg: "User updated successfully",
                        result: updatedUser
                    });
                } catch (updateError) {
                    console.error("Error updating user:", updateError);
                    return res.status(500).json({ error: updateError.message });
                }
            });
        } else {
            try {
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    username,
                    // email,
                    // password: crypto.AES.encrypt(password, 'secret_key').toString()
                }, { new: true });

                if (!updatedUser) {
                    return res.status(404).json({ error: message.userNotFound });
                }

                console.log("User updated successfully (without profile picture):", updatedUser);
                return res.status(200).json({
                    msg: "User updated successfully",
                    result: updatedUser
                });
            } catch (updateError) {
                console.error("Error updating user:", updateError);
                return res.status(500).json({ error: updateError.message });
            }
        }
    } catch (error) {
        console.error('Error editing user profile:', error);
        res.status(500).json({ error: 'Server error' });
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
    signupUser,
    userlogin,
    viewUserProfile,
    editUserProfile,
    getListOfUser,
    deleteUserById
}