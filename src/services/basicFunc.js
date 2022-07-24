import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import configApp from '../../conf/config-app.js';

const { BCRYPT_SALT_ROUND } = configApp;

const generateUuid = () => {
  return uuidv4();
};

const hashPassword = async (password) => {
  const hashed = bcrypt.hashSync(password, BCRYPT_SALT_ROUND);
  return hashed;
};

const matchPassword = async (password, comPassword) => {
  const isMatch = bcrypt.compareSync(password, comPassword);
  return isMatch;
};

export { generateUuid, hashPassword, matchPassword };
