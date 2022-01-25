import 'dotenv/config';
import mongoose from 'mongoose';
import Group from '../models/groupModel.js';
import message from '../i18n/group.js';

const getLangName = (headers) => {
  const userLangs = headers['accept-language'] ? headers['accept-language'] : 'en';
  const apiLangs = Object.keys(message);
  let supportLangs = apiLangs.filter((el) => userLangs.includes(el));
  return supportLangs.length > 0 ? supportLangs[0] : 'en';
};

class GroupController {
  async createGroup(req, res) {
    const lang = getLangName(req.headers);
    try {
      const { groupname, learn } = req.body;
      const candidate = await Group.findOne({ name: groupname });

      if (candidate) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_GROUPNAME, error: 'ERROR_GROUPNAME' });
      }

      const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: groupname,
        learn,
      });

      await group.save().then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_CREAT_GROUP,
          info: group,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_CREAT_GROUP, error: err.message });
    }
  }

  async getAllGroup(req, res) {
    const lang = getLangName(req.headers);
    try {
      const groups = await Group.find();

      const response = {
        apiMessage: message[lang].SUCCESS_INFO_ALL,
        info: groups.map((record) => {
          return record;
        }),
        error: 'NO',
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_CREAT_GROUP, error: err.message });
    }
  }

  async getGroup(req, res) {
    const lang = getLangName(req.headers);
    try {
      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_GROUP, error: 'ERROR_NOT_GROUP' });
      }

      return res.status(200).json({
        apiMessage: message[lang].SUCCESS_INFO,
        info: group,
        error: 'NO',
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_ACCESS, error: err.message });
    }
  }

  async updateGroup(req, res) {
    const lang = getLangName(req.headers);
    try {
      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_GROUP, error: 'ERROR_NOT_GROUP' });
      }

      const { groupname, learn } = req.body;
      group.name = groupname ? groupname : group.name;
      group.learn = learn ? learn : group.learn;

      Group.findByIdAndUpdate(req.params.id, group).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_UPDATE,
          info: group,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_UPDATE, error: err });
    }
  }

  async deleteGroup(req, res) {
    const lang = getLangName(req.headers);
    try {
      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(400).json({ apiMessage: message[lang].ERROR_NOT_GROUP, error: 'ERROR_NOT_GROUP' });
      }

      await Group.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_DELETE,
          info: group,
          error: 'NO',
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_DELETE, error: err.message });
    }
  }
}

export default new GroupController();
