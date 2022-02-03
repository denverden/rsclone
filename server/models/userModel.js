import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  experience: {
    type: Number,
    default: 0,
  },
  lesson: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default:
      'data:image/jpeg;base64,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',
  },
  achievements: [{ type: String }],
  roles: [{ type: String, ref: 'Role' }],
});

export default mongoose.model('User', UserModel);
