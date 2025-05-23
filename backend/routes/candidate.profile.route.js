const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate.model');
const CandidateProfile = require('../models/candidate.profile.model');
const auth = require('../middleware/authMiddleware');

router.get('/get', auth, async (req, res) => {
    try {
        const user = await Candidate.findOne({
            email : req.user.email
        })
        const profile = await CandidateProfile.findOne({ candidateId: user._id });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);

    } catch (err) {
        console.error("Error fetching profile:", err.message);
        res.status(500).json({ message: err.message });
    }
});



router.patch('/update', auth, async (req, res) => {
    try {
        const updates = req.body;
        const user = await Candidate.findOne({
            email : req.user.email
        })
        const profile = await CandidateProfile.findOneAndUpdate(
            { candidateId:user._id },
            { $set: updates },
            { new: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;