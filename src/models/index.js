import { Sequelize } from 'sequelize';
import fs from 'fs';
const { postgres } = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
import {
    UserSchema,
    UserInfoSchema,
    ShippingInfoSchema,
    MonthlyPromotionSchema,
    MonthlyPromotionContentSchema,
    ShopSchema,
    MainCategorySchema,
    SubCategorySchema,
    ProductSchema,
    UserShopSchema,
} from './schema.js';
const cCA = fs.readFileSync('./certs/ca-certificate.crt', 'utf8');
const sequelize = new Sequelize(postgres.dbName, postgres.options.user, postgres.options.pass, {
    host: postgres.ip,
    dialect: 'postgres',
    port: postgres.port,
    logging: postgres.options.dbName,
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false,
            ca: cCA,
        },
    },
    schema: postgres.schema,
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const commonModelOptions = {
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
};

const User = sequelize.define('users', UserSchema, commonModelOptions);
const Shop = sequelize.define('shops', ShopSchema, commonModelOptions);
const UserInfo = sequelize.define('user_infos', UserInfoSchema, commonModelOptions);
const ShippingInfo = sequelize.define('shipping_infos', ShippingInfoSchema, commonModelOptions);

const MonthlyPromotion = sequelize.define('monthly_promotions', MonthlyPromotionSchema, commonModelOptions);
const MonthlyPromotionContent = sequelize.define(
    'monthly_promotion_contents',
    MonthlyPromotionContentSchema,
    commonModelOptions,
);

const MainCategory = sequelize.define('main_categories', MainCategorySchema, commonModelOptions);
const SubCategory = sequelize.define('sub_categories', SubCategorySchema, commonModelOptions);

const Product = sequelize.define('products', ProductSchema, commonModelOptions);

const UserShop = sequelize.define('users_shops', UserShopSchema, { timestamps: false });

User.hasOne(UserInfo, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
});

User.hasMany(ShippingInfo, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
});

User.belongsToMany(Shop, {
    through: 'users_shops',
    foreignKey: 'user_id',
    otherKey: 'shop_id',
});
Shop.belongsToMany(User, {
    through: 'users_shops',
    foreignKey: 'shop_id',
    otherKey: 'user_id',
});

MonthlyPromotion.hasMany(MonthlyPromotionContent, {
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: 'monthly_promotion_id',
});

MainCategory.hasMany(SubCategory, {
    onDelete: 'CASCADE',
    hooks: true,
    foreignKey: 'main_category_id',
});

Product.belongsTo(MainCategory, {
    foreignKey: 'main_category_id',
});

Product.belongsTo(Shop, {
    foreignKey: 'shop_id',
});

export {
    User,
    UserInfo,
    ShippingInfo,
    Shop,
    MonthlyPromotion,
    MonthlyPromotionContent,
    MainCategory,
    SubCategory,
    Product,
    UserShop,
    sequelize,
};
