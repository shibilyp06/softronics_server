const mongoose = require('mongoose');
const mongooseURL = process.env.MONGOOSE_URL;

const connectDatabase = () => {
    mongoose.connect(mongooseURL)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Database connection failed:', error);
        });
};

module.exports = connectDatabase;
