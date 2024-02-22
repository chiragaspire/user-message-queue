const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let MONGO_USERNAME = process.env.MONGO_USERNAME;
    let MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    let MONGO_SERVER = process.env.MONGO_SERVER;
    let MONGO_DBNAME = process.env.MONGO_DBNAME;

    // Validate environment variables
    if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_SERVER || !MONGO_DBNAME) {
      console.error("Missing MongoDB environment variables.");
      process.exit(1);
    }

    const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DBNAME}`;

    await mongoose.connect(url, {
      useNewUrlParser: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Log the error and rethrow
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;