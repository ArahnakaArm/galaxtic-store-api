import { app } from './src/app.js';
const { app_port } = typeof process.env.server === 'string' ? JSON.parse(process.env.server) : process.env.server;
app.listen(app_port, '0.0.0.0');
