import mongoose from 'mongoose';

const GroupModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    default: 'OTHER',
  },
  learn: {
    type: Boolean,
    unique: true,
    default: false,
  },
});

export default mongoose.model('Group', GroupModel);
