import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import message from '../i18n/user.js';

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
};

const getLangName = (headers) => {
  const userLangs = headers['accept-language'] ? headers['accept-language'] : 'en';
  const apiLangs = Object.keys(message);
  let supportLangs = apiLangs.filter((el) => userLangs.includes(el));
  return supportLangs.length > 0 ? supportLangs[0] : 'en';
};

class UserController {
  async create(req, res) {
    const lang = getLangName(req.headers);
    try {
      const { username, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const candidate = await User.findOne({ username });
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      if (candidate) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_USERNAME, error: 'ERROR_USERNAME' });
      }

      await user.save().then(() => {
        user._doc.password = '--- banned from viewing ---';

        res.status(200).json({
          apiMessage: message[lang].SUCCESS_REGISTRATION,
          info: user,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_REGISTRATION, error: err.message });
    }
  }

  async login(req, res) {
    const lang = getLangName(req.headers);
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_LOGIN, error: 'ERROR_LOGIN' });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_PASSWORD, error: 'ERROR_PASSWORD' });
      }

      const token = generateAccessToken(user._id, user.roles);

      user._doc.token = token;
      user._doc.password = '--- banned from viewing ---';

      return res.status(200).json({
        apiMessage: message[lang].SUCCESS_AUTHORIZATION,
        info: user,
        error: 'NO',
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_AUTHORIZATION, error: err.message });
    }
  }

  async getRating(req, res) {
    const lang = getLangName(req.headers);
    try {
      const limit = (req.params.limit < 1) && (req.params.limit > 20) ? limit = 8 : req.params.limit;

      const users = await User.find().sort({ level: 'desc', experience: 'desc' }).limit(Number(limit));

      const response = {
        apiMessage: message[lang].SUCCESS_INFO,
        info: users.map((record) => {
          return record;
        }),
        error: 'NO',
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_ACCESS, error: err.message });
    }
  }

  async getUser(req, res) {
    const lang = getLangName(req.headers);
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ message: message[lang].ERROR_NOT_USER, error: 'ERROR_NOT_USER' });
      }

      user._doc.password = '--- banned from viewing ---';

      return res.status(200).json({
        apiMessage: message[lang].SUCCESS_INFO,
        info: user,
        error: 'NO',
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_ACCESS, error: err.message });
    }
  }

  async updateUser(req, res) {
    const lang = getLangName(req.headers);
    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_USER, error: 'ERROR_NOT_USER' });
      }

      if (user._id.toString() !== token.id.toString() && !token.roles.includes('ADMIN')) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_ROLE, error: 'ERROR_NOT_ROLE' });
      }

      const { password, level, experience, lesson, avatar, races, signs, time, mistakes, speed } = req.body;
      if ((user._id.toString() === token.id.toString() && token.roles.includes('USER')) || token.roles.includes('ADMIN')) {
        if (password !== '--- banned from viewing ---') {
          user.password = password ? bcrypt.hashSync(password, 7) : user.password;
        }

        user.level = level ? level : user.level;
        user.experience = experience ? experience : user.experience;
        user.lesson = lesson ? lesson : user.lesson;
        user.avatar = avatar ? avatar : user.avatar;
        user.races = races ? races : user.races;
        user.signs = signs ? signs : user.signs;
        user.time = time ? time : user.time;
        user.mistakes = mistakes ? mistakes : user.mistakes;
        user.speed = speed ? speed : user.speed;
      }

      User.findByIdAndUpdate(req.params.id, user).then(() => {
        user.password = '--- banned from viewing ---';
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_UPDATE,
          info: user,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_UPDATE, error: err.message });
    }
  }

  async deleteUser(req, res) {
    const lang = getLangName(req.headers);
    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_USER, error: 'ERROR_NOT_USER' });
      }

      if (user._id.toString() === token.id.toString()) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_YOURSELF_DELETE, error: 'ERROR_YOURSELF_DELETE' });
      }

      user._doc.password = '--- banned from viewing ---';

      await User.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_DELETE,
          info: user,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_DELETE, error: err.message });
    }
  }
}

export default new UserController();
