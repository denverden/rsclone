import 'dotenv/config';
import jwt from 'jsonwebtoken';
import message from '../i18n/user.js';

const roleMiddleware = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization === undefined ? false : req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(403).json({ message: message.ERROR_NOT_AUTHORIZATION });
      }

      const { roles: userRoles } = jwt.verify(token, process.env.SECRET);
      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: message.ERROR_NOT_ROLE });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: message.ERROR_AUTHORIZATION, error: err });
    }
  };
};

export default roleMiddleware;
