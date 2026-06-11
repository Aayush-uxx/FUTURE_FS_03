import mongoose from "mongoose";
const dbCon = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("Database connected successfully !");
    }
  } catch (error) {
    console.log("Failed to connect Database");
  }
};
export default dbCon;
