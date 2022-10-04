import RunTestUserLogin from './testFiles/User/login.test.js';
import RunTestUserRegister from './testFiles/User/register.test.js';
import RunTestGetProfile from './testFiles/User/getProfile.test.js';
import RunTestForgotPassword from './testFiles/User/forgotPassword.test.js';
import RunTestCreateProfile from './testFiles/User/createProfile.test.js';
import RunTestUpdateProfile from './testFiles/User/updateProfile.test.js';
import RunTestGetCategory from './testFiles/Cateory/getCategory.test.js';
import RunTestCreateCategory from './testFiles/Cateory/createCategory.test.js';

const startTest = async () => {
    describe('USER', async () => {
        describe('Register', async () => {
            await RunTestUserRegister();
        });
        describe('Log in', async () => {
            await RunTestUserLogin();
        });
        describe('Get Profile', async () => {
            await RunTestGetProfile();
        });
        describe('Forgot Password', async () => {
            await RunTestForgotPassword();
        });
        describe('Create Profile', async () => {
            await RunTestCreateProfile();
        });
        describe('Update Profile', async () => {
            await RunTestUpdateProfile();
        });
    });
    describe('CATEGORY', async () => {
        describe('Get Category', async () => {
            await RunTestGetCategory();
        });
        describe('Create Category', async () => {
            await RunTestCreateCategory();
        });
    });
};

startTest();
