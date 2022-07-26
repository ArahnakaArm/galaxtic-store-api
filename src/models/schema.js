import { DataTypes, NOW } from 'sequelize';

const UserSchema = {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
    verify_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verify_code_password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verify_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const UserInfoSchema = {
    user_info_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel_number: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    profile_image: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const ShippingInfoSchema = {
    shipping_info_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipping_address: {
        type: DataTypes.STRING,
    },
    tel_number: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const ShopSchema = {
    shop_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const MonthlyPromotionSchema = {
    monthly_promotion_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    imgae_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const MonthlyPromotionContentSchema = {
    monthly_promotion_content_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    monthly_promotion_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const MainCategorySchema = {
    main_category_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    main_category_name: {
        type: DataTypes.STRING,
    },
    main_category_image_url: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const SubCategorySchema = {
    sub_category_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    main_category_id: {
        type: DataTypes.STRING,
    },
    sub_category_name: {
        type: DataTypes.STRING,
    },
    sub_category_image_url: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const ProductSchema = {
    product_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    shop_id: {
        type: DataTypes.STRING,
    },
    main_category_id: {
        type: DataTypes.STRING,
    },
    product_sku: {
        type: DataTypes.STRING,
    },
    product_name: {
        type: DataTypes.STRING,
    },
    product_img: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
};

const UserShopSchema = {
    user_id: {
        type: DataTypes.STRING,
    },
    shop_id: {
        type: DataTypes.STRING,
    },
};

export {
    UserSchema,
    ShopSchema,
    ShippingInfoSchema,
    UserInfoSchema,
    MonthlyPromotionSchema,
    MonthlyPromotionContentSchema,
    MainCategorySchema,
    SubCategorySchema,
    ProductSchema,
    UserShopSchema,
};
