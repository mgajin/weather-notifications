const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');
const Service = require('./models/Service');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const services = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/services.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        // await User.create(users);
        await Service.create(services);

        console.log('Data imported...'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const deleteData = async () => {
    try {
        // await User.deleteMany();
        await Service.deleteMany();

        console.log('Data Deleted...'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
