
// // //apply+application

// // const Application = require('../models/application.model');
// // const Job = require('../models/job.model');
// // const Candidate = require('../models/candidate.model');
// // const CandidateProfile = require('../models/candidate.profile.model');

// // const applyJob = async (req, res) => {
// //     try {
// //         console.log("Job ID:", req.params.id);
// //         const job = await Job.findById(req.params.id);

// //         if (!job) {
// //             console.log("Job not found");
// //             return res.status(404).json({ message: "Job not found" });
// //         }

// //         console.log("User Email:", req.user?.email);
// //         const email = req.user.email;
// //         const candidate = await Candidate.findOne({ email });

// //         if (!candidate) {
// //             console.log("Candidate not found");
// //             return res.status(404).json({ message: "Candidate not found" });
// //         }

// //         console.log("Candidate ID:", candidate._id);

// //         // Check if the candidate has already applied
// //         const existingApplication = await Application.findOne({
// //             candidateId: candidate._id,
// //             jobId: job._id,
// //         });

// //         if (req.method === "GET") {
// //             // If it's a GET request, return application status
// //             if (existingApplication) {
// //                 return res.json({ applied: true, message: "You have already applied for this job" });
// //             } else {
// //                 return res.json({ applied: false, message: "You have not applied for this job" });
// //             }
// //         }

// //         // If it's a POST request, proceed with applying
// //         if (existingApplication) {
// //             console.log("Duplicate application detected");
// //             return res.status(400).json({ message: "You have already applied for this job" });
// //         }

// //         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
// //         if (!candidateProfile) {
// //             console.log("Candidate profile not found");
// //             return res.status(400).json({ message: "Candidate profile not found" });
// //         }

// //         console.log("Candidate Profile Skills:", candidateProfile.skills);
// //         console.log("Job Skills:", job.skills);

// //         const matchingSkills = job.skills.filter(skill => candidateProfile.skills.includes(skill));
// //         console.log("Matching Skills:", matchingSkills);

// //         const application = new Application({
// //             jobId: job._id,
// //             candidateId: candidate._id,
// //             skillsMatching: matchingSkills,
// //             status: "pending",
// //             dateApplied: new Date(),
// //             jobName:job.title,
// //             companyName:job.company,
// //         });

// //         await application.save();
// //         console.log("Application saved successfully");

// //         job.applicationCount++;
// //         job.viewCount++;
// //         await job.save();

// //         console.log("Job application and view counts updated");

// //         res.json({ message: "Applied successfully" });

// //     } catch (err) {
// //         console.error("Server Error:", err);
// //         res.status(500).json({ message: "Server error", error: err.message });
// //     }
// // };

// // const getMyApplications = async (req, res) => {
// //     try {
// //         const candidate = await Candidate.findOne({ email:req.user.email });  
// //         if (!candidate) {
// //             return res.status(400).json({ message: "Candidate not found" });
// //         }
// //         console.log("Candidate ID:", candidate._id);
// //         const applications = await Application.find({ 
// //             candidateId: candidate._id
// //          });
// //         res.status(200).json(applications);
// //     } catch (error) {
// //         res.status(500).json({ message: "Server error", error: error.message });
// //     }
// // };



// // module.exports = { applyJob,getMyApplications };



// //apply+application

// const Application = require('../models/application.model');
// const Job = require('../models/job.model');
// const Candidate = require('../models/candidate.model');
// const CandidateProfile = require('../models/candidate.profile.model');

// const applyJob = async (req, res) => {
//     try {
//         console.log("Job ID:", req.params.id);
//         const job = await Job.findById(req.params.id);

//         if (!job) {
//             console.log("Job not found");
//             return res.status(404).json({ message: "Job not found" });
//         }
        
//         console.log("User Email:", req.user?.email);
//         const email = req.user.email;
//         const candidate = await Candidate.findOne({ email });
//         console.log("candidate id : ",candidate._id)
//         if (!candidate) {
//             console.log("Candidate not found");
//             return res.status(404).json({ message: "Candidate not found" });
//         }

//         console.log("Candidate ID:", candidate._id);

//         // Check if the candidate has already applied
//         const existingApplication = await Application.findOne({
//             candidateId: candidate._id,
//             jobId: job._id,
//         });

//         if (req.method === "GET") {
//             // If it's a GET request, return application status
//             if (existingApplication) {
//                 return res.json({ applied: true, message: "You have already applied for this job" });
//             } else {
//                 return res.json({ applied: false, message: "You have not applied for this job" });
//             }
//         }

//         // If it's a POST request, proceed with applying
//         if (existingApplication) {
//             console.log("Duplicate application detected");
//             return res.status(400).json({ message: "You have already applied for this job" });
//         }
//         // console.log("candidate id : ",candidate._id)
//         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
//         if (!candidateProfile) {
//             console.log("Candidate profile not found");
//             return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
//         }
        
//         console.log("Candidate Profile Skills:", candidateProfile.skills);
//         console.log("Job Skills:", job.skills);

//         const matchingSkills = job.skills.filter(skill => candidateProfile.skills.includes(skill));
//         console.log("Matching Skills:", matchingSkills);

//         const application = new Application({
//             jobId: job._id,
//             candidateId: candidate._id,
//             skillsMatching: matchingSkills,
//             status: "pending",
//             dateApplied: new Date(),
//             jobName:job.title,
//             companyName:job.company,
//             resume:candidate.resume,
//         });

//         await application.save();
//         console.log("Application saved successfully");

//         job.applicationCount++;
//         job.viewCount++;
//         await job.save();

//         console.log("Job application and view counts updated");

//         res.json({ message: "Applied successfully" });

//     } catch (err) {
//         console.error("Server Error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const getMyApplications = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ email:req.user.email });  
//         if (!candidate) {
//             return res.status(400).json({ message: "Candidate not found" });
//         }
//         console.log("Candidate ID:", candidate._id);
//         const applications = await Application.find({ 
//             candidateId: candidate._id
//          });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };



// module.exports = { applyJob,getMyApplications };

//apply+application

// const Application = require('../models/application.model');
// const Job = require('../models/job.model');
// const Candidate = require('../models/candidate.model');
// const CandidateProfile = require('../models/candidate.profile.model');

// const applyJob = async (req, res) => {
//     try {
//         console.log("Job ID:", req.params.id);
//         //const job = await Job.findById(req.params.id);
//         const job = await Job.findById(req.params.id).populate("company", "name");
//          console.log("Company Name:", job.company.name);


//         if (!job) {
//             console.log("Job not found");
//             return res.status(404).json({ message: "Job not found" });
//         }
        
//         console.log("User Email:", req.user?.email);
//         const email = req.user.email;
//         const candidate = await Candidate.findOne({ email });
//         console.log("candidate id : ",candidate._id)
//         if (!candidate) {
//             console.log("Candidate not found");
//             return res.status(404).json({ message: "Candidate not found" });
//         }

//         console.log("Candidate ID:", candidate._id);

//         // Check if the candidate has already applied
//         const existingApplication = await Application.findOne({
//             candidateId: candidate._id,
//             jobId: job._id,
//         });

//         if (req.method === "GET") {
//             // If it's a GET request, return application status
//             if (existingApplication) {
//                 return res.json({ applied: true, message: "You have already applied for this job" });
//             } else {
//                 return res.json({ applied: false, message: "You have not applied for this job" });
//             }
//         }

//         // If it's a POST request, proceed with applying
//         if (existingApplication) {
//             console.log("Duplicate application detected");
//             return res.status(400).json({ message: "You have already applied for this job" });
//         }
//         // console.log("candidate id : ",candidate._id)
//         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
//         if (!candidateProfile) {
//             console.log("Candidate profile not found");
//             return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
//         }
        
//         console.log("Candidate Profile Skills:", candidateProfile.skills);
//         console.log("Job Skills:", job.skills);

//         const matchingSkills = job.skills.filter(skill => candidateProfile.skills.includes(skill));
//         console.log("Matching Skills :", matchingSkills);
//         if (!matchingSkills || matchingSkills.length==0) {
//             console.log("Matching skills not found");
//             return res.status(400).json({ message: "Your skills don’t align with the job requirements" });
//         }
        
//         console.log(job)
//         const application = new Application({
//             jobId: job._id,
//             candidateId: candidate._id,
//             skillsMatching: matchingSkills,
//             status: "pending",
//             dateApplied: new Date(),
//             jobName:job.title,
//             companyName:job.company.name,
//             resume:candidate.resume,
//         });
//         await application.save();
//         console.log("Application saved successfully");
//         console.log("job details : ",job.company)

//         job.applicationCount++;
//         job.viewCount++;
//         await job.save();

//         console.log("Job application and view counts updated");

//         res.json({ message: "Applied successfully" });

//     } catch (err) {
//         console.error("Server Error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const getMyApplications = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ email:req.user.email });  
//         if (!candidate) {
//             return res.status(400).json({ message: "Candidate not found" });
//         }
//         console.log("Candidate ID:", candidate._id);
//         const applications = await Application.find({ 
//             candidateId: candidate._id
//          });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const getAllApplications = async (req, res) => {
//     try {
//         const applications = await Application.find()
//         .populate("candidateId","fullName")
//         .lean();
//         const formattedApplications = applications.map((app) => ({
//             ...app,
//             name: app.candidateId
//               ? `${app.candidateId.fullName.firstName} ${app.candidateId.fullName.lastName}`
//               : "Unknown",
//           }));
      
//           res.json(formattedApplications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };



// module.exports = { applyJob,getMyApplications,getAllApplications};

// const Application = require('../models/application.model');
// const Job = require('../models/job.model');
// const Candidate = require('../models/candidate.model');
// const CandidateProfile = require('../models/candidate.profile.model');

// const applyJob = async (req, res) => {
//     try {
//         console.log("Job ID:", req.params.id);
//         //const job = await Job.findById(req.params.id);
//         const job = await Job.findById(req.params.id).populate("company", "name");
//          console.log("Company Name:", job.company.name);


//         if (!job) {
//             console.log("Job not found");
//             return res.status(404).json({ message: "Job not found" });
//         }
        
//         console.log("User Email:", req.user?.email);
//         const email = req.user.email;
//         const candidate = await Candidate.findOne({ email });
//         console.log("candidate id : ",candidate._id)
//         if (!candidate) {
//             console.log("Candidate not found");
//             return res.status(404).json({ message: "Candidate not found" });
//         }

//         console.log("Candidate ID:", candidate._id);

//         // Check if the candidate has already applied
//         const existingApplication = await Application.findOne({
//             candidateId: candidate._id,
//             jobId: job._id,
//         });

//         if (req.method === "GET") {
//             // If it's a GET request, return application status
//             if (existingApplication) {
//                 return res.json({ applied: true, message: "You have already applied for this job" });
//             } else {
//                 return res.json({ applied: false, message: "You have not applied for this job" });
//             }
//         }

//         // If it's a POST request, proceed with applying
//         if (existingApplication) {
//             console.log("Duplicate application detected");
//             return res.status(400).json({ message: "You have already applied for this job" });
//         }
//         // console.log("candidate id : ",candidate._id)
//         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
//         if (!candidateProfile) {
//             console.log("Candidate profile not found");
//             return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
//         }
        
//         console.log("Candidate Profile Skills:", candidateProfile.skills);
//         console.log("Job Skills:", job.skills);

//         const matchingSkills = job.skills.filter(skill => candidateProfile.skills.includes(skill.toLowerCase()));
//         console.log("Matching Skills :", matchingSkills);
//         if (!matchingSkills || matchingSkills.length==0) {
//             console.log("Matching skills not found");
//             return res.status(400).json({ message: "Your skills don’t align with the job requirements" });
//         }
        
//         console.log(job)
//         const application = new Application({
//             jobId: job._id,
//             candidateId: candidate._id,
//             skillsMatching: matchingSkills,
//             status: "pending",
//             dateApplied: new Date(),
//             jobName:job.title,
//             companyName:job.company.name,
//             resume:candidate.resume,
//         });
//         await application.save();
//         console.log("Application saved successfully");
//         console.log("job details : ",job.company)

//         job.applicationCount++;
//         job.viewCount++;
//         await job.save();

//         console.log("Job application and view counts updated");

//         res.json({ message: "Applied successfully" });

//     } catch (err) {
//         console.error("Server Error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const getMyApplications = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ email:req.user.email });  
//         if (!candidate) {
//             return res.status(400).json({ message: "Candidate not found" });
//         }
//         console.log("Candidate ID:", candidate._id);
//         const applications = await Application.find({ 
//             candidateId: candidate._id
//          });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const getAllApplications = async (req, res) => {
//     try {
//         const applications = await Application.find()
//         .populate("candidateId","fullName")
//         .lean();
//         const formattedApplications = applications.map((app) => ({
//             ...app,
//             name: app.candidateId
//               ? `${app.candidateId.fullName.firstName} ${app.candidateId.fullName.lastName}`
//               : "Unknown",
//           }));
      
//           res.json(formattedApplications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };



// module.exports = { applyJob,getMyApplications,getAllApplications};

// const Application = require('../models/application.model');
// const Job = require('../models/job.model');
// const Candidate = require('../models/candidate.model');
// const CandidateProfile = require('../models/candidate.profile.model');

// const applyJob = async (req, res) => {
//     try {
//         console.log("Job ID:", req.params.id);
//         //const job = await Job.findById(req.params.id);
//         const job = await Job.findById(req.params.id).populate("company", "name");
//          console.log("Company Name:", job.company.name);


//         if (!job) {
//             console.log("Job not found");
//             return res.status(404).json({ message: "Job not found" });
//         }
        
//         console.log("User Email:", req.user?.email);
//         const email = req.user.email;
//         const candidate = await Candidate.findOne({ email });
//         console.log("candidate id : ",candidate._id)
//         if (!candidate) {
//             console.log("Candidate not found");
//             return res.status(404).json({ message: "Candidate not found" });
//         }
//         if (!candidate.resume) {
//             console.log("resume not found");
//             return res.status(404).json({ message: "Resume not found" });
//         }
//         console.log("Candidate ID:", candidate._id);

//         // Check if the candidate has already applied
//         const existingApplication = await Application.findOne({
//             candidateId: candidate._id,
//             jobId: job._id,
//         });

//         if (req.method === "GET") {
//             // If it's a GET request, return application status
//             if (existingApplication) {
//                 return res.json({ applied: true, message: "You have already applied for this job" });
//             } else {
//                 return res.json({ applied: false, message: "You have not applied for this job" });
//             }
//         }

//         // If it's a POST request, proceed with applying
//         if (existingApplication) {
//             console.log("Duplicate application detected");
//             return res.status(400).json({ message: "You have already applied for this job" });
//         }
//         // console.log("candidate id : ",candidate._id)
//         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
//         if (!candidateProfile) {
//             console.log("Candidate profile not found");
//             return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
//         }
        
//         if (candidateProfile.skills.length===0 ||candidateProfile.education.length===0 || candidateProfile.workExperience.length===0 || candidateProfile.personalProjects.length===0) {
//             console.log("Update your profile section");
//             return res.status(400).json({ message: "Your profile section must be updated" });
//         }
//         console.log("Candidate Profile Skills:", candidateProfile.skills);
//         console.log("Job Skills:", job.skills);

//         const profileSkills = candidateProfile.skills.map(skill => skill.toLowerCase());
//         const matchingSkills = job.skills.filter(skill => profileSkills.includes(skill.toLowerCase()));
//         console.log("Matching Skills :", matchingSkills);

//         if (!matchingSkills || matchingSkills.length==0) {
//             console.log("Matching skills not found");
//             return res.status(400).json({ message: "Your skills don’t align with the job requirements" });
//         }
        
//         console.log(job)
//         const application = new Application({
//             jobId: job._id,
//             candidateId: candidate._id,
//             skillsMatching: matchingSkills,
//             status: "pending",
//             dateApplied: new Date(),
//             jobName:job.title,
//             companyName:job.company.name,
//             resume:candidate.resume,
//         });
//         await application.save();
//         console.log("Application saved successfully");
//         console.log("job details : ",job.company)

//         job.applicationCount++;
//         job.viewCount++;
//         await job.save();

//         console.log("Job application and view counts updated");

//         res.json({ message: "Applied successfully" });

//     } catch (err) {
//         console.error("Server Error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const getMyApplications = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ email:req.user.email });  
//         if (!candidate) {
//             return res.status(400).json({ message: "Candidate not found" });
//         }
//         console.log("Candidate ID:", candidate._id);
//         const applications = await Application.find({ 
//             candidateId: candidate._id
//          });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const getAllApplications = async (req, res) => {
//     try {
//         const applications = await Application.find()
//         .populate("candidateId","fullName")
//         .lean();
//         const formattedApplications = applications.map((app) => ({
//             ...app,
//             name: app.candidateId
//               ? `${app.candidateId.fullName.firstName} ${app.candidateId.fullName.lastName}`
//               : "Unknown",
//           }));
      
//           res.json(formattedApplications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const editApplication = async (req, res) => {
//     try {
//         const { applicationId } = req.params; // Get application ID from request params
//         const { status } = req.body; // Assuming the user is updating the status

//         console.log("Received Request to Edit Application");
//         console.log("Application ID:", applicationId);
//         console.log("New Status:", status);

//         if (!applicationId) {
//             return res.status(400).json({ message: "Application ID is required" });
//         }

//         if (!status) {
//             return res.status(400).json({ message: "Status field is required" });
//         }

//         const application = await Application.findById(applicationId);
//         if (!application) {
//             console.log("Application not found");
//             return res.status(404).json({ message: "Application not found" });
//         }

//         application.status = status; // Update status
//         await application.save();
//         console.log("application for edit ",application);
        
//         console.log("Application updated successfully");

//         res.json({ message: "Application updated successfully", application });

//     } catch (error) {
//         console.error("Error updating application:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const deleteApplication = async (req, res) => {
//     try {
//         const { applicationId } = req.params;
        
//         // Find and delete the application
//         const deletedApplication = await Application.findByIdAndDelete(applicationId);
        
//         if (!deletedApplication) {
//             return res.status(404).json({ message: "Application not found" });
//         }

//         res.status(200).json({ message: "Application deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting application:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// module.exports = { applyJob, getMyApplications, getAllApplications, editApplication,deleteApplication };

// const Application = require('../models/application.model');
// const Job = require('../models/job.model');
// const Candidate = require('../models/candidate.model');
// const CandidateProfile = require('../models/candidate.profile.model');

// const applyJob = async (req, res) => {
//     try {
//         console.log("Job ID:", req.params.id);
//         //const job = await Job.findById(req.params.id);
//         const job = await Job.findById(req.params.id).populate("company", "name");
//          console.log("Company Name:", job.company.name);


//         if (!job) {
//             console.log("Job not found");
//             return res.status(404).json({ message: "Job not found" });
//         }
        
//         console.log("User Email:", req.user?.email);
//         const email = req.user.email;
//         const candidate = await Candidate.findOne({ email });
//         console.log("candidate id : ",candidate._id)
//         if (!candidate) {
//             console.log("Candidate not found");
//             return res.status(404).json({ message: "Candidate not found" });
//         }
//         if (!candidate.resume) {
//             console.log("resume not found");
//             return res.status(404).json({ message: "Resume not found" });
//         }
//         console.log("Candidate ID:", candidate._id);

//         // Check if the candidate has already applied
//         const existingApplication = await Application.findOne({
//             candidateId: candidate._id,
//             jobId: job._id,
//         });

//         if (req.method === "GET") {
//             // If it's a GET request, return application status
//             if (existingApplication) {
//                 return res.json({ applied: true, message: "You have already applied for this job" });
//             } else {
//                 return res.json({ applied: false, message: "You have not applied for this job" });
//             }
//         }

//         // If it's a POST request, proceed with applying
//         if (existingApplication) {
//             console.log("Duplicate application detected");
//             return res.status(400).json({ message: "You have already applied for this job" });
//         }
//         // console.log("candidate id : ",candidate._id)
//         const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
//         if (!candidateProfile) {
//             console.log("Candidate profile not found");
//             return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
//         }
        
//         if (candidateProfile.skills.length===0 ||candidateProfile.education.length===0 || candidateProfile.workExperience.length===0 || candidateProfile.personalProjects.length===0) {
//             console.log("Update your profile section");
//             return res.status(400).json({ message: "Your profile section must be updated" });
//         }
//         console.log("Candidate Profile Skills:", candidateProfile.skills);
//         console.log("Job Skills:", job.skills);

//         const profileSkills = candidateProfile.skills.map(skill => skill.toLowerCase());
//         const matchingSkills = job.skills.filter(skill => profileSkills.includes(skill.toLowerCase()));
//         console.log("Matching Skills :", matchingSkills);

//         if (!matchingSkills || matchingSkills.length==0) {
//             console.log("Matching skills not found");
//             return res.status(400).json({ message: "Your skills don’t align with the job requirements" });
//         }
        
//         console.log(job)
//         const application = new Application({
//             jobId: job._id,
//             candidateId: candidate._id,
//             skillsMatching: matchingSkills,
//             status: "pending",
//             dateApplied: new Date(),
//             jobName:job.title,
//             companyName:job.company.name,
//             resume:candidate.resume,
//         });
//         await application.save();
//         console.log("Application saved successfully");
//         console.log("job details : ",job.company)

//         job.applicationCount++;
//         job.viewCount++;
//         await job.save();

//         console.log("Job application and view counts updated");

//         res.json({ message: "Applied successfully" });

//     } catch (err) {
//         console.error("Server Error:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// const getMyApplications = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ email:req.user.email });  
//         if (!candidate) {
//             return res.status(400).json({ message: "Candidate not found" });
//         }
//         console.log("Candidate ID:", candidate._id);
//         const applications = await Application.find({ 
//             candidateId: candidate._id
//          });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const getAllApplications = async (req, res) => {
//     try {
//         const applications = await Application.find()
//         .populate("candidateId","fullName")
//         .lean();
//         const formattedApplications = applications.map((app) => ({
//             ...app,
//             name: app.candidateId
//               ? `${app.candidateId.fullName.firstName} ${app.candidateId.fullName.lastName}`
//               : "Unknown",
//           }));
      
//           res.json(formattedApplications);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const editApplication = async (req, res) => {
//     try {
//         const { applicationId } = req.params;
//         const { status } = req.body;

//         console.log("Received Request to Edit Application");
//         console.log("Application ID:", applicationId);
//         console.log("New Status:", status);

//         if (!applicationId) {
//             return res.status(400).json({ message: "Application ID is required" });
//         }

//         if (!status) {
//             return res.status(400).json({ message: "Status field is required" });
//         }

//         // Populate candidateId to access fullName
//         const application = await Application.findById(applicationId).populate("candidateId", "fullName");

//         if (!application) {
//             console.log("Application not found");
//             return res.status(404).json({ message: "Application not found" });
//         }

//         application.status = status;
//         await application.save();

//         const formattedApplication = {
//             ...application.toObject(),
//             name: application.candidateId?.fullName?.firstName && application.candidateId?.fullName?.lastName
//                 ? `${application.candidateId.fullName.firstName} ${application.candidateId.fullName.lastName}`
//                 : "Unknown",
//         };
        

//         console.log("Application updated successfully");

//         res.json({ message: "Application updated successfully", formattedApplication });

//     } catch (error) {
//         console.error("Error updating application:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


// const deleteApplication = async (req, res) => {
//     try {
//         const { applicationId } = req.params;
        
//         // Find and delete the application
//         const deletedApplication = await Application.findByIdAndDelete(applicationId);
        
//         if (!deletedApplication) {
//             return res.status(404).json({ message: "Application not found" });
//         }

//         res.status(200).json({ message: "Application deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting application:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// module.exports = { applyJob, getMyApplications, getAllApplications, editApplication,deleteApplication };

const Application = require('../models/application.model');
const Job = require('../models/job.model');
const Candidate = require('../models/candidate.model');
const CandidateProfile = require('../models/candidate.profile.model');

const applyJob = async (req, res) => {
    try {
        console.log("Job ID:", req.params.id);
        //const job = await Job.findById(req.params.id);
        const job = await Job.findById(req.params.id).populate("company", "name");
         console.log("Company Name:", job.company.name);


        if (!job) {
            console.log("Job not found");
            return res.status(404).json({ message: "Job not found" });
        }
        
        console.log("User Email:", req.user?.email);
        const email = req.user.email;
        const candidate = await Candidate.findOne({ email });
        console.log("candidate id : ",candidate._id)
        if (!candidate) {
            console.log("Candidate not found");
            return res.status(404).json({ message: "Candidate not found" });
        }
        if (!candidate.resume) {
            console.log("resume not found");
            return res.status(404).json({ message: "Resume not found" });
        }
        console.log("Candidate ID:", candidate._id);

        // Check if the candidate has already applied
        const existingApplication = await Application.findOne({
            candidateId: candidate._id,
            jobId: job._id,
        });

        if (req.method === "GET") {
            // If it's a GET request, return application status
            if (existingApplication) {
                return res.json({ applied: true, message: "You have already applied for this job" });
            } else {
                return res.json({ applied: false, message: "You have not applied for this job" });
            }
        }

        // If it's a POST request, proceed with applying
        if (existingApplication) {
            console.log("Duplicate application detected");
            return res.status(400).json({ message: "You have already applied for this job" });
        }
        // console.log("candidate id : ",candidate._id)
        const candidateProfile = await CandidateProfile.findOne({ candidateId: candidate._id });
        if (!candidateProfile) {
            console.log("Candidate profile not found");
            return res.status(400).json({ message: "Candidate profile not found. Please enter your details on the profile section " });
        }
        
        if (candidateProfile.skills.length===0 ||candidateProfile.education.length===0 || candidateProfile.workExperience.length===0 || candidateProfile.personalProjects.length===0) {
            console.log("Update your profile section");
            return res.status(400).json({ message: "Your profile section must be updated" });
        }
        console.log("Candidate Profile Skills:", candidateProfile.skills);
        console.log("Job Skills:", job.skills);

        const profileSkills = candidateProfile.skills.map(skill => skill.toLowerCase());
        const matchingSkills = job.skills.filter(skill => profileSkills.includes(skill.toLowerCase()));
        console.log("Matching Skills :", matchingSkills);

        if (!matchingSkills || matchingSkills.length==0) {
            console.log("Matching skills not found");
            return res.status(400).json({ message: "Your skills don’t align with the job requirements" });
        }
        
        console.log(job)
        const application = new Application({
            jobId: job._id,
            candidateId: candidate._id,
            skillsMatching: matchingSkills,
            status: "pending",
            dateApplied: new Date(),
            jobName:job.title,
            companyName:job.company.name,
            resume:candidate.resume,
        });
        await application.save();
        console.log("Application saved successfully");
        console.log("job details : ",job.company)

        job.applicationCount++;
        job.viewCount++;
        await job.save();

        console.log("Job application and view counts updated");

        res.json({ message: "Applied successfully" });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ email:req.user.email });  
        if (!candidate) {
            return res.status(400).json({ message: "Candidate not found" });
        }
        console.log("Candidate ID:", candidate._id);
        const applications = await Application.find({ 
            candidateId: candidate._id
         });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
        .populate("candidateId","fullName")
        .lean();
        const formattedApplications = applications.map((app) => ({
            ...app,
            name: app.candidateId
              ? `${app.candidateId.fullName.firstName} ${app.candidateId.fullName.lastName}`
              : "Unknown",
          }));
      
          res.json(formattedApplications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const editApplication = async (req, res) => {
    try {
        const { applicationId } = req.params; 
        const { status } = req.body; 

        console.log("Received Request to Edit Application");
        console.log("Application ID:", applicationId);
        console.log("New Status:", status);

        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status field is required" });
        }

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status }, 
            { new: true } 
        ).populate("candidateId", "fullName");

        if (!application) {
            console.log("Application not found");
            return res.status(404).json({ message: "Application not found" });
        }
        const formattedApplication = {
            ...application.toObject(),
            name: application.candidateId
                ? `${application.candidateId.fullName.firstName} ${application.candidateId.fullName.lastName}`
                : "Unknown",
        };

        res.json({
            message: "Application updated successfully",
            application: formattedApplication,
        });

    } catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const deleteApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        
        // Find and delete the application
        const deletedApplication = await Application.findByIdAndDelete(applicationId);
        
        if (!deletedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { applyJob, getMyApplications, getAllApplications, editApplication,deleteApplication };