import mongoose from 'mongoose';

const LogModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  iduser: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'info',
  },
  text: {
    type: String,
    default: '',
  },
});

export default mongoose.model('Log', LogModel);
