import mongoose from "mongoose";

const main = async () => {
    const uri: any = process.env.MONGO_URI

    try {
        await mongoose.connect(uri)
    } catch (e) {
        return console.log('Couldn\'t connect to the database', e)
    }

    console.log("Connected to the db successfully")
};

main();
