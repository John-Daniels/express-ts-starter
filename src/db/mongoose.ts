import mongoose from "mongoose";

const main = async () => {
    const localUri = "mongodb://127.0.0.1:27017/MyApp";
    const uri: string = process.env.PORT || localUri;

    try {
        await mongoose.connect(uri);
    } catch (e) {
        return console.log(e);
    }

    console.log("Connected to the db successfully");
};

main();
