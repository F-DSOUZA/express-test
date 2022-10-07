// config.js
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
};
