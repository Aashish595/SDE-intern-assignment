import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function checkMongo() {
  console.log("🔍 Checking MongoDB connection...\n");

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName: "apnisec" });

    console.log("✅ MongoDB connected");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    console.log("🌐 Host:", mongoose.connection.host);

    await mongoose.disconnect();
    console.log("\n🎉 MongoDB check passed");
  } catch (err) {
    console.error("\n❌ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  }
}

checkMongo();
