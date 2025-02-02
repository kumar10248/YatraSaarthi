import mongoose from "mongoose";

const connectMongooseDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://kumardevashish000:kumar123@cluster0.uxlq1.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to database");
  } catch (error) {
    console.log("MongoDb connection error", error);
    process.exit(1);
  }
};
export default connectMongooseDb;
