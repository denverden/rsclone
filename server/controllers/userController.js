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
    try {
      const { username, password } = req.body;
      const lang = getLangName(req.headers);
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
        return res.status(400).json({ apiMessage: message[lang].ERROR_USERNAME });
      }

      await user.save().then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_REGISTRATION,
          addUser: {
            _id: user._id,
            username: user.username,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_REGISTRATION, error: err });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const lang = getLangName(req.headers);
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_LOGIN });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_PASSWORD });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.status(200).json({
        apiMessage: message[lang].SUCCESS_AUTHORIZATION,
        info: user,
        token: token,
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_AUTHORIZATION, error: err });
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const lang = getLangName(req.headers);

      if (!user) {
        return res.status(400).json({ message: message[lang].ERROR_NOT_USER });
      }

      return res.status(200).json({
        apiMessage: message[lang].SUCCESS_INFO,
        info: user,
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_ACCESS, error: err });
    }
  }

  async updateUser(req, res) {
    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const lang = getLangName(req.headers);
      const user = await User.findById(req.params.id);
      let newUser = user;

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_USER });
      }

      if (user._id.toString() !== token.id.toString() && !token.roles.includes('ADMIN')) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_ROLE });
      }

      //TODO: Create a separate function or method
      const { password, level, experience, roles } = req.body;
      if ((user._id.toString() === token.id.toString() && token.roles.includes('USER')) || token.roles.includes('ADMIN')) {
        newUser.password = password ? bcrypt.hashSync(password, 7) : newUser.password;
        newUser.level = level ? level : newUser.level;
        newUser.experience = experience ? experience : newUser.experience;
        newUser.lesson = lesson ? lesson : newUser.lesson;
        newUser.avatar = avatar ? avatar : newUser.avatar;
        newUser.achievements = achievements ? achievements.split(',') : newUser.achievements;
        newUser.roles = roles ? roles.split(',') : newUser.roles;
      }

      User.findByIdAndUpdate(req.params.id, newUser).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_UPDATE,
          updateUser: {
            _id: req.params.id,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_UPDATE, error: err });
    }
  }

  async deleteUser(req, res) {
    try {
      const token = jwt.decode(req.headers.authorization.split(' ')[1]);
      const lang = getLangName(req.headers);
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_USER });
      }

      if (user._id.toString() === token.id.toString()) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_YOURSELF_DELETE });
      }

      await User.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_DELETE,
          deletedUser: {
            _id: req.params.id,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_DELETE, error: err });
    }
  }
}

export default new UserController();
