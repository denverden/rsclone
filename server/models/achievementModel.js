import mongoose from 'mongoose';

const AchievementModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sort: {
    type: Number,
    default: 0,
  },
  imageName: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Achievement', AchievementModel);
