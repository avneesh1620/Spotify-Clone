import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/Spotify`)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Error while Connecting Database")   
    }
}



export default connectDB