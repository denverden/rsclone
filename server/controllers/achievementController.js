import 'dotenv/config';
import Achievement from '../models/AchievementModel.js';
import message from '../i18n/achievement.js';

const getLangName = (headers) => {
  const userLangs = headers['accept-language'] ? headers['accept-language'] : 'en';
  const apiLangs = Object.keys(message);
  let supportLangs = apiLangs.filter((el) => userLangs.includes(el));
  return supportLangs.length > 0 ? supportLangs[0] : 'en';
};

class TextController {
  async getAllAchievement(req, res) {
    const lang = getLangName(req.headers);
    try {
      const texts = await Achievement.find();

      const response = {
        apiMessage: message[lang].SUCCESS_ACHIEVEMENT_ALL,
        achievements: texts.map((record) => {
          return record;
        }),
        error: 'NO',
      };

      return res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ apiMessage: message[lang].ERROR_ACHIEVEMENT, error: err.message });
    }
  }
}

export default new TextController();
