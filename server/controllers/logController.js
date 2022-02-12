import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Log from '../models/logModel.js';
import jwt from 'jsonwebtoken';
import message from '../i18n/log.js';

const getLangName = (headers) => {
  const userLangs = headers['accept-language'] ? headers['accept-language'] : 'en';
  const apiLangs = Object.keys(message);
  let supportLangs = apiLangs.filter((el) => userLangs.includes(el));
  return supportLangs.length > 0 ? supportLangs[0] : 'en';
};

class LogController {
  async createLog(req, res) {
    const lang = getLangName(req.headers);

    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const { time, type, text } = req.body;

      const newLog = new Log({
        _id: new mongoose.Types.ObjectId(),
        iduser: token.id.toString(),
        time,
        type,
        text,
      });

      await newLog.save().then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_CREAT_LOG,
          info: newLog,
          err: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_CREAT_LOG, error: err.message });
    }
  }

  async getLog(req, res) {
    const lang = getLangName(req.headers);

    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const id = req.params.id ? req.params.id : token.id.toString();
      const user = await User.findById(id);

      if (user._id.toString() !== token.id.toString() && !token.roles.includes('ADMIN')) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_ROLE, error: 'ERROR_NOT_ROLE' });
      }

      const logs = await Log.find({ iduser: id });

      const response = {
        apiMessage: message[lang].SUCCESS_LOG_ALL,
        info: logs.map((record) => {
          return record;
        }),
        error: 'NO',
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_LOG, error: err.message });
    }
  }
}

export default new LogController();
