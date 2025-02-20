const bcrypt = require('bcryptjs');
const Candidate = require('../models/candidate.model');
const jwt = require('jsonwebtoken');
const Employer  = require('../models/employer.model');
const crypto = require('crypto');
const sendEmail = require("../utils/emailService");

// Signup route
const signup =  async (req, res) => {
    const { name, phone, email, password, website, joinType } = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'Name is required' });
    }
    if (!phone) {
        return res.status(400).json({ msg: 'Phone is required' });
    }
    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ msg: 'Password is required' });
    }
    if (!joinType) {
        return res.status(400).json({ msg: 'Join type is required' });
    }
    if (!website) {
        return res.status(400).json({ msg: 'Website is required' });
    }

    if (name.length < 4) {
        return res.status(400).json({ msg: 'Name must be at least 4 characters' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org|edu)$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
    }

    if (phone.length !== 10) {
        return res.status(400).json({ msg: 'Phone number must be exactly 10 digits' });
    }
    if (phone.startsWith('0')) {
        return res.status(400).json({ msg: 'Phone number should not start with 0' });
    }
    const phonePattern = /^[1-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        return res.status(400).json({ msg: 'Invalid phone number format' });
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    const urlPattern = new RegExp('^(https?:\\/\\/)?(www\\.)?' + // protocol and www
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}\\.com|\\.edu|\\.org'  // domain name with .com, .edu, .org
    );

    if (!urlPattern.test(website)) {
        return res.status(400).json({ msg: 'Invalid website URL' });
    }
    

    try {
        let employer = await Employer.findOne({ email });
        let candidate = await Candidate.findOne({ email });
        if (employer || candidate) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(20).toString("hex");

        employer = new Employer({
            name,
            password: hashedpassword,
            phone,
            email,
            website,
            joinType,
            verificationToken,
        });

        await employer.save();

        // Send verification email
        const verificationURL = `${process.env.VERCEL_URL}/verify-email/${verificationToken}`;
        
        // const body =   `
        // <h2 style="color:#333;">Welcome to Our Platform! 🎉</h2>
        // <p style="font-size:16px;color:#555;">
        //   Thank you for signing up! To get started, please verify your email address by clicking the button below:
        // </p>
        // <p>
        //   <a href="${verificationURL}" 
        //      style="display:inline-block;padding:12px 20px;margin:10px 0;font-size:16px;
        //      color:#fff;background-color:#ff6600;border-radius:5px;text-decoration:none;">
        //      ✅ Verify My Email
        //   </a>
        // </p>
        // <p style="font-size:14px;color:#777;">
        //   If you didn't sign up for this account, you can safely ignore this email. If you have any questions, feel free to reach out. 
        // </p>
        // <p style="font-size:14px;color:#777;">
        //   Best Regards, <br> 
        //   The Support Team 💼
        // </p>
        // `
        // const subject =   "✨ Verify Your Email - Action Required! ✨"
        const subject = "🔐 Confirm Your Email Address"

        const body = `
        <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #f4f4f4; text-align: center;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Welcome to Wokwantaim 🎉</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Please confirm your email address to activate your account. Simply click the button below to verify:
            </p>
            <a href="${verificationURL}" 
               style="display: inline-block; padding: 12px 24px; margin-top: 20px; background: #007bff; color: #ffffff; 
               text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px;">
              ✅ Verify Email
            </a>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">
              If you did not sign up for this account, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #888; font-size: 12px;">
              Need help? <a href="mailto:support@wokwantaim.com" style="color: #007bff; text-decoration: none;">Contact Support</a>
            </p>
          </div>
        </div>
        `
        await sendEmail(email, subject, body);

        res.status(201).json({ message: "User registered! Please verify your email." });


    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Login route
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    try {
        let employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(400).json({ msg: 'User Not found' });
        }

        const isMatch = await bcrypt.compare(password, employer.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if(!employer.isVerified) {
            return res.status(400).json({ msg: 'Please verify your email to login' });
        }

        const token = jwt.sign(
            { id: employer._id, email: employer.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d", algorithm: "HS256"  }
        );  
        res.json({ message: "Login successful!", token });

                
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Profile route
const profile =  async (req, res) => {
    try {
        // Get the logged-in user's ID from the JWT
        const userId = req.user.id;

        // Find the candidate by userId
        const employer = await Employer.findById(userId);

        // If candidate not found, return 404 error
        if (!employer) {
            return res.status(404).json({ msg: 'Candidate not found' });
        }
        res.json(employer);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error while updating profile' });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;  // Token from the URL

        // Find the user by the verification token
        const user = await Employer.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid token or token expired!" });
        }

        // Optional: Check if token has expired
        const tokenExpirationTime = user.tokenExpirationTime || Date.now() + 3600000; // Default: 1 hour
        if (Date.now() > tokenExpirationTime) {
            return res.status(400).json({ message: "Token has expired!" });
        }

        // Mark the user's email as verified
        user.isVerified = true;
        user.verificationToken = undefined;  // Clear the verification token after use
        user.tokenExpirationTime = undefined; // Clear expiration time if any
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//Delete account route
const deleteAccount = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const employer = await Employer.findOne({
            email: userEmail
        });

        if (!employer) {
            return res.status(404).json({ msg: 'Employer not found' });
        }

        await employer.deleteOne();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error while deleting account' });
    }
}

module.exports = { signup, login, profile, verifyEmail, deleteAccount};