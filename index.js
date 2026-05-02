const dotenv = require('dotenv');
 
dotenv.config();

module.exports = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
};