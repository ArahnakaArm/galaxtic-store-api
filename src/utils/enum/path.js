const path = {
    USER: {
        GET_USER: '/user',
        REGISTER: '/register',
        LOGIN: '/login',
        VERIFY_EMAIL: '/verify-email',
        PROFILE: '/profile',
        FORGOT_PASSWORD: '/forgot-password',
        CHANGE_PASSWORD_WITH_VERIFYCODE: '/change-password-verify',
    },
    PROMOTION: {
        MONTHLY_PROMOTION: '/monthly-promotion',
        DELETE_MONTHLY_PROMOTION: '/monthly-promotion/:monthlyPromotionId',
    },
};

export default Object.freeze(path);
