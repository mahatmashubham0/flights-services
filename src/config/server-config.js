const dotenv = require('dotenv');

dotenv.config(); // give access to env object

module.exports = {
    Port : process.env.PORT   
}