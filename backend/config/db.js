import mongoose from "mongoose";

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://stack:stack1@cluster0.2pbb1.mongodb.net/petservice', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
};

export default connectdb;
