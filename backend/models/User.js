const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "https://www.gravatar.com/avatar",
    },
    // Email verification fields
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpiry: {
      type: Date,
      default: null,
    },
    verificationAttempts: {
      type: Number,
      default: 0,
    },
    accountStatus: {
      type: String,
      enum: ['pending', 'verified', 'suspended'],
      default: 'pending',
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate email verification OTP
userSchema.methods.generateVerificationOTP = function() {
  const crypto = require('crypto');
  const otp = crypto.randomInt(100000, 999999).toString();
  
  this.emailVerificationToken = otp;
  this.emailVerificationExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  this.verificationAttempts = 0;
  
  return otp;
};

// Verify email OTP
userSchema.methods.verifyEmailOTP = function(otp) {
  if (!this.emailVerificationToken || !this.emailVerificationExpiry) {
    return { success: false, message: 'No verification token found' };
  }
  
  if (new Date() > this.emailVerificationExpiry) {
    return { success: false, message: 'Verification code expired', expired: true };
  }
  
  if (this.verificationAttempts >= 3) {
    return { success: false, message: 'Too many attempts. Please request a new code', blocked: true };
  }
  
  if (this.emailVerificationToken !== otp.toString()) {
    this.verificationAttempts += 1;
    return { 
      success: false, 
      message: `Invalid code. ${3 - this.verificationAttempts} attempts remaining`,
      attemptsRemaining: 3 - this.verificationAttempts
    };
  }
  
  // Success - mark as verified
  this.emailVerified = true;
  this.accountStatus = 'verified';
  this.verifiedAt = new Date();
  this.emailVerificationToken = null;
  this.emailVerificationExpiry = null;
  this.verificationAttempts = 0;
  
  return { success: true, message: 'Email verified successfully' };
};

module.exports = mongoose.model("User", userSchema);