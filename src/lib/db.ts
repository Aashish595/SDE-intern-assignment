import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalCache = global.mongoose || { conn: null, promise: null };
global.mongoose = globalCache;

export async function connectDB() {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: "apnisec",
      })
      .then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose});
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
