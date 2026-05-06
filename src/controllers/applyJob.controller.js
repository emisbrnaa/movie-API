import ApplyJob from "../models/ApplyJob.js";

export const createOrUpdateApplyJob = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { job, fullname, resumeUrl, contactPhone } = req.body;
    
    let applyJob = await ApplyJob.findOne({ user: userId, job });

    if (applyJob) {
      applyJob.fullname = fullname;
      applyJob.resumeUrl = resumeUrl;
      applyJob.contactPhone = contactPhone;
      await applyJob.save();

      return res.status(200).json({
        message: "Berhasil update Apply Job",
        applyjob: applyJob,
      });
    } else {
      applyJob = new ApplyJob({
        user: userId,
        job,
        fullname,
        resumeUrl,
        contactPhone,
      });
      await applyJob.save();

      
      return res.status(201).json({
        message: "Berhasil buat Apply Job",
        applyjob: applyJob,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
