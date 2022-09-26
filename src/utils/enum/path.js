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
        SHIPPING_INFO_BY_ID: '/shipping-info/:shippingInfoId',
        SHIPPING_INFO_UPDATE: '/shipping-info/:shippingInfoId',
    },
    SHOP: {
        ADD_SHOP: '/shop',
        UPDATE_SHOP: '/shop/:shopId',
        DELETE_SHOP: '/shop/:shopId',
    },
    CATEGORY: {
        MAIN_CATEGORY: '/main-category',
        MAIN_CATEGORY_BY_ID: '/main-category/:mainCategoryId',
        UPDATE_CATEGORY: '/main-category/:mainCategoryId',
        DELETE_CATEGORY: '/main-category/:mainCategoryId',
    },
};

export default Object.freeze(path);
