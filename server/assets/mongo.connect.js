import mongoose from "mongoose";

const connectToMongoose = async () => {
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CREDENTIALS}&appName=data-0`;
    console.log(`Connecting to MongoDB...`);
    try {
        await mongoose.connect(connectionString);
        // Handle successful connection
        console.log('MongoDB connection approved');

        // Handle connection error
        mongoose.connection.on('error', (err) => console.log('MongoDB connection error', err));

        // Handle disconnection
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

    } catch (error) {
        const errMsg = `Mongo DB connection error has occurred: ${error instanceof Error ? error.message : ''}`;
        throw new Error(errMsg);
    }
}

export default connectToMongoose;