import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbCon = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error("Database URI is missing (MONGODB_URI or MONGO_URI)");
    return;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log("Database connected successfully !");
      return mongoose;
    }).catch((error) => {
      console.log("Failed to connect Database");
      cached.promise = null;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbCon;
