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

const generateRandomString = (digit) => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < digit; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};

export { generateUuid, hashPassword, matchPassword, generateRandomString };
