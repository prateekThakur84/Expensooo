const User = require('../models/User');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Longer expiry for better UX
    });
};

// Register User - UPDATED for email verification
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validations : Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.emailVerified) {
                return res.status(400).json({ message: 'Email already registered and verified' });
            } else {
                // User exists but not verified - resend verification
                const otp = existingUser.generateVerificationOTP();
                await existingUser.save();
                
                await emailService.sendRegistrationVerificationEmail(email, otp, fullName);
                
                return res.status(200).json({
                    message: 'Registration exists but not verified. New verification code sent to your email.',
                    requiresVerification: true,
                    tempUserId: existingUser._id,
                });
            }
        }

        // Create new user (not verified yet)
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
            emailVerified: false,
            accountStatus: 'pending',
        });

        // Generate and send verification OTP
        const otp = user.generateVerificationOTP();
        await user.save();

        // Send verification email
        await emailService.sendRegistrationVerificationEmail(email, otp, fullName);

        res.status(201).json({
            message: 'Registration successful! Please check your email to verify your account.',
            requiresVerification: true,
            tempUserId: user._id,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
};

// Verify Email OTP - NEW
exports.verifyEmailOTP = async (req, res) => {
    try {
        const { tempUserId, otp } = req.body;

        if (!tempUserId || !otp) {
            return res.status(400).json({ message: 'User ID and OTP are required' });
        }

        const user = await User.findById(tempUserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.emailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // Verify the OTP
        const verificationResult = user.verifyEmailOTP(otp);
        
        if (!verificationResult.success) {
            await user.save(); // Save updated attempt count
            return res.status(400).json({
                message: verificationResult.message,
                expired: verificationResult.expired,
                blocked: verificationResult.blocked,
                attemptsRemaining: verificationResult.attemptsRemaining,
            });
        }

        // Success - save the verified user
        await user.save();

        // Send welcome email (non-critical)
        emailService.sendWelcomeEmail(user.email, user.fullName).catch(console.error);

        // Return success response with token
        res.status(200).json({
            message: 'Email verified successfully! Welcome to Expenso!',
            _id: user._id,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                emailVerified: user.emailVerified,
                accountStatus: user.accountStatus,
                verifiedAt: user.verifiedAt,
            },
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error verifying email',
            error: error.message,
        });
    }
};

// Resend Verification OTP - NEW
exports.resendVerificationOTP = async (req, res) => {
    try {
        const { tempUserId } = req.body;

        if (!tempUserId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(tempUserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.emailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        // Check rate limiting (allow resend every 2 minutes)
        if (user.emailVerificationExpiry && 
            new Date() < new Date(user.emailVerificationExpiry.getTime() - 8 * 60 * 1000)) {
            const waitTime = Math.ceil((user.emailVerificationExpiry - new Date()) / 1000 / 60) - 8;
            return res.status(429).json({
                message: `Please wait ${Math.max(waitTime, 1)} minute(s) before requesting a new code`,
                waitTime: Math.max(waitTime, 1)
            });
        }

        // Generate new OTP and send
        const otp = user.generateVerificationOTP();
        await user.save();

        await emailService.sendRegistrationVerificationEmail(user.email, otp, user.fullName);

        res.status(200).json({
            message: 'New verification code sent to your email',
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error resending verification code',
            error: error.message,
        });
    }
};

// Login User - SIMPLIFIED (no OTP needed)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validations : Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } 

        // Check if email is verified
        if (!user.emailVerified) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in',
                requiresVerification: true,
                tempUserId: user._id,
            });
        }

        // Simple login - no OTP needed
        res.status(200).json({
            _id: user._id,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                emailVerified: user.emailVerified,
                accountStatus: user.accountStatus,
                verifiedAt: user.verifiedAt,
            },
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message,
        });
    }
};

// Get User Info - UNCHANGED
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user info',
            error: error.message,
        });
    }
};