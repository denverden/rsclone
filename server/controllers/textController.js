import 'dotenv/config';
import mongoose from 'mongoose';
import Text from '../models/textModel.js';
import Group from '../models/groupModel.js';
import message from '../i18n/text.js';

const randomInteger = (max) => Math.round(-0.5 + Math.random() * (max + 1));

const getLangName = (headers) => {
  const userLangs = headers['accept-language'] ? headers['accept-language'] : 'en';
  const apiLangs = Object.keys(message);
  let supportLangs = apiLangs.filter((el) => userLangs.includes(el));
  return supportLangs.length > 0 ? supportLangs[0] : 'en';
};

class TextController {
  async createText(req, res) {
    const lang = getLangName(req.headers);
    try {
      const { groupname, text, lang, lesson } = req.body;
      const group = await Group.findOne({ name: groupname });

      const newText = new Text({
        _id: new mongoose.Types.ObjectId(),
        text,
        lang,
        lesson,
        groups: [groupname],
      });

      await newText.save().then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_CREAT_TEXT,
          addGroup: {
            _id: newText._id,
            text: newText.text,
            lang: newText.lang,
            lesson: newText.lesson,
            groups: newText.groups,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_CREAT_TEXT, error: err });
    }
  }

  async getText(req, res) {
    const lang = getLangName(req.headers);
    try {
      // TODO: make it more efficient to return a random entry
      const group = await Group.findById(req.params.groupId);
      const filter = group ? { groups: [group.name] } : {};
      const count = await Text.countDocuments(filter);
      const randRecord = randomInteger(count);
      const record = await Text.find(filter)
        .skip(randRecord - 1)
        .limit(1);

      const response = {
        _id: record[0]._id,
        groups: record[0].groups,
        text: record[0].text,
        lang: record[0].lang,
        lesson: record[0].lesson,
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_TEXT, error: err });
    }
  }

  async getAllText(req, res) {
    const lang = getLangName(req.headers);
    try {
      const group = await Group.findById(req.params.groupId);
      const filter = group ? { groups: [group.name] } : {};
      const texts = await Text.find(filter);

      const response = {
        count: texts.length,
        texts: texts.map((record) => {
          return {
            _id: record._id,
            groups: record.groups,
            text: record.text,
            lang: record.lang,
            lesson: record.lesson,
          };
        }),
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_TEXT, error: err });
    }
  }

  async updateText(req, res) {
    const langs = getLangName(req.headers);
    try {
      let newText = await Text.findById(req.params.id);

      const { groupname, text, lang, lesson } = req.body;
      newText.groups = groupname ? groupname.split(',') : newText.groups;
      newText.text = text ? text : newText.text;
      newText.lang = lang ? lang : newText.lang;
      newText.lesson = lesson ? lesson : newText.lesson;

      Text.findByIdAndUpdate(req.params.id, newText).then(() => {
        res.status(200).json({
          apiMessage: message[langs].SUCCESS_UPDATE,
          updateText: {
            _id: req.params.id,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[langs].ERROR_UPDATE, error: err });
    }
  }

  async deleteTexts(req, res) {
    const lang = getLangName(req.headers);
    try {
      await Text.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
          apiMessage: message[lang].SUCCESS_DELETE,
          deletedText: {
            _id: req.params.id,
          },
        });
      });
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_DELETE, error: err });
    }
  }
}

export default new TextController();
