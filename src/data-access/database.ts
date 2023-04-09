import mongoose from "mongoose";

export default async function connectClient(): Promise<typeof mongoose> {
  const URI = process.env.MONGODB_URI as string;

  try {
    const options: mongoose.ConnectOptions = {
      writeConcern: { w: "majority" },
      dbName: process.env.MONGODB_DATABASE,
    };

    const client = await mongoose.connect(URI, options);

    console.log("Successfully connected to MongoDB.");

    return client;
  } catch (error) {
    console.error("Unable to connect to MongoDB due to error:", error);
    process.exit(1);
  }
}
