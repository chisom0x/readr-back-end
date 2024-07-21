import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  // other fields...
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.error('Error in pre-save middleware:', error);
    next(error);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword)
};

const userModel = mongoose.model('User', userSchema)
export default userModel
