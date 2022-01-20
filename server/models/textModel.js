import mongoose from 'mongoose';

const TextModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    require: true,
    default: 'ru',
  },
  lesson: {
    type: Number,
    require: false,
    default: 0,
  },
  groups: [{ type: String, ref: 'Group' }],
});

export default mongoose.model('Text', TextModel);
