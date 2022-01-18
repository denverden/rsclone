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
  roles: [{ type: String, ref: 'Role' }],
});

export default mongoose.model('User', UserModel);
