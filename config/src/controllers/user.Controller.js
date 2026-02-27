const User = require("./User");
const generateOTP = require("./utils/generateOTP");

exports.signup = async (req, res) => {
  const { email, phone, referralCode } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone required" });
  }

  const otp = generateOTP();

  const user = await User.create({
    email,
    phone,
    referralCode,
    otp
  });

  res.json({ message: "User created. Verify OTP", otp });
};

exports.verifyUser = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.json({ message: "Account verified" });
};