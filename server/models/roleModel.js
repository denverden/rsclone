import mongoose from 'mongoose';

const RoleModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    unique: true,
    default: 'USER',
  },
});

export default mongoose.model('Role', RoleModel);
