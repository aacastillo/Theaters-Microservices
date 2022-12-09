import { MongoClient } from 'mongodb';

export async function connectDB(): Promise<MongoClient> {
  const uri = process.env.DATABASE_URL;

  if (uri === undefined) {
    throw Error('DATABASE_URL environment variable is not specified');
  }

  const mongo = new MongoClient(uri);
  await mongo.connect();
  return await Promise.resolve(mongo);
}

export async function initDB() {
  console.log("Initializing database");
  const mongo: MongoClient = await connectDB();
  const db = mongo.db();

  if (await db.listCollections({ name: 'theaterAdmin' }).hasNext()) {
    console.log('Collection already exists. Skipping initialization.');
    return;
  }

  const theaters = db.collection('theaterAdmin');
  const result = await theaters.insertMany([
    { theaterId: "abc", revenue: [
        {ticketRevenue: 10000, concessionsRevenue: 20000, date: new Date()},
        {ticketRevenue: 30000, concessionsRevenue: 40000, date: new Date()}
    ]},
    { theaterId: "def", revenue: [
        {ticketRevenue: 50000, concessionsRevenue: 60000, date: new Date()}
    ]},
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}