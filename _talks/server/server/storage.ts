import { type User, type InsertUser, type Prediction, type InsertPrediction, users, predictions } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getPredictions(limit?: number): Promise<Prediction[]>;
  updatePredictionActual(id: string, actual: 'up' | 'down'): Promise<Prediction | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const [prediction] = await db.insert(predictions).values(insertPrediction).returning();
    return prediction;
  }

  async getPredictions(limit: number = 20): Promise<Prediction[]> {
    return await db
      .select()
      .from(predictions)
      .orderBy(desc(predictions.createdAt))
      .limit(limit);
  }

  async updatePredictionActual(id: string, actual: 'up' | 'down'): Promise<Prediction | undefined> {
    const [prediction] = await db
      .update(predictions)
      .set({ actual })
      .where(eq(predictions.id, id))
      .returning();
    return prediction;
  }
}

export const storage = new DatabaseStorage();
