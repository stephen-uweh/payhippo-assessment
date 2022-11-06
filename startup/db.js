require('dotenv').config();
const mongoose = require('mongoose');

const database = process.env.ENVIRONMENT == "local" ? process.env.DATABASE_DEV : ( process.env.ENVIRONMENT == "staging") ?process.env.DATABASE_STAGING : process.env.DATABASE_PRODUCTION
// db
mongoose
    .connect(database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        dbName:process.env.DBNAME
    })
    .then(() => console.log(`Db connected to ${database} with ${process.env.ENVIRONMENT}`));
