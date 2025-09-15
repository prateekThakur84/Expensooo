const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getUserInfo,
  verifyEmailOTP,
  resendVerificationOTP
} = require('../controllers/authController'); 
const { protect } = require('../middlewares/authMiddleware'); 
const upload = require("../utils/cloudinary");

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);

// Email verification routes
router.post('/verify-email', verifyEmailOTP);
router.post('/resend-verification', resendVerificationOTP);

// Image upload (unchanged)
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    imageUrl: req.file.path,
  });
});
 
module.exports = router;