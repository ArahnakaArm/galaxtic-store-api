import { Sequelize } from 'sequelize';
import fs from 'fs';
const { postgres } = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
import { UserSchema } from './schema.js';
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

const User = sequelize.define('users', UserSchema, { timestamps: false, freezeTableName: true });

export { User, sequelize };
