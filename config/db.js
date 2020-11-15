const mongoose = require('mongoose');

module.exports = {
    connectMongoose: async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            native_parser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
        })
    }
    catch (e) {
        console.log(e, `Unable to connect to database at ${process.env.MONGO_URI}`)
    }

    }
};
