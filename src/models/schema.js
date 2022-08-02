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

export { UserSchema };
