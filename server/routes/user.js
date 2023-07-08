const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const app = express();


router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }


    // Trim string values
    data.name = data.name.trim().toLowerCase();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    // Check email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create user
    let result = await User.create(data);
    res.json(result);
});


router.post("/login", async (req, res) => {
    let data = req.body;
    // Trim string values
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    // Return user info
    let userInfo = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});


// POST route to change password
router.post('/changepass', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        // Find the user in the database based on the provided email
        const user = await User.findOne({
            where: { email: email.toLowerCase() },
        });

        // If the user doesn't exist, return an error message
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await User.update(
            { password: hashedPassword },
            { where: { email: email.toLowerCase() } }
        );

        // Password change successful
        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while changing the password.' });
    }
});


// GET all accounts
router.get('/accounts', async (req, res) => {
    try {
        // Fetch all accounts from the database
        const accounts = await User.findAll({
            attributes: ['id', 'name', 'email'], // Include the 'id' field
        });

        res.json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ message: 'Failed to fetch accounts' });
    }
});



router.delete('/accounts/:id', async (req, res) => {
    try {
        const accountId = req.params.id;

        // Check if the account ID is valid
        if (!accountId) {
            console.log('Invalid account ID:', accountId);
            return res.status(400).json({ message: 'Invalid account ID.' });
        }

        console.log('Deleting account with ID:', accountId);

        // Find the account by ID and remove it from the database
        const deletedAccount = await User.destroy({
            where: { id: accountId },
        });

        console.log('Deleted account:', deletedAccount);

        if (deletedAccount === 0) {
            return res.status(404).json({ message: 'Account not found.' });
        } else {
            return res.json({ message: 'Account deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        return res.status(500).json({ message: 'Failed to delete account' });
    }
});


module.exports = router;



