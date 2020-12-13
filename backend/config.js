import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
