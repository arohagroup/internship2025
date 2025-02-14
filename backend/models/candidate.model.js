const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,  // This can be an empty string for Google login users
        required: false  // Optional for Google login
    },
    experienceLevel: {
        type: String,
        required: false,
        enum: ['Fresher', 'Mid-Level', 'Senior-Level', 'Entry-Level']
    },
    jobType: {
        type: String,
        required: false,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
    },
    profilePhoto: {
        type: String,
        required: false
    },
    resume: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Others']
    },
    location: {
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        }
    },
    verificationToken: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: true  // Automatically verify when using Google login
    },
    resetToken: { 
        type: String, 
        default: null 
    },
    resetTokenExpiry: { 
        type: Date, 
        default: null 
    },
    lastResetRequest: { 
        type: Date, 
        default: null 
    },
}, {
    timestamps: true
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
