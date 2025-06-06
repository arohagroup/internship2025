const mongoose = require('mongoose');
const CandidateProfile  = require('./candidate.profile.model');
const Application = require('./application.model');

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,  
        required: false  
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
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
        default: 'Male',
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
    modeofLogin: {
        type: String,
        required: false,
        default: 'email',
        enum: ['email', 'google', 'facebook']
    },
    verificationToken: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false 
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

candidateSchema.pre('findOneAndDelete', async function (next) {
    const candidate = await this.model.findOne(this.getQuery()); // Get the candidate document
    if (candidate) {
        await CandidateProfile.deleteMany({ candidateId: candidate._id });
        await Application.deleteMany({ candidateId: candidate._id });
    }
    next();
});



  

const Candidate = mongoose.model('Candidate', candidateSchema);



module.exports = Candidate;
