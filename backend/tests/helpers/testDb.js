import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

/**
 * Spins up an isolated in-memory MongoDB and connects Mongoose to it.
 * Used by integration tests so they never touch the real Atlas cluster.
 */
let mongo;

export const connectTestDb = async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
};

/** Wipes every collection between tests for full isolation. */
export const clearTestDb = async () => {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
};

export const closeTestDb = async () => {
  await mongoose.disconnect();
  await mongo?.stop();
};
