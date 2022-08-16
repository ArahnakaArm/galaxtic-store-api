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
        MONTHLY_PROMOTION_BY_ID: '/monthly-promotion/:monthlyPromotionId',
        DELETE_MONTHLY_PROMOTION: '/monthly-promotion/:monthlyPromotionId',
    },
    SHIPPING: {
        SHIPPING_INFO: '/shipping-info',
        SHIPPING_INFO_UPDATE: '/shipping-info/:shippingInfoId',
    },
};

export default Object.freeze(path);
